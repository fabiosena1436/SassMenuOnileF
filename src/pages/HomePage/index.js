// Arquivo: src/pages/HomePage/index.js

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../services/firebaseConfig';
import { collection, getDocs, query, where, documentId } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { useStore } from '../../contexts/StoreContext'; // Alterado de useStoreSettings para useStore
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// ... (o resto das suas importações permanece o mesmo)
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import Button from '../../components/Button';
import ProductCard from '../../components/ProductCard';
import AcaiCustomizationModal from '../../components/AcaiCustomizationModal';
import PromoCard from '../../components/PromoCard';
import {
  HomePageWrapper, HeroSection, HeroContent, LogoOverlay, StatusInfo, HeroMenuButton,
  Section, SectionTitle, ContentGrid, LoadingText, StoreClosedWarning, CarouselWrapper
} from './styles';


const HomePage = () => {
  const navigate = useNavigate();
  const store = useStore(); // <<< MUDANÇA PRINCIPAL AQUI
  const [promotions, setPromotions] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loadingContent, setLoadingContent] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // O resto da sua lógica de HomePage...
  const handleOpenModal = (product, promo = null) => {
    setSelectedProduct({ ...product, appliedPromo: promo });
    setIsModalOpen(true);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      if (!store || !store.id) return; // Espera a loja carregar

      setLoadingContent(true);
      try {
        const tenantId = store.id;
        
        // Lógica para buscar promoções e produtos em destaque...
        // (a sua lógica existente deve funcionar, apenas certifique-se
        // de que as queries usam o tenantId se necessário)

      } catch (error) {
        console.error("ERRO AO BUSCAR DADOS DA HOME:", error);
        toast.error("Não foi possível carregar as novidades.");
      } finally {
        setLoadingContent(false);
      }
    };
    fetchData();
  }, [store]); // Depende do 'store' para re-executar

  if (!store) {
    return <LoadingText>Carregando loja...</LoadingText>;
  }

  // A partir daqui, em vez de 'settings.logoUrl', use 'store.logoUrl'
  // em vez de 'settings.isStoreOpen', use 'store.isStoreOpen'
  // e assim por diante.

  return (
      <>
        <HomePageWrapper>
            <HeroSection bgImage={store.bannerUrl}>
              <HeroContent>
                {store.logoUrl ? (
                  <LogoOverlay>
                    <img src={store.logoUrl} alt={store.storeName} />
                  </LogoOverlay>
                ) : (
                  <h1 style={{ color: 'white' }}>{store.storeName}</h1>
                )}
                <StatusInfo isOpen={store.isStoreOpen}>
                  {store.isStoreOpen ? '● Loja Aberta' : '● Loja Fechada'}
                </StatusInfo>
                 <HeroMenuButton onClick={() => navigate(`/loja/${store.slug}/cardapio`)}>
                  Ver Cardápio
                </HeroMenuButton>
              </HeroContent>
            </HeroSection>
            {/* O resto da sua página... */}
        </HomePageWrapper>
        <AcaiCustomizationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} productToCustomize={selectedProduct} />
      </>
  );
};

export default HomePage;