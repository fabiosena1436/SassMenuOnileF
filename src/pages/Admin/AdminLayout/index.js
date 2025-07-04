// Ficheiro completo: src/pages/Admin/AdminLayout/index.js

import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { FaBars } from 'react-icons/fa';
import Button from '../../../components/Button';

// Importando os nomes corretos do seu arquivo de estilos
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
  const { logout, tenant } = useAuth(); // Agora pegamos o objeto 'tenant' completo
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLinkClick = () => {
    if (isSidebarOpen) {
      setSidebarOpen(false);
    }
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/products')) return 'Gerir Produtos';
    if (path.includes('/categories')) return 'Gerir Categorias';
    if (path.includes('/promotions')) return 'Gerir Promoções';
    if (path.includes('/toppings')) return 'Gerir Adicionais';
    if (path.includes('/settings')) return 'Configurações da Loja';
    if (path.includes('/assinatura')) return 'Minha Assinatura';
    return 'Visão Geral';
  };

  return (
    <AdminWrapper>
      {isSidebarOpen && <Overlay onClick={toggleSidebar} />}
      <Sidebar isOpen={isSidebarOpen}>
        <SidebarTitle>{tenant?.storeName || 'Carregando...'}</SidebarTitle>
        <div style={{ padding: '0 20px 10px', fontSize: '12px', color: '#ccc', wordBreak: 'break-all' }}>
          Plano Atual: <strong>{tenant?.plan || '...'}</strong>
        </div>
        <NavSeparator />
        <NavList>
          <StyledNavLink to="/admin" end onClick={handleLinkClick}>Visão Geral</StyledNavLink>
          <StyledNavLink to="/admin/products" onClick={handleLinkClick}>Produtos</StyledNavLink>
          <StyledNavLink to="/admin/categories" onClick={handleLinkClick}>Categorias</StyledNavLink>
          
          {/* AQUI ESTÁ A LÓGICA DO PLANO! */}
          {/* Este link só será renderizado se o plano do tenant for 'pro' */}
          {tenant?.plan === 'pro' && (
            <StyledNavLink to="/admin/promotions" onClick={handleLinkClick}>Promoções</StyledNavLink>
          )}

          <StyledNavLink to="/admin/toppings" onClick={handleLinkClick}>Adicionais</StyledNavLink>
          <StyledNavLink to="/admin/settings" onClick={handleLinkClick}>Configurações</StyledNavLink>
          <NavSeparator />
          <StyledNavLink to="/admin/assinatura" onClick={handleLinkClick}>Minha Assinatura</StyledNavLink>
        </NavList>
        <div style={{ marginTop: 'auto', padding: '20px' }}>
          <Button onClick={logout}>Sair</Button>
        </div>
      </Sidebar>

      <ContentArea>
        <header className="admin-header">
          <MenuButton onClick={toggleSidebar}>
            <FaBars />
          </MenuButton>
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