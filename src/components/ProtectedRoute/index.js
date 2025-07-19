import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
// --- CORREÇÃO ESTÁ AQUI ---
// Importamos ambos os componentes de estilo do local correto.
import { PageWrapper, LoadingText } from '../../pages/Admin/DashboardOverviewPage/styles';

const ProtectedRoute = ({ children }) => {
  // Agora também vamos observar o 'tenant'
  const { user, tenant, loading, userRole } = useAuth();
  const location = useLocation();

  // 1. Estado inicial: A autenticação e os dados da loja ainda estão a ser verificados.
  if (loading) {
    return (
      <PageWrapper>
        <LoadingText>A verificar autenticação...</LoadingText>
      </PageWrapper>
    );
  }

  // 2. A verificação terminou e NÃO há utilizador. Redireciona para o login.
  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // 3. --- A VERIFICAÇÃO CRUCIAL ---
  // A verificação terminou, HÁ um utilizador, mas AINDA NÃO HÁ uma loja (tenant).
  // Esperamos aqui, mostrando uma mensagem amigável.
  if (!tenant) {
    return (
       <PageWrapper>
          <LoadingText>A preparar o seu painel de administração...</LoadingText>
       </PageWrapper>
    );
  }

  // Se a rota for apenas para lojistas e o user for um superadmin, pode redirecioná-lo.
  if (userRole === 'superadmin') {
    return <Navigate to="/super-admin" state={{ from: location }} replace />;
  }
  
  // 4. Perfeito! A verificação terminou, há um utilizador E uma loja.
  //    Agora sim, podemos renderizar a página protegida.
  return children;
};

export default ProtectedRoute;