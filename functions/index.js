// Ficheiro: functions/index.js (Versão Final de Produção)

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { MercadoPagoConfig, PreApproval } = require("mercadopago");

admin.initializeApp();
const db = admin.firestore();

// --- FUNÇÃO PARA CRIAR UMA ASSINATURA RECORRENTE ---
exports.createSubscription = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    console.error("Tentativa de chamada não autenticada.");
    throw new functions.https.HttpsError("unauthenticated", "Utilizador não autenticado.");
  }

  const accessToken = functions.config().mercadopago.access_token;
  if (!accessToken) {
    console.error("ERRO CRÍTICO: 'mercadopago.access_token' não encontrado nas configurações. Execute o comando 'firebase functions:config:set' novamente.");
    throw new functions.https.HttpsError("internal", "Erro de configuração do servidor.");
  }
  
  try {
    const userId = context.auth.uid;
    const userDoc = await db.collection("tenants").doc(userId).get();
    const userEmail = userDoc.data().email;

    const client = new MercadoPagoConfig({ accessToken });
    const preApprovalClient = new PreApproval(client);

    // ATENÇÃO: Verifique se este é o seu domínio final e público.
    // Tem de ser HTTPS para funcionar em produção.
    const backUrl = `https://sass-menu-onile-f-11iv.vercel.app//admin/assinatura`;

    const response = await preApprovalClient.create({
      body: {
        reason: "Assinatura Plano Pro - SaaS Menu Online",
        auto_recurring: {
          frequency: 1,
          frequency_type: "months",
          transaction_amount: 49.90,
          currency_id: "BRL",
        },
        payer_email: userEmail,
        back_url: backUrl,
        external_reference: userId,
      },
    });

    return { init_point: response.init_point };

  } catch (error) {
    console.error("ERRO FINAL (MERCADO PAGO):", JSON.stringify(error.cause ?? error, null, 2));
    throw new functions.https.HttpsError("internal", "Não foi possível criar a assinatura. Verifique os logs do Firebase para o erro detalhado.");
  }
});

// --- FUNÇÃO PARA CANCELAR A ASSINATURA ---
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

// --- WEBHOOK SEGURO ---
exports.mercadoPagoWebhook = functions.https.onRequest(async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const notification = req.body;
  
  try {
    if (notification.type === 'preapproval' && notification.data && notification.data.id) {
      const subscriptionId = notification.data.id;
      
      const accessToken = functions.config().mercadopago.access_token;
      const client = new MercadoPagoConfig({ accessToken });
      const preApprovalClient = new PreApproval(client);

      const subscription = await preApprovalClient.get({ id: subscriptionId });
      
      if (subscription && subscription.external_reference) {
        const userId = subscription.external_reference;
        let plan = 'basic'; 

        if (subscription.status === 'authorized' || subscription.status === 'active') {
          plan = 'pro';
          await db.collection("tenants").doc(userId).update({
            plan: plan,
            mercadoPagoSubscriptionId: subscriptionId
          });
        } else if (subscription.status === 'cancelled') {
          plan = 'basic';
          await db.collection("tenants").doc(userId).update({
            plan: plan,
            mercadoPagoSubscriptionId: admin.firestore.FieldValue.delete()
          });
        }
      }
    }
  } catch (error) {
    console.error("Erro no processamento do webhook:", error);
    return res.status(500).send("Erro interno no webhook.");
  }

  res.status(200).send("ok");
});