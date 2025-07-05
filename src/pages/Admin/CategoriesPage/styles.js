// Arquivo: src/pages/Admin/CategoriesPage/styles.js

import styled from 'styled-components';

export const PageWrapper = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

export const SectionTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #1a202c;
`;

export const LoadingText = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #718096;
`;

export const InfoText = styled.p`
  text-align: center;
  font-size: 1rem;
  color: #718096;
  margin-top: 2rem;
`;

export const FormContainer = styled.form`
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #4a5568;
  }

  input {
    padding: 0.75rem 1rem;
    border: 1px solid #cbd5e0;
    border-radius: 4px;
    font-size: 1rem;
    &:focus {
      outline: none;
      border-color: #4299e1;
      box-shadow: 0 0 0 1px #4299e1;
    }
  }
`;

export const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CategoryListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const CategoryInfo = styled.span`
  font-size: 1.1rem;
  color: #2d3748;
  font-weight: 500;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;