// Arquivo: src/pages/HomePage/index.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../services/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { useStore } from '../../contexts/StoreContext';
import styled from 'styled-components'; // <<< MUDANÇA 1: Importar o 'styled'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import ProductCard from '../../components/ProductCard';
import AcaiCustomizationModal from '../../components/AcaiCustomizationModal';

import {
  HomePageWrapper, HeroSection, HeroContent, LogoOverlay, StatusInfo, HeroMenuButton,
  Section, SectionTitle, ContentGrid, LoadingText, StoreClosedWarning, CarouselWrapper
} from './styles';

const HomePage = () => {
  const navigate = useNavigate();
  const store = useStore();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loadingContent, setLoadingContent] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      if (!store || !store.id) return;
      setLoadingContent(true);
      try {
        const productsRef = collection(db, 'tenants', store.id, 'products');
        const q = query(productsRef, where("isFeatured", "==", true), where("isAvailable", "==", true));
        
        const querySnapshot = await getDocs(q);
        const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFeaturedProducts(products);

      } catch (error) {
        console.error("Erro ao buscar produtos em destaque:", error);
        toast.error("Não foi possível carregar os destaques da loja.");
      } finally {
        setLoadingContent(false);
      }
    };
    
    fetchFeaturedProducts();
  }, [store]);

  if (!store) {
    return <LoadingText>Carregando loja...</LoadingText>;
  }
  
  return (
      <>
        <HomePageWrapper>
            <HeroSection $bgImage={store.bannerUrl}>
              <HeroContent>
                {store.logoUrl ? (
                  <LogoOverlay>
                    <img src={store.logoUrl} alt={store.storeName} />
                  </LogoOverlay>
                ) : (
                  <h1 style={{ color: 'white', textShadow: '2px 2px 4px #000' }}>{store.storeName}</h1>
                )}
                <StatusInfo $isOpen={store.isStoreOpen}>
                  {store.isStoreOpen ? '● Aberto agora' : '● Fechado no momento'}
                </StatusInfo>
                 <HeroMenuButton onClick={() => navigate(`/loja/${store.slug}/cardapio`)}>
                  Ver Cardápio Completo
                </HeroMenuButton>
              </HeroContent>
            </HeroSection>
            
            {loadingContent ? (
              <LoadingText>Carregando destaques...</LoadingText>
            ) : featuredProducts.length > 0 ? (
              <Section>
                <SectionTitle>🔥 Nossos Destaques</SectionTitle>
                <CarouselWrapper>
                   <Swiper
                    modules={[Navigation, Pagination, A11y]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    breakpoints={{
                      640: { slidesPerView: 2 },
                      1024: { slidesPerView: 4 },
                    }}
                  >
                  {featuredProducts.map(product => (
                    <SwiperSlide key={product.id}>
                      <ProductCard 
                        product={product} 
                        onProductClick={() => handleOpenModal(product)}
                      />
                    </SwiperSlide>
                  ))}
                  </Swiper>
                </CarouselWrapper>
              </Section>
            ) : (
                <Section>
                  <InfoText>Nenhum produto em destaque no momento.</InfoText>
                </Section>
            )}

        </HomePageWrapper>
        {selectedProduct && 
            <AcaiCustomizationModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                productToCustomize={selectedProduct} 
            />
        }
      </>
  );
};

// <<< MUDANÇA 2: Definir o componente InfoText aqui
const InfoText = styled.p`
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 1.1rem;
`;

export default HomePage;