// Arquivo: src/pages/MenuPage/index.js

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useStore } from '../../contexts/StoreContext';
import { db } from '../../services/firebaseConfig';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { useSearchParams } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import toast from 'react-hot-toast';
import ProductCard from '../../components/ProductCard';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import {
  MenuPageWrapper, MenuHeader, MenuTitle, SearchContainer, SearchInput, 
  CategoryCarouselWrapper, CategoryButton, ProductListContainer, LoadingText, NoProductsText
} from './styles';

const MenuPage = () => {
  const store = useStore();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados para os filtros
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const activeCategory = searchParams.get('category') || 'Todos';

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

  const handleCategoryClick = (categoryName) => {
    setSearchParams(categoryName === 'Todos' ? {} : { category: categoryName });
  };
  
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = activeCategory === 'Todos' || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchTerm]);

  if (loading) {
    return <LoadingText>A carregar o cardápio...</LoadingText>;
  }

  return (
    <MenuPageWrapper>
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
      
      {filteredProducts.length > 0 ? (
        <ProductListContainer>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductListContainer>
      ) : (
        <NoProductsText>Nenhum produto encontrado com estes filtros.</NoProductsText>
      )}
    </MenuPageWrapper>
  );
};

export default MenuPage;