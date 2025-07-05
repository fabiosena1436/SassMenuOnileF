// Arquivo: src/pages/MenuPage/index.js

import React, { useState, useEffect } from 'react';
import { useStore } from '../../contexts/StoreContext';
import { db } from '../../services/firebaseConfig';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import toast from 'react-hot-toast';

import ProductCard from '../../components/ProductCard';
import AcaiCustomizationModal from '../../components/AcaiCustomizationModal';
import {
  MenuContainer,
  CategorySection,
  CategoryTitle,
  ProductGrid,
  LoadingText,
  InfoText
} from './styles';

const MenuPage = () => {
  const store = useStore();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados do Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchMenuData = async () => {
      if (!store || !store.id) return;

      setLoading(true);
      try {
        const tenantId = store.id;

        // Buscar categorias e produtos em paralelo para mais eficiência
        const categoriesRef = collection(db, 'tenants', tenantId, 'categories');
        const productsRef = collection(db, 'tenants', tenantId, 'products');

        const categoriesQuery = query(categoriesRef, orderBy('name'));
        const productsQuery = query(productsRef, where('isAvailable', '==', true));

        const [categoriesSnapshot, productsSnapshot] = await Promise.all([
          getDocs(categoriesQuery),
          getDocs(productsQuery)
        ]);

        const categoriesData = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const productsData = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setCategories(categoriesData);
        setProducts(productsData);

      } catch (error) {
        console.error("Erro ao carregar o cardápio:", error);
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
    <>
      <MenuContainer>
        <h1>Nosso Cardápio</h1>
        {store && !store.isStoreOpen && (
            <InfoText style={{backgroundColor: '#fed7d7', color: '#c53030', borderRadius: '8px'}}>
                A loja está fechada no momento. Você pode visualizar os produtos, mas não poderá fazer pedidos.
            </InfoText>
        )}

        {categories.length > 0 ? (
          categories.map(category => {
            // Filtra os produtos que pertencem a esta categoria
            const productsInCategory = products.filter(p => p.category === category.name);

            // Só renderiza a seção se houver produtos nela
            if (productsInCategory.length > 0) {
              return (
                <CategorySection key={category.id}>
                  <CategoryTitle>{category.name}</CategoryTitle>
                  <ProductGrid>
                    {productsInCategory.map(product => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        onProductClick={() => handleOpenModal(product)}
                      />
                    ))}
                  </ProductGrid>
                </CategorySection>
              );
            }
            return null; // Não renderiza a categoria se estiver vazia
          })
        ) : (
          <InfoText>Nenhum produto encontrado no cardápio desta loja.</InfoText>
        )}
      </MenuContainer>
      
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

export default MenuPage;