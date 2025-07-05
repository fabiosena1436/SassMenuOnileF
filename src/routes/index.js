// Arquivo: src/routes/index.js

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AdminLayout from '../pages/Admin/AdminLayout';
import StoreLayout from '../components/StoreLayout';

// Componente de Proteção
import ProtectedRoute from '../components/ProtectedRoute';

// Páginas Públicas
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
import ToppingsPage from '../pages/Admin/ToppingsPage';
import PromotionsPage from '../pages/Admin/PromotionsPage';
import SubscriptionPage from '../pages/Admin/SubscriptionPage';
import PrintableReceiptPage from '../pages/Admin/PrintableReceiptPage';

// Rota Super Admin
import SuperAdminRoute from '../components/SuperAdminRoute';
import SuperAdminDashboardPage from '../pages/SuperAdmin/SuperAdminDashboardPage';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/loja/vibe-acai-teste" replace />} />

      {/* ROTAS PÚBLICAS DA LOJA */}
      <Route path="/loja/:storeSlug" element={<StoreLayout />}>
        <Route index element={<HomePage />} />
        <Route path="cardapio" element={<MenuPage />} />
        <Route path="produto/:productId" element={<ProductDetailPage />} />
        <Route path="carrinho" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
      </Route>

      {/* ROTAS DE ADMINISTRAÇÃO */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/print/order/:orderId" element={<PrintableReceiptPage />} />

      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardOverviewPage />} />
        {/* <<< MUDANÇA NOS CAMINHOS AQUI >>> */}
        <Route path="products" element={<ProductsPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="toppings" element={<ToppingsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="promotions" element={<PromotionsPage />} />
        <Route path="assinatura" element={<SubscriptionPage />} />
      </Route>

      {/* ROTA SUPER ADMIN */}
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