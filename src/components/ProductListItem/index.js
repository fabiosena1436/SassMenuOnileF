// Arquivo: src/components/ProductListItem/index.js

import React from 'react';
import { FaEdit, FaTrash, FaStar } from 'react-icons/fa';
import Button from '../Button'; // Usaremos nosso componente Button

import {
  ListItemWrapper,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductDescription,
  ProductPrice,
  ActionContainer
} from './styles';

// Recebemos as funções onEdit e onDelete
const ProductListItem = ({ product, onEdit, onDelete }) => {
  const price = typeof product.price === 'number' ? product.price : 0;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <ListItemWrapper>
        <ProductImage src={product.imageUrl || 'https://via.placeholder.com/150'} alt={product.name} />
        <ProductInfo>
            <div>
                <ProductName>
                    {product.name || 'Produto sem nome'}
                    {product.isFeatured && <FaStar color="#ffc107" style={{ marginLeft: '8px' }} />}
                </ProductName>
                <ProductDescription>
                    {product.description || 'Sem descrição.'}
                </ProductDescription>
            </div>
            <div style={{marginTop: 'auto'}}>
                <ProductPrice>{formatCurrency(price)}</ProductPrice>
                <ActionContainer>
                    <Button onClick={onEdit} $variant="secondary" style={{ flex: 1, padding: '8px', fontSize: '0.9em' }}><FaEdit /> Editar</Button>
                    <Button onClick={onDelete} $variant="danger" style={{ flex: 1, padding: '8px', fontSize: '0.9em' }}><FaTrash /> Apagar</Button>
                </ActionContainer>
            </div>
        </ProductInfo>
    </ListItemWrapper>
  );
};

export default ProductListItem;