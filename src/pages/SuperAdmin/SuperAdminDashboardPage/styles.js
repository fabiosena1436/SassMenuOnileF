// Arquivo: src/pages/SuperAdmin/SuperAdminDashboardPage/styles.js

import styled from 'styled-components';

export const PageWrapper = styled.div`
  padding: 2rem;
  background-color: #f4f7f6;
  min-height: 100vh;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
`;

export const SearchInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  width: 300px;
  font-size: 1rem;
`;

export const LoadingText = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #7f8c8d;
`;

export const InfoText = styled.p`
  text-align: center;
  padding: 2rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  border-radius: 10px;
  overflow: hidden;
`;

export const Th = styled.th`
  background-color: #34495e;
  color: white;
  padding: 1rem;
  text-align: left;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 1px;
`;

export const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
  color: #34495e;
`;

export const Tr = styled.tr`
  &:last-child ${Td} {
    border-bottom: none;
  }
  &:hover {
    background-color: #f8f9fa;
  }
`;

export const SelectRole = styled.select`
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #bdc3c7;
  background-color: white;
  cursor: pointer;
  
  &:disabled {
    background-color: #ecf0f1;
    cursor: not-allowed;
  }
`;

export const Tag = styled.span`
  background-color: #1abc9c;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  margin-left: 8px;
  text-transform: capitalize;
`;

export const TenantLink = styled.a`
  color: #2980b9;
  text-decoration: none;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`;