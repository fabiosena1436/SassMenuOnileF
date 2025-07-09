// Arquivo: src/components/ProductListItem/index.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../contexts/StoreContext';
import {
  ListItemWrapper,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductPrice,
  PricePrefix,
  OldPrice
} from './styles';

const ProductListItem = ({ product, promotionalPrice, originalPrice }) => {
  const navigate = useNavigate();
  const store = useStore();

  const handleCardClick = () => {
    if (store?.slug && product?.id) {
      navigate(`/loja/${store.slug}/produto/${product.id}`);
    }
  };

  const formatCurrency = (value) => `R$ ${value.toFixed(2).replace('.', ',')}`;

  const getDisplayPrice = () => {
    if (typeof promotionalPrice === 'number') {
      return (
        <>
          {typeof originalPrice === 'number' && (
            <OldPrice>
              {formatCurrency(originalPrice)}
            </OldPrice>
          )}
          <span>{formatCurrency(promotionalPrice)}</span>
        </>
      );
    }
    
    if (product.hasCustomizableSizes && product.availableSizes?.length > 0) {
      const minPrice = Math.min(...product.availableSizes.map(size => size.price));
      return (
        <>
          <PricePrefix>A partir de</PricePrefix>
          {formatCurrency(minPrice)}
        </>
      );
    }
    
    return formatCurrency(product.price || 0);
  };

  return (
    <ListItemWrapper onClick={handleCardClick}>
      <ProductImage src={product.imageUrl || 'https://via.placeholder.com/150'} alt={product.name} />
      <ProductInfo>
        <ProductName>{product.name || 'Produto sem nome'}</ProductName>
        <ProductPrice>{getDisplayPrice()}</ProductPrice>
      </ProductInfo>
    </ListItemWrapper>
  );
};

export default ProductListItem;