// Arquivo: src/components/ProtectedRoute/index.js

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LoadingText } from '../../pages/MenuPage/styles'; // Podemos reutilizar este estilo

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Se o estado de autenticação ainda está a ser verificado, mostra uma mensagem de carregamento.
  if (loading) {
    return <LoadingText>A verificar autenticação...</LoadingText>;
  }

  // Se a verificação terminou e NÃO há utilizador, redireciona-o para a página de login.
  // Guardamos a página que ele tentou aceder (location) para o redirecionar de volta após o login.
  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Se a verificação terminou e HÁ um utilizador logado, permite o acesso à página solicitada.
  return children;
};

export default ProtectedRoute;