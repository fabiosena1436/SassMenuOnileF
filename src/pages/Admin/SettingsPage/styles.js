// src/pages/Admin/SettingsPage/styles.js
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
  margin-bottom: 20px; 
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderMedium}; 
  padding-bottom: 10px; 
`;

export const Form = styled.form`
  background-color: ${({ theme }) => theme.colors.background}; 
  padding: 20px; 
  border-radius: ${({ theme }) => theme.borderRadius.lg}; 
  margin-top: 10px; 
  display: flex; 
  flex-direction: column; 
  gap: 15px; 
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  height: 100%; 
`;

export const FormGroup = styled.div`
  display: flex; 
  flex-direction: column; 
  flex-grow: 1;
  
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
  
  p { 
    font-size: 0.9em; 
    margin-top: 5px; 
    color: ${({ theme }) => theme.colors.textLight}; 
  }
  
  img {
    max-width: 150px; 
    height: auto;
    margin-top: 10px; 
    border-radius: ${({ theme }) => theme.borderRadius.lg}; 
    border: 1px solid ${({ theme }) => theme.colors.borderMedium};
  }
`;

export const LoadingText = styled.p`
  text-align: center; 
  color: ${({ theme }) => theme.colors.textMedium}; 
  font-style: italic; 
  margin-top: 20px;
`;

export const StatusDisplay = styled.div`
  margin-bottom: 10px; 
  font-size: 1.1em; 
  font-weight: bold;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-align: center;
  background-color: ${({ $isOpen, theme }) => ($isOpen ? theme.colors.successLight : theme.colors.dangerLight)};
  color: ${({ $isOpen, theme }) => ($isOpen ? theme.colors.successDarker : theme.colors.dangerDark)};
`;

export const SettingsBlock = styled.div`
  padding: 20px; 
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg}; 
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

export const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;