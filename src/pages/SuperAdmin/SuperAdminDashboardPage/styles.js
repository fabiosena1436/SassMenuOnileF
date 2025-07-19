import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const PageWrapper = styled.div`
  padding: 2rem 3rem;
  background-color: #f8f9fa;
  min-height: 100vh;
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
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
  font-size: 2.2rem;
  color: #343a40;
  font-weight: 700;
`;

export const SearchInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  width: 100%;
  max-width: 350px;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}33;
  }
`;

export const StatsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

export const StatCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #e9ecef;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }
`;

export const StatIcon = styled.div`
  background-color: ${props => props.color || '#3498db'}1A;
  color: ${props => props.color || '#3498db'};
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  flex-shrink: 0;
`;

export const StatInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StatLabel = styled.span`
  font-size: 0.9rem;
  color: #6c757d;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  font-weight: 600;
`;

export const StatValue = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
  color: #212529;
  margin: 0;
`;

export const LoadingText = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #7f8c8d;
  padding-top: 5rem;
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

  /* --- CORREÇÃO AQUI --- */
  /* A regra para esconder o thead agora está dentro do Table */
  @media (max-width: 768px) {
    thead {
      display: none;
    }
  }
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

  /* --- CORREÇÃO AQUI --- */
  /* A regra para a célula agora tem a sua própria media query */
  @media (max-width: 768px) {
    display: block;
    text-align: right;
    padding-left: 50%;
    position: relative;

    &::before {
      content: attr(data-label);
      position: absolute;
      left: 1rem;
      width: calc(50% - 2rem);
      text-align: left;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 0.8rem;
      color: #6c757d;
    }
  }
`;

export const Tr = styled.tr`
  &:last-child ${Td} {
    border-bottom: none;
  }
  &:hover {
    background-color: #f8f9fa;
  }

  /* --- CORREÇÃO AQUI --- */
  /* A regra para a linha agora tem a sua própria media query */
  @media (max-width: 768px) {
    display: block;
    margin-bottom: 1rem;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);

    &:hover {
      background-color: white;
    }

    /* Remove a borda da última célula do "cartão" */
    ${Td}:last-child {
      border-bottom: none;
    }
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

  /* --- CORREÇÃO AQUI --- */
  @media (max-width: 768px) {
    width: 100%;
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

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.2rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  svg {
    font-size: 1.1rem;
  }

  &:hover {
    background-color: #c0392b;
  }
`;