// Arquivo: src/pages/Admin/AdminLayout/index.js

import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { auth, db } from '../../../services/firebaseConfig';
import { signOut } from 'firebase/auth';
import Button from '../../../components/Button';
import { FaBars, FaTimes, FaBell } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

import {
  AdminWrapper,
  Sidebar,
  SidebarTitle,
  NavList,
  StyledNavLink,
  ContentArea,
  MenuButton,
  Overlay,
  NavSeparator,
  NotificationBellWrapper,
  NotificationBadge,
} from './styles';

const AdminLayout = () => {
  const { tenant } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const isInitialLoad = useRef(true); // Para evitar notificação no carregamento inicial

  useEffect(() => {
    // Se não houver um tenant (lojista) logado, não faz nada.
    if (!tenant?.id) return;

    // Cria a consulta para ouvir APENAS os pedidos pendentes DESTA loja.
    const ordersQuery = query(
      collection(db, "orders"), 
      where("tenantId", "==", tenant.id), // A LIGAÇÃO CRUCIAL COM O LOJISTA
      where("status", "==", "pending")
    );

    const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      // O contador de notificações é sempre o número total de pedidos pendentes.
      setNotificationCount(snapshot.size);

      // Lógica para tocar som e mostrar toast apenas para NOVOS pedidos.
      if (isInitialLoad.current) {
        isInitialLoad.current = false;
        return;
      }

      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const newOrder = change.doc.data();
          const audio = new Audio('/notification.mp3'); // Certifique-se que o som está em /public
          audio.play().catch(e => console.warn("Não foi possível tocar o som.", e));
          
          toast.custom((t) => (
            <div style={{ backgroundColor: '#16a34a', color: 'white', padding: '16px', borderRadius: '8px' }}>
              <h4>🎉 Novo Pedido Recebido!</h4>
              <p>Cliente: <strong>{newOrder.customer.name}</strong></p>
            </div>
          ), { duration: 6000 });
        }
      });
    });

    return () => unsubscribe(); // Para de ouvir quando o componente é desmontado
  }, [tenant]);

  const handleLogout = async () => {
    await signOut(auth);
    toast.success('Sessão terminada.');
    navigate('/admin/login');
  };

  const handleBellClick = () => {
    if (window.innerWidth <= 768) setSidebarOpen(false);
    navigate('/admin/orders'); // Leva sempre para a página de pedidos
  };

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const handleLinkClick = () => {
    if (window.innerWidth <= 768) setSidebarOpen(false);
  };

  return (
    <AdminWrapper>
      <MenuButton onClick={toggleSidebar}>
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </MenuButton>

      <NotificationBellWrapper onClick={handleBellClick}>
        <FaBell />
        {notificationCount > 0 && (
          <NotificationBadge>{notificationCount}</NotificationBadge>
        )}
      </NotificationBellWrapper>

      {isSidebarOpen && <Overlay onClick={toggleSidebar} />}
      
      <Sidebar $isOpen={isSidebarOpen}>
        <div>
          <SidebarTitle>{tenant?.storeName || 'Carregando...'}</SidebarTitle>
          <div style={{ padding: '0 20px 20px', fontSize: '13px', color: '#9ca3af', textAlign: 'center' }}>
            Plano Atual: <strong>{tenant?.plan || '...'}</strong>
          </div>
          <NavList>
            <StyledNavLink to="/admin/dashboard" end onClick={handleLinkClick}>Visão Geral</StyledNavLink>
            <StyledNavLink to="/admin/orders" onClick={handleLinkClick}>
              Pedidos
              {notificationCount > 0 && <NotificationBadge style={{position: 'static', marginLeft: 'auto'}}>{notificationCount}</NotificationBadge>}
            </StyledNavLink>
            <NavSeparator />
            <StyledNavLink to="/admin/products" onClick={handleLinkClick}>Produtos</StyledNavLink>
            <StyledNavLink to="/admin/categories" onClick={handleLinkClick}>Categorias</StyledNavLink>
            <StyledNavLink to="/admin/toppings" onClick={handleLinkClick}>Adicionais</StyledNavLink>
            
            {tenant?.plan === 'pro' && (
              <StyledNavLink to="/admin/promotions" onClick={handleLinkClick}>Promoções</StyledNavLink>
            )}

            <NavSeparator />
            <StyledNavLink to="/admin/settings" onClick={handleLinkClick}>Configurações</StyledNavLink>
            <StyledNavLink to="/admin/assinatura" onClick={handleLinkClick}>Minha Assinatura</StyledNavLink>
          </NavList>
        </div>
        <div style={{ padding: '20px' }}>
          <Button onClick={handleLogout} $variant="secondary" style={{ width: '100%' }}>Sair</Button>
        </div>
      </Sidebar>

      <ContentArea $isSidebarOpen={isSidebarOpen}>
        <Outlet />
      </ContentArea>
    </AdminWrapper>
  );
};

export default AdminLayout;