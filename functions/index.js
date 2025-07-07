// Ficheiro: functions/index.js (Versão corrigida para Geração 1)

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { MercadoPagoConfig, Preference, Payment } = require("mercadopago");

admin.initializeApp();
const db = admin.firestore();

const PLANS = {
  pro: {
    id: "pro",
    title: "Plano Pro",
    price: 49.90, 
  },
};

// Voltamos à sintaxe original da Geração 1
exports.createSubscription = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Utilizador não autenticado.");
  }

  const { planId } = data;
  const plan = PLANS[planId];

  if (!plan) {
    throw new functions.https.HttpsError("invalid-argument", "Plano inválido.");
  }

  const userId = context.auth.uid;
  const userDoc = await db.collection("tenants").doc(userId).get();
  const userEmail = userDoc.data().email;

  // Acedemos à chave através de functions.config()
  const accessToken = functions.config().mercadopago.access_token;
  const client = new MercadoPagoConfig({ accessToken });

  const preference = new Preference(client);
  const notification_url = `https://southamerica-east1-1:432238664625:web:764ec9b5680c35967a3b90.cloudfunctions.net/mercadoPagoWebhook?user_id=${userId}&plan=${plan.id}`;

  try {
    const result = await preference.create({
      body: {
        items: [{
          id: plan.id,
          title: plan.title,
          quantity: 1,
          unit_price: plan.price,
        }],
        payer: { email: userEmail },
        back_urls: {
          success: `http://localhost:3000/admin/assinatura?status=success`,
          failure: `http://localhost:3000/admin/assinatura?status=failure`,
        },
        notification_url: notification_url,
      },
    });
    return { preferenceId: result.id };
  } catch (error) {
    console.error("Erro no Mercado Pago:", error);
    throw new functions.https.HttpsError("internal", "Erro ao criar a assinatura.");
  }
});

// Webhook na sintaxe da Geração 1
exports.mercadoPagoWebhook = functions.https.onRequest(async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { query } = req;

  if (query.type === 'payment') {
    const paymentId = query['data.id'];
    const userId = query.user_id;
    const planId = query.plan;

    if (!userId || !planId) {
      return res.status(400).send('Parâmetros em falta na URL da notificação.');
    }

    try {
      const accessToken = functions.config().mercadopago.access_token;
      const client = new MercadoPagoConfig({ accessToken });
      const payment = new Payment(client);

      const paymentInfo = await payment.get({ id: paymentId });

      if (paymentInfo.status === 'approved') {
        await db.collection("tenants").doc(userId).update({ plan: planId });
        return res.status(200).send('Notificação processada com sucesso.');
      } else {
        return res.status(200).send('Notificação recebida, mas não aprovada.');
      }

    } catch (error) {
      console.error("Erro ao verificar o pagamento:", error);
      return res.status(500).send('Erro interno ao processar a notificação.');
    }
  }

  res.status(200).send('Notificação recebida.');
});