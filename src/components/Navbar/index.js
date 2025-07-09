// Arquivo: src/components/Navbar/index.js

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiHome, FiList } from 'react-icons/fi';
import { useCart } from '../../contexts/CartContext';
import { useStore } from '../../contexts/StoreContext';

import {
  NavbarContainer,
  Logo,
  NavLinks,
  NavLinkItem,
  RightActions, // Adicionado para agrupar ações
  CartIcon,
  CartCount,
  AdminLink,
  MobileBottomNav,  // <-- NOVO: Importa o contêiner da navegação inferior
  MobileNavLink   // <-- NOVO: Importa o link da navegação inferior
} from './styles';

const Navbar = () => {
  const { totalItems } = useCart();
  const store = useStore();
  const { pathname } = useLocation();

  if (!store) {
    return null;
  }

  const homeLink = `/loja/${store.slug}`;
  const menuLink = `/loja/${store.slug}/cardapio`;
  const cartLink = `/loja/${store.slug}/carrinho`;

  const isActive = (path) => pathname === path;

  return (
    <>
      <NavbarContainer>
        <Link to={homeLink}>
          <Logo>
            {store.logoUrl ? (
              <img src={store.logoUrl} alt={store.storeName} />
            ) : (
              <span>{store.storeName}</span>
            )}
          </Logo>
        </Link>

        {/* Links de navegação para Desktop */}
        <NavLinks>
          <NavLinkItem active={isActive(homeLink)}>
            <Link to={homeLink}>
              <FiHome />
              <span>Início</span>
            </Link>
          </NavLinkItem>
          <NavLinkItem active={isActive(menuLink)}>
            <Link to={menuLink}>
              <FiList />
              <span>Cardápio</span>
            </Link>
          </NavLinkItem>
        </NavLinks>

        {/* Ações da Direita (Admin e Carrinho) */}
        <RightActions>
          <AdminLink to="/admin">
            <FiUser />
          </AdminLink>
          <CartIcon to={cartLink}>
            <FiShoppingCart />
            {totalItems > 0 && <CartCount>{totalItems}</CartCount>}
          </CartIcon>
        </RightActions>
      </NavbarContainer>

      {/* --- NOVA BARRA DE NAVEGAÇÃO INFERIOR PARA MOBILE --- */}
      <MobileBottomNav>
        <MobileNavLink to={homeLink} active={isActive(homeLink) ? 1 : 0}>
          <FiHome />
          <span>Início</span>
        </MobileNavLink>
        <MobileNavLink to={menuLink} active={isActive(menuLink) ? 1 : 0}>
          <FiList />
          <span>Cardápio</span>
        </MobileNavLink>
        <MobileNavLink to={cartLink} active={isActive(cartLink) ? 1 : 0}>
          <FiShoppingCart />
          <span>Carrinho</span>
        </MobileNavLink>
        <MobileNavLink to="/admin" active={pathname.startsWith('/admin') ? 1 : 0}>
          <FiUser />
          <span>Admin</span>
        </MobileNavLink>
      </MobileBottomNav>
    </>
  );
};

export default Navbar;