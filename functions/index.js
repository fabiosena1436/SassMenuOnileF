// Ficheiro: functions/index.js (VERSÃO FINAL E ROBUSTA)

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const crypto = require("crypto");
const { MercadoPagoConfig, PreApproval } = require("mercadopago");

admin.initializeApp();
const db = admin.firestore();

// --- Função para criar uma nova assinatura ---
exports.createSubscription = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Utilizador não autenticado.");
  }

  const accessToken = functions.config().mercadopago.access_token;
  if (!accessToken) {
    console.error("ERRO CRÍTICO: 'mercadopago.access_token' não encontrado.");
    throw new functions.https.HttpsError("internal", "Erro de configuração do servidor.");
  }
  
  try {
    const userId = context.auth.uid;
    const userDocRef = db.collection("users").doc(userId);
    const userDoc = await userDocRef.get();

    // A verificação correta no Admin SDK é .exists (uma propriedade)
    if (!userDoc.exists || !userDoc.data().email) {
        console.error(`ERRO: Documento do utilizador ou email não encontrado para o UID: ${userId}`);
        throw new functions.https.HttpsError("not-found", "Dados do utilizador não encontrados.");
    }
    const userEmail = userDoc.data().email;

    const client = new MercadoPagoConfig({ accessToken });
    const preApprovalClient = new PreApproval(client);

    const backUrl = `https://www.saas-menu-onile.com.br/admin/assinatura`;

    const response = await preApprovalClient.create({
      body: {
        reason: "Assinatura Plano Pro - SaaS Menu Online",
        auto_recurring: {
          frequency: 1,
          frequency_type: "months",
          transaction_amount: 59.90, // O preço correto do plano Pro
          currency_id: "BRL",
        },
        payer_email: userEmail,
        back_url: backUrl,
        external_reference: userId,
      },
    });

    return { init_point: response.init_point };

  } catch (error) {
    console.error("ERRO INESPERADO AO CRIAR ASSINATURA:", error);
    if (error instanceof functions.https.HttpsError) {
        throw error;
    }
    throw new functions.https.HttpsError("internal", "Ocorreu um erro inesperado no servidor. Verifique os logs.");
  }
});

// --- Função para cancelar uma assinatura ---
exports.cancelSubscription = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError("unauthenticated", "Utilizador não autenticado.");
    }
    const userId = context.auth.uid;
    const userDoc = await db.collection("tenants").doc(userId).get();
    const { mercadoPagoSubscriptionId } = userDoc.data();
    if (!mercadoPagoSubscriptionId) {
      throw new functions.https.HttpsError("not-found", "Nenhuma assinatura ativa encontrada para este utilizador.");
    }
    const accessToken = functions.config().mercadopago.access_token;
    const client = new MercadoPagoConfig({ accessToken });
    const preApprovalClient = new PreApproval(client);
    try {
      await preApprovalClient.update({
        id: mercadoPagoSubscriptionId,
        body: { status: "cancelled" },
      });
      return { status: "success", message: "Pedido de cancelamento enviado." };
    } catch (error) {
      console.error("Erro ao cancelar assinatura no MP:", error.cause ?? error);
      throw new functions.https.HttpsError("internal", "Não foi possível cancelar a sua assinatura.");
    }
});

// --- Função que recebe as notificações do Mercado Pago (Webhook) ---
exports.mercadoPagoWebhook = functions.https.onRequest(async (req, res) => {
    // 1. Verificação da assinatura (segurança)
    const webhookSecret = functions.config().mercadopago.webhook_secret;
    const signatureHeader = req.headers['x-signature'];
    if (!signatureHeader || !webhookSecret) {
      console.log("Webhook recebido sem assinatura ou secret não configurada.");
      return res.status(401).send("Unauthorized");
    }
    try {
      const parts = signatureHeader.split(',');
      const ts = parts.find(part => part.startsWith('ts=')).split('=')[1];
      const hash = parts.find(part => part.startsWith('v1=')).split('=')[1];
      const manifest = `id:${req.body.data.id};request-id:${req.headers['x-request-id']};ts:${ts};`;
      const hmac = crypto.createHmac('sha256', webhookSecret);
      hmac.update(manifest);
      if (hmac.digest('hex') !== hash) {
        console.log("FALHA DE VERIFICAÇÃO: A assinatura do webhook é inválida.");
        return res.status(401).send("Invalid signature");
      }
    } catch (e) {
        console.error("Erro ao processar a assinatura do webhook:", e);
        return res.status(400).send("Bad Request: Invalid signature format.");
    }
    
    // 2. Processamento da notificação
    const notification = req.body;
    if ((notification.type === 'preapproval' || notification.type === 'subscription_preapproval') && notification.data?.id) {
        try {
            const subscriptionId = notification.data.id;
            const accessToken = functions.config().mercadopago.access_token;
            const client = new MercadoPagoConfig({ accessToken });
            const preApprovalClient = new PreApproval(client);
            
            const subscription = await preApprovalClient.get({ id: subscriptionId });

            if (subscription && subscription.external_reference) {
                const userId = subscription.external_reference;
                const status = subscription.status;

                if (status === 'authorized') {
                    await db.collection("tenants").doc(userId).update({
                        plan: 'pro',
                        mercadoPagoSubscriptionId: subscriptionId,
                        statusAssinatura: 'active'
                    });
                    console.log(`SUCESSO: Utilizador ${userId} atualizado para o plano PRO.`);
                } else if (status === 'cancelled') {
                    await db.collection("tenants").doc(userId).update({
                        plan: 'basic',
                        statusAssinatura: 'cancelled',
                    });
                    console.log(`INFO: Assinatura do utilizador ${userId} cancelada.`);
                } else {
                    console.log(`INFO: Status da assinatura [${status}] para o user ${userId}. Nenhuma ação necessária.`);
                }
            }
        } catch (error) {
            if (error.status === 404) {
                console.log(`INFO: Assinatura com ID ${notification.data.id} não encontrada. Provavelmente uma simulação. A ignorar.`);
            } else {
                console.error("ERRO NO PROCESSAMENTO DO WEBHOOK:", error);
                return res.status(500).send("Webhook processing error.");
            }
        }
    }
    
    res.status(200).send("ok");
});