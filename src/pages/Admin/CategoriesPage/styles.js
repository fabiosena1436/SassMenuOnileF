// src/pages/Admin/CategoriesPage/styles.js
import styled from 'styled-components';

export const PageWrapper = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

export const SectionTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.textDarkest};
`;

export const LoadingText = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

export const InfoText = styled.p`
  text-align: center;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-top: 2rem;
`;

export const FormContainer = styled.form`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
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
    color: ${({ theme }) => theme.colors.textMedium};
  }

  input {
    padding: 0.75rem 1rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    font-size: 1rem;
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.info};
      box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.info};
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
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const CategoryInfo = styled.span`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textDark};
  font-weight: 500;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;