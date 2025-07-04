// Ficheiro completo: src/components/SuperAdminRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SuperAdminRoute = ({ children }) => {
  const { isAuthenticated, loading, userRole } = useAuth();

  // Enquanto as informações do utilizador estão a ser carregadas, exibimos uma mensagem.
  if (loading) {
    return <div>Carregando sessão...</div>;
  }

  // Se o utilizador não estiver autenticado OU se a sua função não for 'superadmin',
  // ele é redirecionado para a página de login de lojista.
  if (!isAuthenticated || userRole !== 'superadmin') {
    // Pode redirecionar para uma página de "acesso negado" no futuro, se preferir.
    return <Navigate to="/admin/login" replace />;
  }

  // Se o utilizador for um superadmin autenticado, ele tem permissão para ver a página.
  return children;
};

export default SuperAdminRoute;