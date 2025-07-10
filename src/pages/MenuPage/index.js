import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useStore } from '../../contexts/StoreContext';
import { db } from '../../services/firebaseConfig';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { useSearchParams } from 'react-router-dom'; // Reintroduzido
import { FiSearch } from 'react-icons/fi';
import toast from 'react-hot-toast';
import ProductCard from '../../components/ProductCard';
import ProductListItem from '../../components/ProductListItem';

// Importando Swiper para o carrossel
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import {
  MenuPageWrapper, MenuHeader, MenuTitle, SearchContainer, SearchInput,
  CategoryCarouselWrapper, // Reintroduzido
  CategoryButton,          // Reintroduzido
  LoadingText, NoProductsText,
  ProductGrid,
  ProductList,
  CategoryTitle
} from './styles';

const MenuPage = () => {
  const store = useStore();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- LÓGICA DO FILTRO E CARROSSEL RESTAURADA ---
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const activeCategory = searchParams.get('category') || 'Todos';
  const categoryRefs = useRef({});

  const fetchMenuData = useCallback(async () => {
    if (!store?.id) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const tenantId = store.id;
      const categoriesRef = collection(db, 'tenants', tenantId, 'categories');
      const productsRef = collection(db, 'tenants', tenantId, 'products');

      const categoriesQuery = query(categoriesRef, orderBy('name'));
      const productsQuery = query(productsRef, where('isAvailable', '==', true));

      const [categoriesSnap, productsSnap] = await Promise.all([
        getDocs(categoriesQuery),
        getDocs(productsQuery)
      ]);

      setCategories(categoriesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setProducts(productsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      toast.error("Erro ao carregar o cardápio.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [store]);

  useEffect(() => {
    fetchMenuData();
  }, [fetchMenuData]);

  // --- NOVA FUNÇÃO DE SCROLL ---
  const handleCategoryClick = (categoryName) => {
    setSearchParams(categoryName === 'Todos' ? {} : { category: categoryName });
    
    const ref = categoryRefs.current[categoryName];
    if (ref) {
      // O 'block: start' garante que o topo do elemento fique no topo da tela
      ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const groupedProducts = useMemo(() => {
    const searchedProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return categories.map(category => ({
      ...category,
      products: searchedProducts.filter(product => product.category === category.name)
    })).filter(category => category.products.length > 0);
  }, [categories, products, searchTerm]);

  if (loading) {
    return <LoadingText>A carregar o cardápio...</LoadingText>;
  }

  return (
    <MenuPageWrapper ref={ref => (categoryRefs.current['Todos'] = ref)}>
      <MenuHeader>
        <MenuTitle>Nosso Cardápio</MenuTitle>
      </MenuHeader>

      <SearchContainer>
        <FiSearch size={20} />
        <SearchInput
          type="text"
          placeholder="Pesquisar no cardápio..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>

      {/* --- CARROSSEL DE CATEGORIAS RESTAURADO --- */}
      <CategoryCarouselWrapper>
        <Swiper slidesPerView="auto" spaceBetween={10}>
          <SwiperSlide>
            <CategoryButton $isActive={activeCategory === 'Todos'} onClick={() => handleCategoryClick('Todos')}>
              Todos
            </CategoryButton>
          </SwiperSlide>
          {categories.map(category => (
            <SwiperSlide key={category.id}>
              <CategoryButton $isActive={activeCategory === category.name} onClick={() => handleCategoryClick(category.name)}>
                {category.name}
              </CategoryButton>
            </SwiperSlide>
          ))}
        </Swiper>
      </CategoryCarouselWrapper>
      
      {/* --- RENDERIZAÇÃO AGRUPADA MANTIDA --- */}
      {groupedProducts.length > 0 ? (
        groupedProducts.map(category => (
          // Adicionamos a 'ref' para a função de scroll encontrar esta secção
          <div key={category.id} ref={ref => (categoryRefs.current[category.name] = ref)}>
            <CategoryTitle>{category.name}</CategoryTitle>
            
            <ProductGrid>
              {category.products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ProductGrid>

            <ProductList>
              {category.products.map(product => (
                <ProductListItem key={product.id} product={product} />
              ))}
            </ProductList>
          </div>
        ))
      ) : (
        <NoProductsText>
          {searchTerm 
            ? "Nenhum produto encontrado para sua busca." 
            : "Nenhum produto disponível no momento."
          }
        </NoProductsText>
      )}
    </MenuPageWrapper>
  );
};

export default MenuPage;