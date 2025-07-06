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
  color: ${({ theme }) => theme.colors.textDarkest};
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

export const SubscriptionStatus = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryLightest};
  color: ${({ theme }) => theme.colors.primary};
  padding: 1rem 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.primaryLighter};
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
  align-items: flex-start; /* Alinha os cards pelo topo */
  gap: 2rem;
  flex-wrap: wrap;
`;

export const PlanCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme, $isFeatured }) => $isFeatured ? theme.shadows.lg : theme.shadows.md};
  padding: 2.5rem;
  width: 100%;
  max-width: 380px;
  text-align: center;
  border: 1px solid ${({ theme, $isFeatured }) => $isFeatured ? theme.colors.primary : theme.colors.borderLight};
  display: flex;
  flex-direction: column;
  position: relative;
  transform: ${({ $isFeatured }) => $isFeatured ? 'scale(1.03)' : 'scale(1)'};
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: scale(1.03);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

export const FeaturedBadge = styled.div`
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.9rem;
  font-weight: bold;
`;

export const PlanTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textDarkest};
  margin-bottom: 0.5rem;
`;

export const PlanDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  min-height: 40px; /* Garante alinhamento mesmo se um não tiver descrição */
  margin-bottom: 1.5rem;
`;

export const PlanPrice = styled.p`
  font-size: 3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textDarkest};
  margin: 0.5rem 0;

  span {
    font-size: 1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textLight};
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
  color: ${({ theme }) => theme.colors.textMedium};
  
  svg {
    color: ${({ theme }) => theme.colors.success};
    flex-shrink: 0; /* Impede que o ícone seja esmagado */
  }
`;

export const LoadingText = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textLight};
  padding: 3rem;
`;