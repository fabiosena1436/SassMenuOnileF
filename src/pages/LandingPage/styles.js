// src/pages/LandingPage/styles.js
import styled from 'styled-components';

export const LandingWrapper = styled.div`
  color: ${({ theme }) => theme.colors.textDark};
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Header = styled.header`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.landingGradientStart}, ${({ theme }) => theme.colors.landingGradientEnd});
  color: ${({ theme }) => theme.colors.textInverted};
  padding: 6rem 2rem;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 3rem;
  max-width: 800px;
  margin: 0 auto 1rem auto;
  font-weight: 700;
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.9;
`;

export const ButtonGroup = styled.div`
  margin-top: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const Section = styled.section`
  padding: 5rem 2rem;
`;

export const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textDarkest};
  margin-bottom: 3rem;
`;

export const Showcase = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
`;

export const Mockup = styled.img`
  max-width: 45%;
  height: auto;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

export const Features = styled.section`
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 4rem 2rem;
  flex-wrap: wrap;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const FeatureCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  text-align: center;
  max-width: 350px;
  
  svg {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
`;

export const PricingPlan = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
`;

export const PlanCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: 2.5rem 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme, $isFeatured }) => ($isFeatured ? '0 20px 25px -5px rgba(0,0,0,0.15)' : theme.shadows.md)};
  width: 100%;
  max-width: 350px;
  text-align: center;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  transform: ${({ $isFeatured }) => ($isFeatured ? 'scale(1.05)' : 'scale(1)')};
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

export const PlanTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const PlanPrice = styled.p`
  font-size: 3rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0.5rem 0;

  span {
    font-size: 1rem;
    font-weight: normal;
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

export const PlanFeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  text-align: left;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  li {
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${({ theme }) => theme.colors.textMedium};
  }
`;

export const CallToAction = styled.section`
  background: ${({ theme }) => theme.colors.background};
  padding: 5rem 2rem;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }
`;