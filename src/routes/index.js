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
import PrintableReceiptPage from '../pages/Admin/PrintableReceiptPage';

// --- NOVAS PÁGINAS SUPER ADMIN IMPORTADAS ---
import SuperAdminLoginPage from '../pages/SuperAdmin/SuperAdminLoginPage';
import SuperAdminDashboardPage from '../pages/SuperAdmin/SuperAdminDashboardPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* ROTA PRINCIPAL */}
      <Route path="/" element={<LandingPage />} />

      {/* ROTA DE REGISTO */}
      <Route path="/register" element={<RegistrationPage />} />

      {/* ROTAS PÚBLICAS DA LOJA */}
      <Route path="/loja/:storeSlug" element={<StoreLayout />}>
        <Route index element={<HomePage />} />
        <Route path="cardapio" element={<MenuPage />} />
        <Route path="produto/:productId" element={<ProductDetailPage />} />
        <Route path="carrinho" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
      </Route>

      {/* ROTAS DE ADMINISTRAÇÃO (LOJISTA) */}
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
        <Route path="print/order/:orderId" element={<PrintableReceiptPage />} />
      </Route>

      {/* --- ROTAS SUPER ADMIN --- */}
      {/* Rota de login exclusiva para Super Admin */}
      <Route path="/super-admin/login" element={<SuperAdminLoginPage />} />

      {/* Rota protegida para o painel de Super Admin */}
      <Route
        path="/super-admin"
        element={
          <SuperAdminRoute>
            <SuperAdminDashboardPage />
          </SuperAdminRoute>
        }
      />
      {/* Fim das rotas Super Admin */}

      <Route path="*" element={<div><h1>404 - Página Não Encontrada</h1></div>} />
    </Routes>
  );
};

export default AppRoutes;