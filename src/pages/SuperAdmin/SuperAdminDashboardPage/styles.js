// Ficheiro completo: src/pages/SuperAdmin/SuperAdminDashboardPage/styles.js

import styled from 'styled-components';

export const PageWrapper = styled.div`
  padding: 2rem;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
`;

export const TenantTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const Th = styled.th`
  background-color: #f2f2f2;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #ddd;
  font-size: 14px;
  text-transform: uppercase;
  color: #555;
`;

export const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  font-size: 15px;
  
  .status-active {
    color: green;
    font-weight: bold;
  }
  
  .status-cancelled {
    color: red;
  }
`;

export const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
  &:hover {
    background-color: #f1f1f1;
  }
`;