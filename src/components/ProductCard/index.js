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
  PricePrefix,
  OldPrice
} from './styles';

const ProductCard = ({ product, promotionalPrice, originalPrice }) => {
  const navigate = useNavigate();
  const store = useStore();

  const handleCardClick = () => {
    if (store?.slug && product?.id) {
      navigate(`/loja/${store.slug}/produto/${product.id}`);
    }
  };

  const formatCurrency = (value) => `R$ ${value.toFixed(2).replace('.', ',')}`;

  const getDisplayPrice = () => {
    // Se um preço promocional for fornecido, ele tem prioridade
    if (typeof promotionalPrice === 'number') {
      return (
        <>
          {/* Mostra o preço original riscado, se ele existir */}
          {typeof originalPrice === 'number' && (
            <OldPrice>
              {formatCurrency(originalPrice)}
            </OldPrice>
          )}
          <span>{formatCurrency(promotionalPrice)}</span>
        </>
      );
    }
    
    // Lógica para produtos com tamanhos diferentes
    if (product.hasCustomizableSizes && product.availableSizes?.length > 0) {
      const minPrice = Math.min(...product.availableSizes.map(size => size.price));
      return (
        <>
          <PricePrefix>A partir de</PricePrefix>
          {formatCurrency(minPrice)}
        </>
      );
    }
    
    // Retorna o preço padrão se não houver promoção ou tamanhos
    return formatCurrency(product.price || 0);
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