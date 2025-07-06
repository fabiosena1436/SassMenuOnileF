// Arquivo: src/pages/Admin/AdminLayout/index.js

import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { auth, db } from '../../../services/firebaseConfig';
import { signOut } from 'firebase/auth';
import Button from '../../../components/Button';
import { FaBars, FaTimes, FaBell, FaCopy } from 'react-icons/fa'; // Importar ícone de cópia
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
  const { tenant } = useAuth(); // Pegamos o tenant para o link e o plano
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const isInitialLoad = useRef(true);

  // Lógica de notificação (permanece igual)
  useEffect(() => {
    if (!tenant?.id) return;
    const ordersQuery = query(collection(db, "orders"), where("tenantId", "==", tenant.id), where("status", "==", "pending"));
    const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      setNotificationCount(snapshot.size);
      if (isInitialLoad.current) { isInitialLoad.current = false; return; }
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          // ... (código do toast e do som)
        }
      });
    });
    return () => unsubscribe();
  }, [tenant]);
  
  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
    toast.success("Sessão terminada.");
  };

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
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
    if (path.includes('/orders')) return 'Visão Geral & Pedidos';
    return 'Visão Geral';
  };
  
  // <<< NOVA FUNÇÃO ADICIONADA >>>
  const handleCopyStoreLink = () => {
    if (!tenant?.slug) return toast.error("Link da loja não encontrado.");
    const storeUrl = `${window.location.origin}/loja/${tenant.slug}`;
    navigator.clipboard.writeText(storeUrl)
      .then(() => toast.success('Link da loja copiado!'))
      .catch(() => toast.error('Falha ao copiar o link.'));
  };

  return (
    <AdminWrapper>
      {isSidebarOpen && <Overlay onClick={toggleSidebar} />}
      <Sidebar $isOpen={isSidebarOpen}>
        <SidebarTitle>{tenant?.storeName || 'Carregando...'}</SidebarTitle>
        <div style={{ padding: '0 20px 10px', fontSize: '12px', color: '#ccc' }}>
          Plano Atual: <strong>{tenant?.plan || '...'}</strong>
        </div>
        <NavSeparator />
        <NavList>
          <StyledNavLink to="/admin/dashboard" end onClick={handleLinkClick}>Visão Geral & Pedidos</StyledNavLink>
          <StyledNavLink to="/admin/products" onClick={handleLinkClick}>Produtos</StyledNavLink>
          <StyledNavLink to="/admin/categories" onClick={handleLinkClick}>Categorias</StyledNavLink>
          <StyledNavLink to="/admin/toppings" onClick={handleLinkClick}>Adicionais</StyledNavLink>
          {tenant?.plan === 'pro' && (
            <StyledNavLink to="/admin/promotions" onClick={handleLinkClick}>Promoções</StyledNavLink>
          )}
          <StyledNavLink to="/admin/settings" onClick={handleLinkClick}>Configurações</StyledNavLink>
          <NavSeparator />
          <StyledNavLink to="/admin/assinatura" onClick={handleLinkClick}>Minha Assinatura</StyledNavLink>
        </NavList>
        <div style={{ marginTop: 'auto', padding: '20px' }}>
          <Button onClick={handleLogout} $variant="danger" style={{width: '100%'}}>Sair</Button>
        </div>
      </Sidebar>

      <ContentArea>
        <header className="admin-header">
          <MenuButton onClick={toggleSidebar}>
            <FaBars />
          </MenuButton>
          <h1 className="header-title">{getPageTitle()}</h1>

          {/* <<< BOTÃO ADICIONADO AQUI, SEM ALTERAR O RESTO DO LAYOUT >>> */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Button onClick={handleCopyStoreLink} $variant="secondary">
                <FaCopy style={{ marginRight: '8px' }} />
                Copiar Link
            </Button>
            <NotificationBellWrapper onClick={() => navigate('/admin/orders')}>
              <FaBell />
              {notificationCount > 0 && <NotificationBadge>{notificationCount}</NotificationBadge>}
            </NotificationBellWrapper>
          </div>
        </header>
        <main className="admin-main-content">
          <Outlet />
        </main>
      </ContentArea>
    </AdminWrapper>
  );
};

export default AdminLayout;