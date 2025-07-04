// Arquivo: src/pages/Admin/ProductsPage/index.js (VERSÃO FINAL E CORRIGIDA)

import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../services/firebaseConfig';
import { useAuth } from '../../../contexts/AuthContext';
import ProductListItem from '../../../components/ProductListItem';
import Button from '../../../components/Button';

// Importando os nomes CORRETOS do seu arquivo de estilos
import {
  PageWrapper,      // Substituímos PageContainer por PageWrapper
  SectionTitle,    // Substituímos Title por SectionTitle
  ProductList,
  LoadingText      // Usando seu componente de texto de carregamento
} from './styles';

// Criamos um container simples para o cabeçalho já que não havia um específico
const HeaderContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '2rem'
};

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { tenantId } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!tenantId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const productsCollectionRef = collection(db, 'tenants', tenantId, 'products');
        const data = await getDocs(productsCollectionRef);
        
        setProducts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [tenantId]);

  const handleAddProduct = () => {
    console.log("Adicionar novo produto para o tenant:", tenantId);
  };

  if (loading) {
    return <PageWrapper><LoadingText>Carregando produtos...</LoadingText></PageWrapper>;
  }

  return (
    <PageWrapper>
      <div style={HeaderContainer}>
        <SectionTitle>Seus Produtos</SectionTitle>
        <div>
          <Button onClick={handleAddProduct}>Adicionar Produto</Button>
        </div>
      </div>
      <ProductList>
        {products.length > 0 ? (
          products.map(product => (
            <ProductListItem
              key={product.id}
              product={product}
            />
          ))
        ) : (
          <p>Nenhum produto encontrado. Que tal adicionar o primeiro?</p>
        )}
      </ProductList>
    </PageWrapper>
  );
};

export default ProductsPage;