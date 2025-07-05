// Arquivo: src/components/ProductCard/index.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../contexts/StoreContext';

import {
  CardWrapper,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductPrice,
  PricePrefix
} from './styles';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const store = useStore();

  const handleCardClick = () => {
    if (store?.slug && product?.id) {
      navigate(`/loja/${store.slug}/produto/${product.id}`);
    }
  };

  const getDisplayPrice = () => {
    // Se o produto tiver tamanhos customizáveis, mostra o preço "A partir de"
    if (product.hasCustomizableSizes && product.availableSizes?.length > 0) {
      // Encontra o menor preço entre os tamanhos disponíveis
      const minPrice = Math.min(...product.availableSizes.map(size => size.price));
      return (
        <>
          <PricePrefix>A partir de</PricePrefix>
          R$ {minPrice.toFixed(2).replace('.', ',')}
        </>
      );
    }
    
    // Caso contrário, mostra o preço normal do produto
    return `R$ ${(product.price || 0).toFixed(2).replace('.', ',')}`;
  };

  return (
    <CardWrapper onClick={handleCardClick}>
      <ProductImage src={product.imageUrl || 'https://via.placeholder.com/300'} alt={product.name} />
      <ProductInfo>
        <ProductName>{product.name || 'Produto sem nome'}</ProductName>
        <ProductPrice>{getDisplayPrice()}</ProductPrice>
      </ProductInfo>
    </CardWrapper>
  );
};

export default ProductCard;