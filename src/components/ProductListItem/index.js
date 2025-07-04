// Arquivo: src/components/ProductListItem/index.js (VERSÃO FINAL-FINAL CORRIGIDA)

import React from 'react';
import { FaEdit, FaTrash, FaStar } from 'react-icons/fa';

// Importando os nomes corretos do seu arquivo de estilos
import {
  ListItemWrapper,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductDescription,
  ProductPrice,
} from './styles';

// Criamos um container para os botões para melhor alinhamento
const ActionsContainer = {
  display: 'flex',
  gap: '10px',
  marginTop: '10px',
};

const ProductListItem = ({ product }) => {
  // Mantendo nossa lógica "blindada" para o preço
  const price = typeof product.price === 'number' ? product.price : 0;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const descriptionSnippet = product.description?.length > 100 
    ? `${product.description.substring(0, 100)}...` 
    : product.description;

  return (
    // Usando ListItemWrapper, o nome correto
    <ListItemWrapper>
      <ProductImage src={product.imageUrl || 'https://via.placeholder.com/150'} alt={product.name} />
      <ProductInfo>
        <div>
          <ProductName>
            {product.name || 'Produto sem nome'}
            {product.isFeatured && <FaStar color="#ffc107" style={{ marginLeft: '8px' }} />}
          </ProductName>
          <ProductDescription>
            {descriptionSnippet || 'Este produto não tem uma descrição.'}
          </ProductDescription>
          <ProductPrice>{formatCurrency(price)}</ProductPrice>
        </div>
        <div style={ActionsContainer}>
          <button className="edit-btn"><FaEdit /> Editar</button>
          <button className="delete-btn"><FaTrash /> Excluir</button>
        </div>
      </ProductInfo>
    </ListItemWrapper>
  );
};

export default ProductListItem;