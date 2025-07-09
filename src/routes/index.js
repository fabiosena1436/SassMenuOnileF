// Arquivo: src/routes/index.js (Versão Final e Corrigida)

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts e Componentes
import AdminLayout from '../pages/Admin/AdminLayout';
import StoreLayout from '../components/StoreLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import SuperAdminRoute from '../components/SuperAdminRoute';

// Páginas Públicas Principais
import LandingPage from '../pages/LandingPage';
import RegistrationPage from '../pages/RegistrationPage';

// Páginas da Loja (Cardápio, etc.)
import HomePage from '../pages/HomePage';
import MenuPage from '../pages/MenuPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import ProductDetailPage from '../pages/ProductDetailPage';

// Páginas de Administração
import AdminLoginPage from '../pages/AdminLoginPage';
import DashboardOverviewPage from '../pages/Admin/DashboardOverviewPage';
import ProductsPage from '../pages/Admin/ProductsPage';
import CategoriesPage from '../pages/Admin/CategoriesPage';
import SettingsPage from '../pages/Admin/SettingsPage';
import PromotionsPage from '../pages/Admin/PromotionsPage';
import SubscriptionPage from '../pages/Admin/SubscriptionPage';

// --- NOVA PÁGINA IMPORTADA AQUI ---
import PrintableReceiptPage from '../pages/Admin/PrintableReceiptPage';

// Página Super Admin
import SuperAdminDashboardPage from '../pages/SuperAdmin/SuperAdminDashboardPage';


const AppRoutes = () => {
  return (
    <Routes>
      {/* ROTA PRINCIPAL: A "vitrine" do teu SaaS */}
      <Route path="/" element={<LandingPage />} />

      {/* ROTA DE REGISTO: Para novos lojistas se inscreverem */}
      <Route path="/register" element={<RegistrationPage />} />

      {/* ROTAS PÚBLICAS DA LOJA: O cardápio de cada cliente */}
      <Route path="/loja/:storeSlug" element={<StoreLayout />}>
        <Route index element={<HomePage />} />
        <Route path="cardapio" element={<MenuPage />} />
        <Route path="produto/:productId" element={<ProductDetailPage />} />
        <Route path="carrinho" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
      </Route>

      {/* ROTAS DE ADMINISTRAÇÃO: O painel de cada lojista */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardOverviewPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="promotions" element={<PromotionsPage />} />
        <Route path="assinatura" element={<SubscriptionPage />} />
        
        {/* --- NOVA ROTA ADICIONADA AQUI --- */}
        {/* Esta rota corresponde ao link do botão de imprimir */}
        <Route path="print/order/:orderId" element={<PrintableReceiptPage />} />
      </Route>

      {/* ROTA SUPER ADMIN: O teu painel de controlo geral */}
      <Route
        path="/super-admin"
        element={
          <SuperAdminRoute>
            <SuperAdminDashboardPage />
          </SuperAdminRoute>
        }
      />

      <Route path="*" element={<div><h1>404 - Página Não Encontrada</h1></div>} />
    </Routes>
  );
};

export default AppRoutes;