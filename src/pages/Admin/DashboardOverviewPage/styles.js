// src/pages/Admin/DashboardOverviewPage/styles.js
import styled from 'styled-components';

export const PageWrapper = styled.div`
  h1 {
    font-size: 2em;
    color: ${({ theme }) => theme.colors.textDark};
    margin-bottom: 30px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.5em; 
  color: ${({ theme }) => theme.colors.textMedium}; 
  margin-top: 0; 
  margin-bottom: 20px; 
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderMedium}; 
  padding-bottom: 10px; 
  
  &:not(:first-child) { 
    margin-top: 40px; 
  }
`;

export const LoadingText = styled.p`
  text-align: center; 
  color: ${({ theme }) => theme.colors.textMedium}; 
  font-style: italic; 
  margin-top: 20px;
`;

export const ReportsSection = styled.div`
  background-color: ${({ theme }) => theme.colors.white}; 
  padding: 20px; 
  border-radius: ${({ theme }) => theme.borderRadius.lg}; 
  margin-bottom: 40px; 
  box-shadow: ${({ theme }) => theme.shadows.sm};
  display: grid; 
  grid-template-columns: 1fr 1fr; 
  gap: 20px 40px; 

  h3 { 
    margin-top: 0; 
    color: ${({ theme }) => theme.colors.textMedium}; 
    font-size: 1.2em; 
    margin-bottom: 15px; 
    grid-column: 1 / -1; 
  }

  div { 
    padding-top: 15px; 
    border-top: 1px solid ${({ theme }) => theme.colors.borderLight}; 
  } 

  p { 
    font-size: 1.1em; 
    color: ${({ theme }) => theme.colors.textDark}; 
    margin: 10px 0; 
    strong { color: ${({ theme }) => theme.colors.primary}; } 
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 25px;
  }
`;

export const MobileCardList = styled.div`
  display: none;
  padding: 15px;
  background-color: ${({ theme }) => theme.colors.background};

  @media (max-width: 768px) {
    display: block;
  }
`;

export const DesktopDataGrid = styled.div`
  display: block;
  .MuiDataGrid-root {
    border: none;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

export const OrderCard = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  padding-bottom: 10px;
`;

export const CustomerInfo = styled.div`
  h4 {
    margin: 0;
    font-size: 1.15em;
    color: ${({ theme }) => theme.colors.textDark};
  }
  span {
    font-size: 0.85em;
    color: ${({ theme }) => theme.colors.textSubtle};
  }
`;

export const OrderTotal = styled.div`
  font-size: 1.2em;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

export const CardActionsContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  .print-button {
    background: ${({ theme }) => theme.colors.primaryLighter};
    color: ${({ theme }) => theme.colors.primary};
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    padding: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      background: ${({ theme }) => theme.colors.primaryLight};
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;

export const StatusSelector = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  font-size: 1em;
  flex-grow: 1;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;