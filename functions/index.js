// // Ficheiro: functions/index.js (Versão Final e Corrigida)

// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// const crypto = require("crypto");
// const { MercadoPagoConfig, PreApproval } = require("mercadopago");

// admin.initializeApp();
// const db = admin.firestore();

// exports.createSubscription = functions.https.onCall(async (data, context) => {
//   if (!context.auth) {
//     throw new functions.https.HttpsError("unauthenticated", "Utilizador não autenticado.");
//   }

//   const accessToken = functions.config().mercadopago.access_token;
//   if (!accessToken) {
//     console.error("ERRO CRÍTICO: 'mercadopago.access_token' não encontrado.");
//     throw new functions.https.HttpsError("internal", "Erro de configuração do servidor.");
//   }
  
//   try {
//     const userId = context.auth.uid;
//     const userDocRef = db.collection("users").doc(userId);
//     const userDoc = await userDocRef.get();

//     // --- CORREÇÃO FINAL AQUI ---
//     // A verificação correta no Admin SDK é .exists (uma propriedade) e não .exists() (uma função).
//     if (!userDoc.exists || !userDoc.data().email) {
//         console.error(`ERRO: Documento do utilizador ou email não encontrado para o UID: ${userId}`);
//         throw new functions.https.HttpsError("not-found", "Dados do utilizador não encontrados.");
//     }
//     const userEmail = userDoc.data().email;

//     const client = new MercadoPagoConfig({ accessToken });
//     const preApprovalClient = new PreApproval(client);

//     const backUrl = `https://sass-menu-onile-f-11iv.vercel.app/admin/assinatura`;

//     const response = await preApprovalClient.create({
//       body: {
//         reason: "Assinatura Plano Pro - SaaS Menu Online",
//         auto_recurring: {
//           frequency: 1,
//           frequency_type: "months",
//           transaction_amount: 9.90,
//           currency_id: "BRL",
//         },
//         payer_email: userEmail,
//         back_url: backUrl,
//         external_reference: userId,
//       },
//     });

//     return { init_point: response.init_point };

//   } catch (error) {
//     console.error("ERRO INESPERADO AO CRIAR ASSINATURA:", error);
//     if (error instanceof functions.https.HttpsError) {
//         throw error;
//     }
//     throw new functions.https.HttpsError("internal", "Ocorreu um erro inesperado no servidor. Verifique os logs.");
//   }
// });

// // As outras duas funções permanecem iguais e corretas.
// exports.cancelSubscription = functions.https.onCall(async (data, context) => {
//     if (!context.auth) {
//       throw new functions.https.HttpsError("unauthenticated", "Utilizador não autenticado.");
//     }
//     const userId = context.auth.uid;
//     const userDoc = await db.collection("tenants").doc(userId).get();
//     const { mercadoPagoSubscriptionId } = userDoc.data();
//     if (!mercadoPagoSubscriptionId) {
//       throw new functions.https.HttpsError("not-found", "Nenhuma assinatura ativa encontrada para este utilizador.");
//     }
//     const accessToken = functions.config().mercadopago.access_token;
//     const client = new MercadoPagoConfig({ accessToken });
//     const preApprovalClient = new PreApproval(client);
//     try {
//       await preApprovalClient.update({
//         id: mercadoPagoSubscriptionId,
//         body: { status: "cancelled" },
//       });
//       return { status: "success", message: "Pedido de cancelamento enviado." };
//     } catch (error) {
//       console.error("Erro ao cancelar assinatura no MP:", error.cause ?? error);
//       throw new functions.https.HttpsError("internal", "Não foi possível cancelar a sua assinatura.");
//     }
// });

// exports.mercadoPagoWebhook = functions.https.onRequest(async (req, res) => {
//     const webhookSecret = functions.config().mercadopago.webhook_secret;
//     const signatureHeader = req.headers['x-signature'];
//     if (!signatureHeader || !webhookSecret) {
//       console.error("Webhook recebido sem assinatura ou secret não configurada.");
//       return res.status(401).send("Unauthorized");
//     }
//     try {
//       const parts = signatureHeader.split(',');
//       const ts = parts.find(part => part.startsWith('ts=')).split('=')[1];
//       const hash = parts.find(part => part.startsWith('v1=')).split('=')[1];
//       const manifest = `id:${req.body.data.id};request-id:${req.headers['x-request-id']};ts:${ts};`;
//       const hmac = crypto.createHmac('sha256', webhookSecret);
//       hmac.update(manifest);
//       const expectedHash = hmac.digest('hex');
//       if (expectedHash !== hash) {
//         console.error("FALHA DE VERIFICAÇÃO: A assinatura do webhook é inválida.");
//         return res.status(401).send("Invalid signature");
//       }
//     } catch (e) {
//         console.error("Erro ao processar a assinatura do webhook:", e);
//         return res.status(400).send("Bad Request: Invalid signature format.");
//     }
//     const notification = req.body;
//     try {
//       if (notification.type === 'preapproval' && notification.data && notification.data.id) {
//         const subscriptionId = notification.data.id;
//         const accessToken = functions.config().mercadopago.access_token;
//         const client = new MercadoPagoConfig({ accessToken });
//         const preApprovalClient = new PreApproval(client);
//         const subscription = await preApprovalClient.get({ id: subscriptionId });
//         if (subscription && subscription.external_reference) {
//           const userId = subscription.external_reference;
//           if (subscription.status === 'authorized') {
//             await db.collection("tenants").doc(userId).update({
//               plan: 'pro',
//               mercadoPagoSubscriptionId: subscriptionId,
//               statusAssinatura: 'active'
//             });
//             console.log(`Utilizador ${userId} atualizado para o plano PRO.`);
//           } else if (subscription.status === 'cancelled') {
//             await db.collection("tenants").doc(userId).update({
//               plan: 'basic',
//               statusAssinatura: 'cancelled',
//             });
//             console.log(`Assinatura do utilizador ${userId} cancelada. Plano revertido para BASIC.`);
//           }
//         }
//       }
//     } catch (error) {
//       console.error("Erro no processamento da notificação do webhook:", error);
//       return res.status(500).send("Erro interno no webhook.");
//     }
//     res.status(200).send("ok");
// });


// Ficheiro: functions/index.js (Versão Completa para Depuração do Webhook)

// Ficheiro: functions/index.js (VERSÃO FINAL E ROBUSTA)

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const crypto = require("crypto");
const { MercadoPagoConfig, PreApproval } = require("mercadopago");

admin.initializeApp();
const db = admin.firestore();

// ... as funções createSubscription e cancelSubscription continuam iguais e corretas ...
exports.createSubscription = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError("unauthenticated", "Utilizador não autenticado.");
  const accessToken = functions.config().mercadopago.access_token;
  if (!accessToken) {
    console.error("ERRO CRÍTICO: 'mercadopago.access_token' não encontrado.");
    throw new functions.https.HttpsError("internal", "Erro de configuração do servidor.");
  }
  try {
    const userId = context.auth.uid;
    const userDocRef = db.collection("users").doc(userId);
    const userDoc = await userDocRef.get();
    if (!userDoc.exists || !userDoc.data().email) throw new functions.https.HttpsError("not-found", "Dados do utilizador não encontrados.");
    const userEmail = userDoc.data().email;
    const client = new MercadoPagoConfig({ accessToken });
    const preApprovalClient = new PreApproval(client);
    const backUrl = `https://sass-menu-onile-f-11iv.vercel.app/admin/assinatura`;
    const response = await preApprovalClient.create({
      body: {
        reason: "Assinatura Plano Pro - SaaS Menu Online",
        auto_recurring: { frequency: 1, frequency_type: "months", transaction_amount: 9.90, currency_id: "BRL" },
        payer_email: userEmail,
        back_url: backUrl,
        external_reference: userId,
      },
    });
    return { init_point: response.init_point };
  } catch (error) {
    console.error("ERRO INESPERADO AO CRIAR ASSINATURA:", error);
    if (error instanceof functions.https.HttpsError) throw error;
    throw new functions.https.HttpsError("internal", "Ocorreu um erro inesperado no servidor. Verifique os logs.");
  }
});

exports.cancelSubscription = functions.https.onCall(async (data, context) => {
    if (!context.auth) throw new functions.https.HttpsError("unauthenticated", "Utilizador não autenticado.");
    const userId = context.auth.uid;
    const userDoc = await db.collection("tenants").doc(userId).get();
    const { mercadoPagoSubscriptionId } = userDoc.data();
    if (!mercadoPagoSubscriptionId) throw new functions.https.HttpsError("not-found", "Nenhuma assinatura ativa encontrada.");
    const accessToken = functions.config().mercadopago.access_token;
    const client = new MercadoPagoConfig({ accessToken });
    const preApprovalClient = new PreApproval(client);
    try {
      await preApprovalClient.update({ id: mercadoPagoSubscriptionId, body: { status: "cancelled" } });
      return { status: "success", message: "Pedido de cancelamento enviado." };
    } catch (error) {
      console.error("Erro ao cancelar assinatura no MP:", error.cause ?? error);
      throw new functions.https.HttpsError("internal", "Não foi possível cancelar a sua assinatura.");
    }
});
// ------------------------------------------------------------------

exports.mercadoPagoWebhook = functions.https.onRequest(async (req, res) => {
    // 1. Verificação da assinatura (segurança)
    const webhookSecret = functions.config().mercadopago.webhook_secret;
    const signatureHeader = req.headers['x-signature'];
    if (!signatureHeader || !webhookSecret) return res.status(401).send("Unauthorized");
    try {
      const parts = signatureHeader.split(',');
      const ts = parts.find(part => part.startsWith('ts=')).split('=')[1];
      const hash = parts.find(part => part.startsWith('v1=')).split('=')[1];
      const manifest = `id:${req.body.data.id};request-id:${req.headers['x-request-id']};ts:${ts};`;
      const hmac = crypto.createHmac('sha256', webhookSecret);
      hmac.update(manifest);
      if (hmac.digest('hex') !== hash) return res.status(401).send("Invalid signature");
    } catch (e) {
      return res.status(400).send("Bad Request");
    }
    
    // 2. Processamento da notificação
    const notification = req.body;
    if ((notification.type === 'preapproval' || notification.type === 'subscription_preapproval') && notification.data?.id) {
        try {
            const subscriptionId = notification.data.id;
            const accessToken = functions.config().mercadopago.access_token;
            const client = new MercadoPagoConfig({ accessToken });
            const preApprovalClient = new PreApproval(client);
            
            // Busca os detalhes da assinatura
            const subscription = await preApprovalClient.get({ id: subscriptionId });

            if (subscription && subscription.external_reference) {
                const userId = subscription.external_reference;
                if (subscription.status === 'authorized') {
                    await db.collection("tenants").doc(userId).update({
                        plan: 'pro',
                        mercadoPagoSubscriptionId: subscriptionId,
                        statusAssinatura: 'active'
                    });
                    console.log(`SUCESSO: Utilizador ${userId} atualizado para o plano PRO.`);
                } else if (subscription.status === 'cancelled') {
                    await db.collection("tenants").doc(userId).update({
                        plan: 'basic',
                        statusAssinatura: 'cancelled',
                    });
                    console.log(`INFO: Assinatura do utilizador ${userId} cancelada.`);
                }
            }
        } catch (error) {
            // Se o erro for 404 (não encontrado), é provável que seja uma simulação.
            // Registamos o log mas respondemos 200 para o simulador não dar falha.
            if (error.status === 404) {
                console.log(`INFO: Assinatura com ID ${notification.data.id} não encontrada. Provavelmente uma simulação. A ignorar.`);
            } else {
                console.error("ERRO NO PROCESSAMENTO DO WEBHOOK:", error);
                // Para outros erros, retornamos 500 para que o MP tente reenviar.
                return res.status(500).send("Webhook processing error.");
            }
        }
    }
    
    // 3. Responde OK para o Mercado Pago
    res.status(200).send("ok");
});