// Ficheiro completo: functions/index.js (VERSÃO FINAL COM MODO DE TESTE)

const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { MercadoPagoConfig, PreApproval } = require("mercadopago");

initializeApp();

// ---------- FUNÇÃO 1: CRIAR ASSINATURA (Não muda) ----------
exports.createSubscription = onCall({ secrets: ["MERCADOPAGO_TOKEN"] }, async (request) => {
    // ... (todo o código da sua função createSubscription permanece exatamente o mesmo)
    logger.info("--- INICIANDO createSubscription ---", { auth: request.auth?.uid });
    const accessToken = process.env.MERCADOPAGO_TOKEN;
    if (!accessToken) {
        logger.error("!!! ERRO CRÍTICO: Segredo MERCADOPAGO_TOKEN não encontrado.");
        throw new HttpsError("internal", "Configuração de pagamento do servidor está em falta.");
    }
    if (!request.auth) {
        throw new HttpsError("unauthenticated", "É preciso estar autenticado.");
    }
    const client = new MercadoPagoConfig({ accessToken });
    const planId = request.data.planId;
    const userEmail = request.auth.token.email;
    if (!planId || !userEmail) {
        throw new HttpsError("invalid-argument", "Dados inválidos fornecidos.");
    }
    const plans = {
        plano_pro_mensal: { reason: "Plano Pro Mensal - Vibe Açaí SaaS", auto_recurring: { frequency: 1, frequency_type: "months", transaction_amount: 1.00, currency_id: "BRL" } }
    };
    const selectedPlan = plans[planId];
    if (!selectedPlan) {
        throw new HttpsError("invalid-argument", "Plano selecionado inválido.");
    }
    const body = {
        ...selectedPlan,
        payer_email: userEmail,
        back_url: `https://menuonlinesass.web.app/admin/assinatura?status=sucesso`,
        external_reference: request.auth.uid,
    };
    try {
        const preapproval = new PreApproval(client);
        const result = await preapproval.create({ body });
        return { checkoutUrl: result.init_point };
    } catch (error) {
        logger.error("!!! ERRO na chamada à API do Mercado Pago:", error);
        throw new HttpsError("internal", "Falha na comunicação com o Mercado Pago.");
    }
});

// ---------- FUNÇÃO 2: WEBHOOK DO MERCADO PAGO (COM MODO DE TESTE) ----------
exports.mercadoPagoWebhook = onRequest({ secrets: ["MERCADOPAGO_TOKEN"] }, async (req, res) => {
    logger.info("--- Webhook do Mercado Pago recebido ---", { body: req.body });

    const notification = req.body;
    
    // MODO DE TESTE MANUAL
    // Se enviarmos uma notificação com o campo "test_mode" a true, ele executa um fluxo de teste.
    if (notification.test_mode) {
        const testUserId = notification.user_id;
        if (!testUserId) {
            logger.error("Modo de teste: user_id em falta no corpo da requisição.");
            res.status(400).send("user_id é obrigatório para o modo de teste.");
            return;
        }
        logger.info(`--- EXECUTANDO EM MODO DE TESTE PARA O UTILIZADOR: ${testUserId} ---`);
        try {
            const db = getFirestore();
            const tenantsRef = db.collection('tenants');
            const q = tenantsRef.where('ownerId', '==', testUserId).limit(1);
            const tenantSnapshot = await q.get();

            if (tenantSnapshot.empty) {
                logger.error(`Modo de teste: Tenant não encontrado para o ownerId: ${testUserId}`);
                res.status(404).send("Tenant de teste não encontrado.");
                return;
            }

            const tenantDocRef = tenantSnapshot.docs[0].ref;
            await tenantDocRef.update({
                mp_subscription_id: "test_subscription_123456",
                mp_subscription_status: "authorized",
                plan: "pro",
            });

            logger.info(`Modo de teste: Tenant ${tenantDocRef.id} atualizado para o plano 'pro' com sucesso!`);
            res.status(200).send("Notificação de teste processada com sucesso.");
            return; // Termina a execução aqui

        } catch (error) {
            logger.error("Erro no modo de teste:", error);
            res.status(500).send("Erro interno ao processar o teste.");
            return;
        }
    }

    // Fluxo normal (que já tínhamos)
    const topic = notification.type || notification.topic;
    const notificationId = notification.data?.id || notification.id;

    if (topic !== 'preapproval' && topic !== 'preapproval_update') {
        logger.info(`Tópico ignorado: ${topic}.`);
        res.status(200).send("Notificação ignorada.");
        return;
    }

    try {
        const accessToken = process.env.MERCADOPAGO_TOKEN;
        if (!accessToken) {
            logger.error("Token do Mercado Pago não configurado no webhook.");
            res.status(500).send("Erro de configuração interna.");
            return;
        }
        const client = new MercadoPagoConfig({ accessToken });
        const preapproval = new PreApproval(client);
        const subscriptionDetails = await preapproval.get({ id: notificationId });
        const userId = subscriptionDetails.external_reference;
        const subscriptionStatus = subscriptionDetails.status;
        if (!userId) {
            logger.error("external_reference não encontrada na assinatura do MP.");
            res.status(400).send("Referência externa em falta.");
            return;
        }
        const db = getFirestore();
        const tenantsRef = db.collection('tenants');
        const q = tenantsRef.where('ownerId', '==', userId).limit(1);
        const tenantSnapshot = await q.get();
        if (tenantSnapshot.empty) {
            logger.error(`Tenant não encontrado para o ownerId: ${userId}`);
            res.status(404).send("Tenant não encontrado.");
            return;
        }
        const tenantDocRef = tenantSnapshot.docs[0].ref;
        const newPlan = subscriptionStatus === 'authorized' ? 'pro' : 'basic';
        await tenantDocRef.update({
            mp_subscription_id: subscriptionDetails.id,
            mp_subscription_status: subscriptionStatus,
            plan: newPlan,
        });
        logger.info(`Tenant ${tenantDocRef.id} atualizado! Novo status: ${subscriptionStatus}, Novo plano: ${newPlan}`);
        res.status(200).send("Notificação processada com sucesso.");

    } catch (error) {
        logger.error("Erro ao processar o webhook:", error);
        res.status(500).send("Erro interno ao processar a notificação.");
    }
});