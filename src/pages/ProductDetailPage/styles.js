// Arquivo: src/pages/ProductDetailPage/styles.js

import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PageWrapper = styled.div`
  padding-bottom: 100px;
`;

export const LoadingText = styled.p`
  text-align: center;
  font-size: 1.5rem;
  padding: 4rem;
  color: #718096;
`;

export const BackButton = styled(Link)`
  position: absolute;
  top: 90px;
  left: 20px;
  background: rgba(0,0,0,0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-decoration: none;
  cursor: pointer;
  z-index: 10;
`;

export const ProductBanner = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

export const ProductContent = styled.div`
  padding: 1.5rem;
  max-width: 800px;
  margin: -50px auto 0 auto;
  background: white;
  border-radius: 16px;
  position: relative;
  z-index: 5;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
`;

export const ProductName = styled.h1`
  font-size: 2.2rem;
  margin: 0 0 0.5rem 0;
`;

export const ProductDescription = styled.p`
  font-size: 1rem;
  color: #6b7280;
  line-height: 1.6;
`;

export const CustomizationSection = styled.section`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
`;

export const SectionTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const OptionGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const OptionLabel = styled.label`
  display: block;
  padding: 0.75rem 1.5rem;
  border: 2px solid ${({ $isActive }) => $isActive ? '#4f46e5' : '#d1d5db'};
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  background-color: ${({ $isActive }) => $isActive ? '#eef2ff' : 'transparent'};
  
  input[type="radio"] {
    display: none;
  }
`;

export const ToppingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

export const ToppingItemLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;

  .custom-checkbox {
    width: 20px;
    height: 20px;
    border: 2px solid #d1d5db;
    border-radius: 4px;
    display: inline-block;
    position: relative;
  }
  
  input[type="checkbox"] {
    display: none;
    &:checked + .custom-checkbox {
      background-color: #4f46e5;
      border-color: #4f46e5;
      &::after {
        content: '✔';
        color: white;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 12px;
      }
    }
  }
`;

export const ToppingImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
`;

export const ToppingInfo = styled.div`
  display: flex;
  flex-direction: column;
  span {
    font-weight: 500;
  }
  strong {
    font-size: 0.9rem;
    color: #4b5563;
  }
`;

export const ActionBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
  z-index: 100;
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #d1d5db;
    background-color: #f9fafb;
    font-size: 1.5rem;
    cursor: pointer;
    
    &:disabled {
        background-color: #e5e7eb;
        cursor: not-allowed;
    }
  }
  span {
    font-size: 1.2rem;
    font-weight: bold;
    min-width: 30px;
    text-align: center;
  }
`;

export const TotalPrice = styled.span`
  background-color: rgba(0,0,0,0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  margin-left: 0.5rem;
`;