// Ficheiro completo: src/routes/index.js

import { Routes, Route } from 'react-router-dom';

// Importações do Admin
import AdminLayout from '../pages/Admin/AdminLayout';
import AdminLoginPage from '../pages/AdminLoginPage';
import ProtectedRoute from '../components/ProtectedRoute';
import DashboardOverviewPage from '../pages/Admin/DashboardOverviewPage';
import ProductsPage from '../pages/Admin/ProductsPage';
import CategoriesPage from '../pages/Admin/CategoriesPage';
import PromotionsPage from '../pages/Admin/PromotionsPage';
import ToppingsPage from '../pages/Admin/ToppingsPage';
import SettingsPage from '../pages/Admin/SettingsPage';
import SubscriptionPage from '../pages/Admin/SubscriptionPage';

// Importações da Loja Pública
import HomePage from '../pages/HomePage';
import MenuPage from '../pages/MenuPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import StoreLayout from '../components/StoreLayout';

// NOVAS IMPORTAÇÕES DO SUPER ADMIN
import SuperAdminRoute from '../components/SuperAdminRoute';
import SuperAdminDashboardPage from '../pages/SuperAdmin/SuperAdminDashboardPage';
const AppRoutes = () => {
  return (
    <Routes>
      {/* ROTAS DA LOJA PÚBLICA */}
      <Route path="/loja/:storeSlug" element={<StoreLayout />}>
        <Route index element={<HomePage />} />
        <Route path="cardapio" element={<MenuPage />} />
        <Route path="produto/:productId" element={<ProductDetailPage />} />
        <Route path="carrinho" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
      </Route>

      {/* ROTAS DO PAINEL DE ADMINISTRAÇÃO */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* Rotas de acesso geral para qualquer plano */}
        <Route index element={<DashboardOverviewPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="toppings" element={<ToppingsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="assinatura" element={<SubscriptionPage />} />

        {/* ROTA PREMIUM - Protegida com a nova lógica */}
        <Route
          path="promotions"
          element={
            <ProtectedRoute requiredPlan="pro">
              <PromotionsPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route
        path="/super-admin"
        element={
          <SuperAdminRoute>
            <SuperAdminDashboardPage />
          </SuperAdminRoute>
        }
      />

      {/* Rota de fallback */}
      <Route path="*" element={<div>Página não encontrada. Você quis dizer <a href="/loja/vibe-acai-teste">/loja/vibe-acai-teste</a>?</div>} />
    </Routes>
  );
};

export default AppRoutes;