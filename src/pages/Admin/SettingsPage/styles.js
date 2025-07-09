// Arquivo: src/pages/Admin/SettingsPage/styles.js (Versão Completa e Final)

import styled from 'styled-components';

export const PageWrapper = styled.div`
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;

  h1 { 
    font-size: 2em; 
    color: ${({ theme }) => theme.colors.textDark}; 
    margin-bottom: 30px; 
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.5em; 
  color: ${({ theme }) => theme.colors.textMedium}; 
  margin-top: 40px; 
  margin-bottom: 15px; 
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderMedium}; 
  padding-bottom: 10px; 
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  
  label { 
    margin-bottom: 8px; 
    font-weight: 600; 
    color: ${({ theme }) => theme.colors.textDark}; 
  }
  
  input, 
  textarea { 
    padding: 10px; 
    border: 1px solid ${({ theme }) => theme.colors.border}; 
    border-radius: ${({ theme }) => theme.borderRadius.md}; 
    font-size: 1em; 
    background-color: ${({ theme }) => theme.colors.white}; 
  }
  
  textarea { 
    min-height: 100px; 
    resize: vertical; 
  }
`;

export const LoadingText = styled.p`
  text-align: center; 
  color: ${({ theme }) => theme.colors.textMedium}; 
  font-style: italic; 
  margin-top: 20px;
`;

export const SettingsBlock = styled.div`
  padding: 25px; 
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg}; 
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

export const CurrentValueDisplay = styled.div`
  margin-bottom: 1.5rem;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
  flex-grow: 1; /* Faz este bloco crescer para preencher o espaço */
  
  h4 {
    margin: 0 0 5px 0;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textMedium};
    font-weight: 500;
  }

  p {
    margin: 0;
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.textDarkest};
    font-weight: 600;
    word-break: break-all;
  }

  .no-value {
    font-style: italic;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

export const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;