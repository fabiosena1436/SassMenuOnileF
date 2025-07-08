// Ficheiro: src/pages/Admin/SubscriptionPage/styles.js

import styled from 'styled-components';

export const PageWrapper = styled.div`
  padding: 2rem;
  max-width: 1100px;
  margin: 0 auto;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #718096;
`;

export const SubscriptionStatus = styled.div`
  background-color: #ebf8ff;
  color: #3182ce;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  border: 1px solid #90cdf4;
  text-align: center;
  margin: 0 auto 3rem auto;
  font-weight: 500;
  max-width: 800px;

  strong {
    font-weight: 700;
  }
`;

export const PlansContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch; /* Garante que os cards tenham a mesma altura */
  gap: 2rem;
  flex-wrap: wrap;
`;

export const PlanCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 2.5rem;
  width: 100%;
  max-width: 380px;
  text-align: center;
  border: 2px solid ${({ $isFeatured }) => $isFeatured ? '#4299e1' : 'transparent'};
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

export const FeaturedBadge = styled.div`
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background: #4299e1;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.9rem;
  font-weight: bold;
`;

export const PlanTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
`;

export const PlanDescription = styled.p`
  color: #718096;
  min-height: 40px;
  margin-bottom: 1.5rem;
`;

export const PlanPrice = styled.p`
  font-size: 3rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0.5rem 0;

  span {
    font-size: 1rem;
    font-weight: 500;
    color: #718096;
    margin-left: 0.25rem;
  }
`;

export const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  text-align: left;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #4a5568;
  
  svg {
    color: #48bb78;
    flex-shrink: 0;
  }
`;

export const LoadingText = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #718096;
  padding: 3rem;
`;