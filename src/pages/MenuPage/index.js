// Arquivo: src/pages/MenuPage/index.js

import React, { useState, useEffect } from 'react';
import { useStore } from '../../contexts/StoreContext';
import { db } from '../../services/firebaseConfig';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import toast from 'react-hot-toast';
import ProductCard from '../../components/ProductCard';

// O nome correto dos seus estilos
import {
  MenuPageWrapper as MenuContainer, // Usando um alias para manter a compatibilidade
  CategorySectionTitle as CategoryTitle,
  ProductListContainer as ProductGrid,
  LoadingText,
  NoProductsText as InfoText,
  StoreClosedWarning,
} from './styles';


const MenuPage = () => {
  const store = useStore();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // <<< MUDANÇA: REMOVEMOS toda a lógica de modal daqui >>>
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedProduct, setSelectedProduct] = useState(null);
  // const handleOpenModal = (product) => { ... };

  useEffect(() => {
    const fetchMenuData = async () => {
      if (!store || !store.id) return;
      // ... (a lógica para buscar dados continua a mesma)
      setLoading(true);
      try {
        const tenantId = store.id;
        const categoriesRef = collection(db, 'tenants', tenantId, 'categories');
        const productsRef = collection(db, 'tenants', tenantId, 'products');

        const categoriesQuery = query(categoriesRef, orderBy('name'));
        const productsQuery = query(productsRef, where('isAvailable', '==', true));

        const [categoriesSnapshot, productsSnapshot] = await Promise.all([
          getDocs(categoriesQuery),
          getDocs(productsQuery)
        ]);

        setCategories(categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setProducts(productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      } catch (error) {
        toast.error("Não foi possível carregar o cardápio.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, [store]);

  if (loading) {
    return <LoadingText>Montando o cardápio...</LoadingText>;
  }

  return (
    <MenuContainer>
      <h1>Nosso Cardápio</h1>
      {store && !store.isStoreOpen && (
          <StoreClosedWarning>
              A loja está fechada no momento. Você pode visualizar os produtos, mas não poderá fazer pedidos.
          </StoreClosedWarning>
      )}

      {categories.map(category => {
        const productsInCategory = products.filter(p => p.category === category.name);
        if (productsInCategory.length > 0) {
          return (
            <section key={category.id}>
              <CategoryTitle>{category.name}</CategoryTitle>
              <ProductGrid>
                {productsInCategory.map(product => (
                  // <<< MUDANÇA: Chamamos o ProductCard sem a prop onProductClick >>>
                  <ProductCard key={product.id} product={product} />
                ))}
              </ProductGrid>
            </section>
          );
        }
        return null;
      })}
    </MenuContainer>
  );
};

export default MenuPage;