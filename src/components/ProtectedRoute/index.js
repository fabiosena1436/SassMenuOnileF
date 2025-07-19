import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { PageWrapper, LoadingText } from '../../pages/Admin/DashboardOverviewPage/styles';

const ProtectedRoute = ({ children }) => {
  // Continuamos a observar tudo, mas vamos usar a informação de forma diferente
  const { user, tenant, loading } = useAuth();
  const location = useLocation();

  // 1. Estado de carregamento: continua igual.
  if (loading) {
    return (
      <PageWrapper>
        <LoadingText>A verificar autenticação...</LoadingText>
      </PageWrapper>
    );
  }

  // 2. Se não há utilizador: continua igual, redireciona para o login.
  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // 3. Se há utilizador mas não há loja (tenant): continua igual, espera.
  if (!tenant) {
    return (
       <PageWrapper>
          <LoadingText>A preparar o seu painel de administração...</LoadingText>
       </PageWrapper>
    );
  }
  
  // O bloco que verificava a 'role' e redirecionava o 'superadmin' foi removido.

  // 4. Perfeito! A verificação terminou, há um utilizador E uma loja.
  //    Permitimos o acesso, não importa se a função é 'lojista' ou 'superadmin'.
  return children;
};

export default ProtectedRoute;