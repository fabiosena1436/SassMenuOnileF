// Arquivo: src/pages/HomePage/index.js

import React, { useState, useEffect, useCallback } from 'react';
import { useStore } from '../../contexts/StoreContext';
import { db } from '../../services/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import toast from 'react-hot-toast';

import ProductCard from '../../components/ProductCard';
import { FaStar } from 'react-icons/fa';

import {
  HomePageWrapper, HeroSection, HeroContent, StoreLogo, StoreStatus, ViewMenuButton,
  FeaturedSection, SectionTitle, ProductGrid
} from './styles';
import { LoadingText } from '../MenuPage/styles'; // Reutilizando

const HomePage = () => {
  const store = useStore();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeaturedProducts = useCallback(async () => {
    if (!store?.id) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const productsRef = collection(db, 'tenants', store.id, 'products');
      const q = query(productsRef, where("isFeatured", "==", true), where("isAvailable", "==", true));
      const querySnapshot = await getDocs(q);
      setFeaturedProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      toast.error("Não foi possível carregar os destaques.");
    } finally {
      setLoading(false);
    }
  }, [store]);

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  if (loading || !store) {
    return <LoadingText>A carregar a loja...</LoadingText>;
  }

  return (
    <HomePageWrapper>
      <HeroSection $bgImage={store.bannerUrl}>
        {/* O Overlay foi removido */}
        <HeroContent>
          <StoreLogo src={store.logoUrl} alt={`Logo de ${store.storeName}`} />
          <StoreStatus>Loja Aberta</StoreStatus>
          <ViewMenuButton to="cardapio">Ver Cardápio</ViewMenuButton>
        </HeroContent>
      </HeroSection>

      <FeaturedSection>
        <SectionTitle>
          <FaStar /> Nossos Destaques
        </SectionTitle>
        {featuredProducts.length > 0 ? (
          <ProductGrid>
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductGrid>
        ) : (
          <p style={{textAlign: 'center', color: '#6b7280'}}>Nenhum produto em destaque no momento.</p>
        )}
      </FeaturedSection>
    </HomePageWrapper>
  );
};

export default HomePage;