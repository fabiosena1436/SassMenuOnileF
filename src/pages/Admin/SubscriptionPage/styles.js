// src/pages/Admin/SubscriptionPage/styles.js
import styled from 'styled-components';

export const PageWrapper = styled.div`
  padding: 2rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.textDark};
  margin-bottom: 2rem;
`;

export const PlansContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
`;

export const PlanCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 300px;
  text-align: center;
  border-top: 5px solid ${({ highlight, theme }) => (highlight ? theme.colors.highlight : theme.colors.border)};
  display: flex;
  flex-direction: column;
`;

export const PlanTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const PlanPrice = styled.p`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textDark};
  margin: 0.5rem 0;

  span {
    font-size: 1rem;
    font-weight: normal;
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

export const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
  text-align: left;
  flex-grow: 1;

  li {
    margin-bottom: 0.8rem;
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

export const LoadingText = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textLight};
  padding: 3rem;
`;