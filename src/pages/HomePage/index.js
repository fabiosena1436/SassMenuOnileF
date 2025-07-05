// Arquivo: src/pages/HomePage/index.js

import React, { useState, useEffect, useCallback } from 'react';
import { useStore } from '../../contexts/StoreContext';
import { db } from '../../services/firebaseConfig';
import { collection, getDocs, query, where, documentId } from 'firebase/firestore';
import toast from 'react-hot-toast';

import ProductCard from '../../components/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import {
  HomePageWrapper, HeroSection, HeroContent, StoreLogo, StoreStatus, ViewMenuButton,
  Section, SectionTitle, ContentGrid, LoadingText, CarouselWrapper, StoreClosedWarning
} from './styles';
import { FaStar } from 'react-icons/fa';

const HomePage = () => {
  const store = useStore();
  const [promotions, setPromotions] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!store?.id) return;
    setLoading(true);
    try {
      const tenantId = store.id;
      const productsRef = collection(db, 'tenants', tenantId, 'products');
      const promotionsRef = collection(db, 'tenants', tenantId, 'promotions');
      const promoQuery = query(promotionsRef, where("isActive", "==", true));
      const promoSnapshot = await getDocs(promoQuery);
      const activePromos = promoSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const productIdsInPromos = activePromos.map(p => p.productId).filter(Boolean);
      let productsForPromos = [];
      if (productIdsInPromos.length > 0) {
        const productsPromoQuery = query(productsRef, where(documentId(), 'in', productIdsInPromos));
        const productsSnapshot = await getDocs(productsPromoQuery);
        productsForPromos = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
      const finalPromotions = activePromos.map(promo => {
        const productDetails = productsForPromos.find(p => p.id === promo.productId);
        return (productDetails && productDetails.isAvailable) ? { ...promo, product: productDetails } : null;
      }).filter(Boolean);
      setPromotions(finalPromotions);
      const featuredQuery = query(productsRef, where("isFeatured", "==", true), where("isAvailable", "==", true));
      const featuredSnapshot = await getDocs(featuredQuery);
      const featuredData = featuredSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFeaturedProducts(featuredData.filter(p => !productIdsInPromos.includes(p.id)));
    } catch (error) {
      toast.error("Erro ao carregar os dados da loja.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [store]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading || !store) {
    return <LoadingText>A carregar a loja...</LoadingText>;
  }

  return (
    <HomePageWrapper>
      <HeroSection $bgImage={store.bannerUrl}>
        <HeroContent>
          <StoreLogo src={store.logoUrl} alt={`Logo de ${store.storeName}`} />
          <StoreStatus $isOpen={store.isStoreOpen}>
            {store.isStoreOpen ? 'Loja Aberta' : 'Loja Fechada'}
          </StoreStatus>
          <ViewMenuButton to={`/loja/${store.slug}/cardapio`}>Ver Cardápio</ViewMenuButton>
        </HeroContent>
      </HeroSection>

      {!store.isStoreOpen && (
        <StoreClosedWarning>
          <h3>Ops! Estamos Fechados</h3>
          <p>Nosso delivery não está funcionando no momento.</p>
          {store.openingHoursText && (
            <p style={{ marginTop: '10px', whiteSpace: 'pre-wrap' }}>
              <strong>Nosso horário de atendimento é das:</strong><br/>
              {store.openingHoursText}
            </p>
          )}
        </StoreClosedWarning>
      )}

      {promotions.length > 0 && (
        <Section>
          <SectionTitle>🔥 Promoções Imperdíveis!</SectionTitle>
          <CarouselWrapper>
            <Swiper
              modules={[Pagination, Navigation]}
              spaceBetween={20}
              slidesPerView={1.5}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
            >
              {promotions.map(promo => (
                <SwiperSlide key={promo.id}>
                  <ProductCard
                    product={promo.product}
                    promotionalPrice={promo.promotionalPrice}
                    originalPrice={promo.originalPrice}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </CarouselWrapper>
        </Section>
      )}

      {featuredProducts.length > 0 && (
        <Section>
          <SectionTitle>⭐ Nossos Destaques</SectionTitle>
          <ContentGrid>
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ContentGrid>
        </Section>
      )}
    </HomePageWrapper>
  );
};

export default HomePage;