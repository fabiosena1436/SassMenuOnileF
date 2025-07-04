// Ficheiro completo: src/components/ProtectedRoute/index.js

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// O componente agora aceita a propriedade "requiredPlan"
const ProtectedRoute = ({ children, requiredPlan }) => {
  const { isAuthenticated, loading, tenant } = useAuth();
  const location = useLocation(); // Hook para saber a página atual

  // Enquanto as informações do utilizador estão a ser carregadas, exibimos uma mensagem.
  if (loading) {
    return <div>Carregando sessão...</div>;
  }

  // Se, após o carregamento, o utilizador não estiver autenticado ou não tiver uma loja (tenant),
  // ele é enviado de volta para a página de login.
  if (!isAuthenticated || !tenant) {
    return <Navigate to="/admin/login" replace />;
  }

  // A NOVA LÓGICA DE VERIFICAÇÃO DE PLANO!
  // Se esta rota específica exige um plano (requiredPlan foi passado)...
  if (requiredPlan) {
    // ...e o plano do nosso utilizador ('tenant.plan') for DIFERENTE do plano exigido...
    if (tenant.plan !== requiredPlan) {
      // ...então, redirecionamos o utilizador para a página de assinatura para que ele possa fazer o upgrade.
      return <Navigate to="/admin/assinatura" replace state={{ from: location }} />;
    }
  }

  // Se o utilizador passou por todas as verificações, ele tem permissão para ver a página.
  return children;
};

export default ProtectedRoute;