// // Ficheiro: functions/index.js (Versão corrigida para Geração 1)

// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// const { MercadoPagoConfig, Preference, Payment } = require("mercadopago");

// admin.initializeApp();
// const db = admin.firestore();

// const PLANS = {
//   pro: {
//     id: "pro",
//     title: "Plano Pro",
//     price: 49.90, 
//   },
// };

// // Voltamos à sintaxe original da Geração 1
// exports.createSubscription = functions.https.onCall(async (data, context) => {
//   if (!context.auth) {
//     throw new functions.https.HttpsError("unauthenticated", "Utilizador não autenticado.");
//   }

//   const { planId } = data;
//   const plan = PLANS[planId];

//   if (!plan) {
//     throw new functions.https.HttpsError("invalid-argument", "Plano inválido.");
//   }

//   const userId = context.auth.uid;
//   const userDoc = await db.collection("tenants").doc(userId).get();
//   const userEmail = userDoc.data().email;

//   // Acedemos à chave através de functions.config()
//   const accessToken = functions.config().mercadopago.access_token;
//   const client = new MercadoPagoConfig({ accessToken });

//   const preference = new Preference(client);
//   const notification_url = `https://southamerica-east1-1:432238664625:web:764ec9b5680c35967a3b90.cloudfunctions.net/mercadoPagoWebhook?user_id=${userId}&plan=${plan.id}`;

//   try {
//     const result = await preference.create({
//       body: {
//         items: [{
//           id: plan.id,
//           title: plan.title,
//           quantity: 1,
//           unit_price: plan.price,
//         }],
//         payer: { email: userEmail },
//         back_urls: {
//           success: `https://sass-menu-onile-f-11iv-1m02ndx4s-fabiosena1436s-projects.vercel.app/admin/assinatura=success`,
//           failure: `http://localhost:3000/admin/assinatura?status=failure`,
//         },
//         notification_url: notification_url,
//       },
//     });
//     return { preferenceId: result.id };
//   } catch (error) {
//     console.error("Erro no Mercado Pago:", error);
//     throw new functions.https.HttpsError("internal", "Erro ao criar a assinatura.");
//   }
// });

// // Webhook na sintaxe da Geração 1
// exports.mercadoPagoWebhook = functions.https.onRequest(async (req, res) => {
//   if (req.method !== 'POST') {
//     return res.status(405).send('Method Not Allowed');
//   }

//   const { query } = req;

//   if (query.type === 'payment') {
//     const paymentId = query['data.id'];
//     const userId = query.user_id;
//     const planId = query.plan;

//     if (!userId || !planId) {
//       return res.status(400).send('Parâmetros em falta na URL da notificação.');
//     }

//     try {
//       const accessToken = functions.config().mercadopago.access_token;
//       const client = new MercadoPagoConfig({ accessToken });
//       const payment = new Payment(client);

//       const paymentInfo = await payment.get({ id: paymentId });

//       if (paymentInfo.status === 'approved') {
//         await db.collection("tenants").doc(userId).update({ plan: planId });
//         return res.status(200).send('Notificação processada com sucesso.');
//       } else {
//         return res.status(200).send('Notificação recebida, mas não aprovada.');
//       }

//     } catch (error) {
//       console.error("Erro ao verificar o pagamento:", error);
//       return res.status(500).send('Erro interno ao processar a notificação.');
//     }
//   }

//   res.status(200).send('Notificação recebida.');
// });


// Ficheiro: functions/index.js

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { MercadoPagoConfig, PreApproval } = require("mercadopago");

admin.initializeApp();
const db = admin.firestore();

// --- FUNÇÃO PARA CRIAR UMA ASSINATURA RECORRENTE ---
exports.createSubscription = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Utilizador não autenticado.");
  }

  const userId = context.auth.uid;
  const userDoc = await db.collection("tenants").doc(userId).get();
  const userEmail = userDoc.data().email;

  const accessToken = functions.config().mercadopago.access_token;
  const client = new MercadoPagoConfig({ accessToken });
  const preApprovalClient = new PreApproval(client);

  try {
    // Cria a assinatura diretamente. O Mercado Pago gere o plano internamente.
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
        back_url: `https://sass-menu-onile-f-11iv-1m02ndx4s-fabiosena1436s-projects.vercel.app/admin/assinatura`,
        external_reference: userId, // Guardamos o nosso ID de utilizador para referência
      },
    });

    // Retorna a URL de checkout para o frontend
    return { init_point: response.init_point };

  } catch (error) {
    console.error("Erro ao criar preferência de assinatura no Mercado Pago:", error.cause ?? error);
    throw new functions.https.HttpsError("internal", "Não foi possível criar a assinatura.");
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
    const result = await preApprovalClient.update({
      id: mercadoPagoSubscriptionId,
      body: { status: "cancelled" },
    });

    console.log("Assinatura cancelada no MP:", result);

    // O webhook tratará da atualização do plano no nosso DB para 'basic'
    return { status: "success", message: "Pedido de cancelamento enviado." };

  } catch (error) {
    console.error("Erro ao cancelar assinatura no MP:", error.cause ?? error);
    throw new functions.https.HttpsError("internal", "Não foi possível cancelar a sua assinatura.");
  }
});

// --- WEBHOOK SEGURO PARA OUVIR EVENTOS DO MERCADO PAGO ---
exports.mercadoPagoWebhook = functions.https.onRequest(async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const notification = req.body;
  console.log("Webhook recebido:", JSON.stringify(notification, null, 2));

  try {
    // Verifica se é uma notificação de assinatura (preapproval)
    if (notification.type === 'preapproval' && notification.data && notification.data.id) {
      const subscriptionId = notification.data.id;
      
      const accessToken = functions.config().mercadopago.access_token;
      const client = new MercadoPagoConfig({ accessToken });
      const preApprovalClient = new PreApproval(client);

      const subscription = await preApprovalClient.get({ id: subscriptionId });
      
      if (subscription && subscription.external_reference) {
        const userId = subscription.external_reference;
        let plan = 'basic'; // Por defeito, o plano é básico

        // Se a assinatura for autorizada ou ativa, o plano é Pro
        if (subscription.status === 'authorized' || subscription.status === 'active') {
          plan = 'pro';
          // Guarda o ID da assinatura no nosso banco de dados
          await db.collection("tenants").doc(userId).update({
            plan: plan,
            mercadoPagoSubscriptionId: subscriptionId
          });
          console.log(`Utilizador ${userId} atualizado para o plano ${plan}.`);
        }
        // Se for cancelada, faz o downgrade
        else if (subscription.status === 'cancelled') {
          plan = 'basic';
          await db.collection("tenants").doc(userId).update({
            plan: plan,
            mercadoPagoSubscriptionId: admin.firestore.FieldValue.delete()
          });
          console.log(`Assinatura do utilizador ${userId} cancelada. Downgrade para ${plan}.`);
        }
      }
    }
  } catch (error) {
    console.error("Erro no processamento do webhook:", error);
    // Retorna 500 para que o Mercado Pago tente novamente, se for um erro temporário
    return res.status(500).send("Erro interno no webhook.");
  }

  // Responde 200 para o Mercado Pago saber que recebemos a notificação
  res.status(200).send("ok");
});