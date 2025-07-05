// Arquivo: src/pages/LandingPage/styles.js

import styled from 'styled-components';

export const LandingWrapper = styled.div`
  color: #333;
`;

export const Header = styled.header`
  background: linear-gradient(135deg, #6d28d9, #4c1d95);
  color: white;
  padding: 6rem 2rem;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
  max-width: 800px;
  margin: 0 auto 1rem auto;
`;

export const Subtitle = styled.p`
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.9;
`;

export const Features = styled.section`
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 4rem 2rem;
  flex-wrap: wrap;
`;

export const FeatureCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  text-align: center;
  max-width: 350px;
  
  svg {
    color: #6d28d9;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
`;

export const CallToAction = styled.section`
  background: #f3f4f6;
  padding: 4rem 2rem;
  text-align: center;

  h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
`;