// Arquivo: src/pages/Admin/AdminLayout/index.js

import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { FaBars } from 'react-icons/fa';
import Button from '../../../components/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../../../services/firebaseConfig';
import toast from 'react-hot-toast';

import {
  AdminWrapper,
  Sidebar,
  ContentArea,
  StyledNavLink,
  SidebarTitle,
  NavList,
  MenuButton,
  Overlay,
  NavSeparator
} from './styles';

const AdminLayout = () => {
  const { tenant } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleLinkClick = () => {
    // Fecha a sidebar em telemóveis ao clicar num link
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };
  
  const handleLogout = async () => {
    await signOut(auth);
    toast.success('Sessão terminada.');
    // O ProtectedRoute irá redirecionar para a página de login
  };

  const getPageTitle = () => {
    const path = location.pathname.split('/admin/')[1] || 'dashboard';
    switch(path) {
      case 'products': return 'Gerir Produtos';
      case 'categories': return 'Gerir Categorias';
      case 'promotions': return 'Gerir Promoções';
      case 'toppings': return 'Gerir Adicionais';
      case 'settings': return 'Configurações da Loja';
      case 'assinatura': return 'Minha Assinatura';
      default: return 'Visão Geral';
    }
  };

  return (
    <AdminWrapper>
      <MenuButton onClick={toggleSidebar}>
        <FaBars />
      </MenuButton>

      {isSidebarOpen && <Overlay onClick={toggleSidebar} />}
      
      {/* <<< MUDANÇA AQUI: de 'isOpen' para '$isOpen' >>> */}
      <Sidebar $isOpen={isSidebarOpen}>
        <div>
          <SidebarTitle>{tenant?.storeName || 'Carregando...'}</SidebarTitle>
          <div style={{ padding: '0 20px 20px', fontSize: '13px', color: '#9ca3af', textAlign: 'center' }}>
            Plano Atual: <strong>{tenant?.plan || '...'}</strong>
          </div>
          <NavList>
            <StyledNavLink to="/admin/dashboard" end onClick={handleLinkClick}>Visão Geral</StyledNavLink>
            <StyledNavLink to="/admin/products" onClick={handleLinkClick}>Produtos</StyledNavLink>
            <StyledNavLink to="/admin/categories" onClick={handleLinkClick}>Categorias</StyledNavLink>
            <StyledNavLink to="/admin/toppings" onClick={handleLinkClick}>Adicionais</StyledNavLink>
            
            {/* Lógica do plano para mostrar/esconder o link de Promoções */}
            {tenant?.plan === 'pro' && (
              <StyledNavLink to="/admin/promotions" onClick={handleLinkClick}>Promoções</StyledNavLink>
            )}

            <StyledNavLink to="/admin/settings" onClick={handleLinkClick}>Configurações</StyledNavLink>
            <NavSeparator />
            <StyledNavLink to="/admin/assinatura" onClick={handleLinkClick}>Minha Assinatura</StyledNavLink>
          </NavList>
        </div>
        <div style={{ padding: '20px' }}>
          <Button onClick={handleLogout} $variant="secondary" style={{ width: '100%' }}>Sair</Button>
        </div>
      </Sidebar>

      <ContentArea>
        <header className="admin-header">
          <h1 className="header-title">{getPageTitle()}</h1>
        </header>
        <main className="admin-main-content">
          <Outlet />
        </main>
      </ContentArea>
    </AdminWrapper>
  );
};

export default AdminLayout;