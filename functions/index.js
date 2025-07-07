// Ficheiro: functions/index.js

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { MercadoPagoConfig, Preference, Payment } = require("mercadopago");

admin.initializeApp();
const db = admin.firestore();

// As informações dos planos continuam aqui, servindo de "fonte da verdade" para o backend.
const PLANS = {
  pro: {
    id: "pro",
    title: "Plano Pro",
    price: 49.90, // Preço que será enviado para o Mercado Pago
  },
};

exports.createSubscription = functions.runWith({ secrets: ["MERCADOPAGO_ACCESS_TOKEN"] }).https.onCall(async (data, context) => {
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

  const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });
  
  const preference = new Preference(client);
  const notification_url = `https://SEU_PROJETO.cloudfunctions.net/mercadoPagoWebhook?user_id=${userId}&plan=${plan.id}`;

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
          success: `https://SEU_DOMINIO_OU_APP_URL/admin/assinatura?status=success`,
          failure: `https://SEU_DOMINIO_OU_APP_URL/admin/assinatura?status=failure`,
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


// --- ATUALIZAÇÃO DE SEGURANÇA NO WEBHOOK ---
exports.mercadoPagoWebhook = functions.runWith({ secrets: ["MERCADOPAGO_ACCESS_TOKEN"] }).https.onRequest(async (req, res) => {
  // Apenas o método POST é permitido
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { query } = req;
  
  // Verificamos o tópico da notificação (deve ser 'payment')
  if (query.type === 'payment') {
    const paymentId = query['data.id'];
    const userId = query.user_id;
    const planId = query.plan;

    if (!userId || !planId) {
      return res.status(400).send('Parâmetros em falta na URL da notificação.');
    }

    try {
      const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });
      const payment = new Payment(client);
      
      // Busca os detalhes do pagamento na API do Mercado Pago usando o ID
      const paymentInfo = await payment.get({ id: paymentId });
      
      // **Verificação crucial**: Confirma se o pagamento está aprovado ('approved')
      if (paymentInfo.status === 'approved') {
        console.log(`Pagamento ${paymentId} aprovado para o utilizador ${userId}. A atualizar para o plano '${planId}'.`);
        
        // Atualiza o plano do utilizador no Firestore
        await db.collection("tenants").doc(userId).update({ plan: planId });
        
        // Responde ao Mercado Pago que a notificação foi recebida com sucesso
        return res.status(200).send('Notificação processada com sucesso.');
      } else {
        console.log(`Notificação de pagamento ${paymentId} recebida com estado '${paymentInfo.status}'. Nenhuma ação necessária.`);
        return res.status(200).send('Notificação recebida, mas não aprovada.');
      }

    } catch (error) {
      console.error("Erro ao verificar o pagamento:", error);
      return res.status(500).send('Erro interno ao processar a notificação.');
    }
  }

  // Se a notificação não for do tipo 'payment', apenas confirma o recebimento.
  res.status(200).send('Notificação recebida.');
});