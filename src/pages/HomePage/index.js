// Arquivo: src/pages/HomePage/index.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../contexts/StoreContext';
import { db } from '../../services/firebaseConfig';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import toast from 'react-hot-toast';

import ProductCard from '../../components/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import {
  PageWrapper, HeroSection, StoreLogo, StoreName, StoreStatus, ContentSection,
  SectionTitle, CategoryGrid, CategoryCard, ProductCarousel, LoadingText
} from './styles';

const HomePage = () => {
  const navigate = useNavigate();
  const store = useStore();
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!store?.id) {
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      try {
        const tenantId = store.id;
        // Buscar categorias e produtos em paralelo
        const categoriesRef = collection(db, 'tenants', tenantId, 'categories');
        const productsRef = collection(db, 'tenants', tenantId, 'products');

        const categoriesQuery = query(categoriesRef, orderBy('name'));
        const featuredQuery = query(productsRef, where('isFeatured', '==', true), where('isAvailable', '==', true), limit(10));

        const [categoriesSnap, featuredSnap] = await Promise.all([
          getDocs(categoriesQuery),
          getDocs(featuredQuery),
        ]);

        setCategories(categoriesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setFeaturedProducts(featuredSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        toast.error("Erro ao carregar os dados da loja.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [store]);

  const handleCategoryClick = (categoryName) => {
    navigate(`cardapio?category=${encodeURIComponent(categoryName)}`);
  };

  if (loading) {
    return <LoadingText>A carregar a loja...</LoadingText>;
  }

  return (
    <PageWrapper>
      <HeroSection $bgImage={store?.bannerUrl}>
        {store?.logoUrl && <StoreLogo src={store.logoUrl} alt={`Logo de ${store.storeName}`} />}
        <StoreName>{store?.storeName || 'Nome da Loja'}</StoreName>
        <StoreStatus $isOpen={store?.isStoreOpen}>
          {store?.isStoreOpen ? 'Aberto Agora' : 'Fechado no momento'}
        </StoreStatus>
      </HeroSection>

      {categories.length > 0 && (
        <ContentSection>
          <SectionTitle>Navegue por Categorias</SectionTitle>
          <CategoryGrid>
            {categories.map(category => (
              <CategoryCard key={category.id} onClick={() => handleCategoryClick(category.name)}>
                <p>{category.name}</p>
              </CategoryCard>
            ))}
          </CategoryGrid>
        </ContentSection>
      )}

      {featuredProducts.length > 0 && (
        <ContentSection>
          <SectionTitle>Nossos Destaques</SectionTitle>
          <ProductCarousel>
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={2}
              navigation
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
            >
              {featuredProducts.map(product => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </ProductCarousel>
        </ContentSection>
      )}
    </PageWrapper>
  );
};

export default HomePage;