// Arquivo: src/pages/MenuPage/index.js (VERSÃO SaaS)

import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import { useStore } from '../../contexts/StoreContext'; // 1. Importamos o hook da loja
import ProductCard from '../../components/ProductCard';

// Usando os nomes corretos dos seus componentes de estilo
import {
  MenuPageWrapper,
  CategorySectionTitle,
  ProductListContainer,
  LoadingText,
  MenuHeader,
  MenuTitle
} from './styles';

const MenuPage = () => {
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const storeInfo = useStore(); // 2. Obtemos as informações da loja (incluindo o tenantId)

  useEffect(() => {
    const fetchMenuData = async () => {
      // 3. Esperamos até que o storeInfo (e o tenantId) esteja disponível
      if (!storeInfo || !storeInfo.tenantId) {
        return;
      }

      try {
        setLoading(true);
        const tenantId = storeInfo.tenantId;

        // 4. Buscamos as categorias e produtos da loja correta
        const categoriesRef = collection(db, 'tenants', tenantId, 'categories');
        const productsRef = collection(db, 'tenants', tenantId, 'products');

        const categoriesSnapshot = await getDocs(query(categoriesRef, orderBy('name')));
        const productsSnapshot = await getDocs(productsRef);

        const productsData = productsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        
        // Agrupamos os produtos por categoria
        const groupedMenu = categoriesSnapshot.docs.map(categoryDoc => {
          const category = { ...categoryDoc.data(), id: categoryDoc.id };
          return {
            ...category,
            products: productsData.filter(p => p.category === category.name && p.isAvailable),
          };
        }).filter(category => category.products.length > 0);

        setMenuData(groupedMenu);
      } catch (error) {
        console.error("Erro ao buscar dados do cardápio:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, [storeInfo]); // 5. O useEffect reage à mudança do storeInfo

  if (loading) {
    return <MenuPageWrapper><LoadingText>Carregando cardápio...</LoadingText></MenuPageWrapper>;
  }

  return (
    <MenuPageWrapper>
      <MenuHeader>
        <MenuTitle>{storeInfo?.name || 'Nosso Cardápio'}</MenuTitle>
      </MenuHeader>

      {menuData.map((category) => (
        <section key={category.id} style={{ width: '100%', padding: '0 20px', boxSizing: 'border-box' }}>
          <CategorySectionTitle>{category.name}</CategorySectionTitle>
          <ProductListContainer>
            {category.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductListContainer>
        </section>
      ))}
    </MenuPageWrapper>
  );
};

export default MenuPage;