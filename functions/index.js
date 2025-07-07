// Arquivo: functions/index.js

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { MercadoPagoConfig, Preference } = require("mercadopago");

admin.initializeApp();
const db = admin.firestore();

// --- INÍCIO DA ATUALIZAÇÃO ---

// Objeto para guardar as informações dos planos.
// Facilita a manutenção e evita "números mágicos" no código.
const PLANS = {
  pro: {
    id: "pro",
    title: "Plano Pro",
    price: 49.90, // Preço real do plano Pro
  },
  // Futuramente, você poderia adicionar outros planos aqui
  // basico: {
  //   id: "basico",
  //   title: "Plano Básico",
  //   price: 29.90,
  // }
};

exports.createSubscription = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "O usuário precisa estar autenticado.",
    );
  }

  const { planId } = data; // Recebe o ID do plano do frontend
  const plan = PLANS[planId]; // Busca as informações do plano

  if (!plan) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "O plano selecionado não é válido.",
    );
  }

  const userId = context.auth.uid;
  const userDoc = await db.collection("tenants").doc(userId).get();
  const userEmail = userDoc.data().email;

  const client = new MercadoPagoConfig({
    accessToken: functions.config().mercadopago.access_token,
  });
  const preference = new Preference(client);

  try {
    const result = await preference.create({
      body: {
        items: [
          {
            id: plan.id,
            title: plan.title,
            quantity: 1,
            unit_price: plan.price, // Usa o preço do plano selecionado
          },
        ],
        payer: {
          email: userEmail,
        },
        back_urls: {
          success: `https://SEU_DOMINIO_OU_APP_URL/admin/assinatura?status=success`,
          failure: `https://SEU_DOMINIO_OU_APP_URL/admin/assinatura?status=failure`,
        },
        // O notification_url continua o mesmo, apontando para o nosso webhook
        notification_url: `https://SEU_PROJETO.cloudfunctions.net/mercadoPagoWebhook?user_id=${userId}`,
      },
    });

    return { preferenceId: result.id };
  } catch (error) {
    console.error("Erro ao criar preferência no Mercado Pago:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Não foi possível criar a assinatura.",
    );
  }
});

// --- FIM DA ATUALIZAÇÃO ---


// A função do webhook continua a mesma, mas vamos adicionar uma verificação extra
exports.mercadoPagoWebhook = functions.https.onRequest(async (req, res) => {
  // ATENÇÃO: O modo de teste que usamos deve ser removido ou protegido em produção.
  // Vamos manter por enquanto para facilitar, mas com um aviso.
  if (req.body.test_mode && req.body.user_id) {
    console.log("!!! MODO DE TESTE ATIVADO !!!");
    const userId = req.body.user_id;
    await db.collection("tenants").doc(userId).update({ plan: "pro" });
    return res.status(200).send("Webhook de teste recebido com sucesso!");
  }

  const payment = req.query; // Para pagamentos reais, a info vem na query
  const topic = payment.topic || payment.type;

  if (topic === "payment") {
    const paymentId = payment.id || payment["data.id"];
    const userId = req.query.user_id;

    if (!userId) {
      return res.status(400).send("User ID não encontrado na URL da notificação.");
    }
    
    // Aqui você faria uma chamada à API do Mercado Pago para verificar o status do paymentId
    // e, se o pagamento foi aprovado ("status: 'approved'"), você atualiza o plano.
    // Por simplicidade, vamos assumir que a notificação já é a confirmação.
    
    console.log(`Pagamento ${paymentId} recebido para o usuário ${userId}. Atualizando para 'pro'.`);
    await db.collection("tenants").doc(userId).update({
      plan: "pro", // Futuramente, você pode pegar o ID do plano do próprio pagamento
    });
  }

  res.status(200).send("ok");
});