// Arquivo: src/pages/Admin/SubscriptionPage/styles.js

import styled, { css } from 'styled-components';

export const PageWrapper = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Poppins', sans-serif;
`;

export const Header = styled.header`
  margin-bottom: 2rem;
  text-align: center;
`;

export const SectionTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #718096;
`;

export const LoadingText = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #718096;
  padding: 3rem;
`;

export const SubscriptionStatus = styled.div`
  text-align: center;
  background-color: #e6fffa;
  color: #2c7a7b;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 3rem;
  font-size: 1.1rem;

  strong {
    font-weight: 600;
  }
`;

export const PlansContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  justify-content: center;
`;

export const PlanCard = styled.div`
  background-color: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  ${({ $isFeatured }) =>
    $isFeatured &&
    css`
      border-color: #4299e1;
      border-width: 2px;
      transform: scale(1.02);
    `}
`;

export const FeaturedBadge = styled.div`
  position: absolute;
  top: 1.5rem;
  right: -50px;
  background-color: #4299e1;
  color: white;
  padding: 0.5rem 3rem;
  font-size: 0.875rem;
  font-weight: 600;
  transform: rotate(45deg);
  transform-origin: top left;
  width: 170px;
  text-align: center;
`;

export const PlanTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
`;

export const PlanDescription = styled.p`
  color: #718096;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  flex-grow: 1; /* Makes description take available space */
`;

export const PlanPrice = styled.div`
  font-size: 2.25rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 1.5rem;

  span {
    font-size: 1rem;
    font-weight: 400;
    color: #718096;
    margin-left: 0.5rem;
  }
`;

export const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #4a5568;

  svg {
    color: #48bb78; /* Green checkmark */
    min-width: 20px;
  }
`;