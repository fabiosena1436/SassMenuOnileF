// Arquivo: src/pages/Admin/SettingsPage/styles.js

import styled from 'styled-components';

export const PageWrapper = styled.div`
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;

  h1 { 
    font-size: 2em; 
    color: #333; 
    margin-bottom: 30px; 
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.5em; 
  color: #555; 
  margin-top: 40px; 
  margin-bottom: 20px; 
  border-bottom: 1px solid #ddd; 
  padding-bottom: 10px; 
`;

export const Form = styled.form`
  background-color: #f9f9f9; 
  padding: 20px; 
  border-radius: 8px; 
  margin-top: 10px; 
  display: flex; 
  flex-direction: column; 
  gap: 15px; 
  border: 1px solid #eee;
  height: 100%; 
`;

export const FormGroup = styled.div`
  display: flex; 
  flex-direction: column; 
  flex-grow: 1;
  
  label { 
    margin-bottom: 8px; 
    font-weight: 600; 
    color: #444; 
  } 
  
  input, 
  textarea { 
    padding: 10px; 
    border: 1px solid #ccc; 
    border-radius: 6px; 
    font-size: 1em; 
    background-color: white; 
  }
  
  textarea { 
    min-height: 100px; 
    resize: vertical; 
  }
  
  p { 
    font-size: 0.9em; 
    margin-top: 5px; 
    color: #666; 
  }
  
  img {
    max-width: 150px; 
    height: auto;
    margin-top: 10px; 
    border-radius: 8px; 
    border: 1px solid #ddd;
  }
`;

export const LoadingText = styled.p`
  text-align: center; 
  color: #555; 
  font-style: italic; 
  margin-top: 20px;
`;

export const StatusDisplay = styled.div`
  margin-bottom: 10px; 
  font-size: 1.1em; 
  font-weight: bold;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  background-color: ${({ $isOpen }) => ($isOpen ? '#dcfce7' : '#fee2e2')};
  color: ${({ $isOpen }) => ($isOpen ? '#166534' : '#991b1b')};
`;

export const SettingsBlock = styled.div`
  padding: 20px; 
  background-color: #f9f9f9;
  border-radius: 8px; 
  border: 1px solid #eee;
`;

export const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;