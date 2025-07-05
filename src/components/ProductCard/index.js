// Arquivo: src/components/ProductCard/index.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../contexts/StoreContext';
import { CardWrapper, ProductImage, ProductInfo, ProductName, ProductPrice, PricePrefix, OldPrice } from './styles';

const ProductCard = ({ product, promotionalPrice, originalPrice }) => {
  const navigate = useNavigate();
  const store = useStore();

  const handleCardClick = () => {
    if (store?.slug && product?.id) {
      navigate(`/loja/${store.slug}/produto/${product.id}`);
    }
  };

  const getDisplayPrice = () => {
    // Se um preço promocional for passado, ele tem prioridade
    if (typeof promotionalPrice === 'number') {
      return (
        <>
          {typeof originalPrice === 'number' && (
            <OldPrice>
              R$ {originalPrice.toFixed(2).replace('.', ',')}
            </OldPrice>
          )}
          <span>R$ {promotionalPrice.toFixed(2).replace('.', ',')}</span>
        </>
      );
    }
    
    // Lógica para produtos com tamanhos
    if (product.hasCustomizableSizes && product.availableSizes?.length > 0) {
      const minPrice = Math.min(...product.availableSizes.map(size => size.price));
      return (
        <>
          <PricePrefix>A partir de</PricePrefix>
          R$ {minPrice.toFixed(2).replace('.', ',')}
        </>
      );
    }
    
    return `R$ ${(product.price || 0).toFixed(2).replace('.', ',')}`;
  };

  return (
    <CardWrapper onClick={handleCardClick}>
      <ProductImage src={product.imageUrl || 'https://via.placeholder.com/300'} alt={product.name} />
      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        <ProductPrice>{getDisplayPrice()}</ProductPrice>
      </ProductInfo>
    </CardWrapper>
  );
};

export default ProductCard;