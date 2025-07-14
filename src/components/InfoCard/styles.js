import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  flex: 1;
  min-width: 260px;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary_light};

  svg {
    width: 28px;
    height: 28px;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h3`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray};
  font-weight: 500;
  margin: 0 0 0.25rem 0;
`;

export const Value = styled.p`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.dark_gray};
  margin: 0;
  line-height: 1.2;
`;

export const Description = styled.small`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray};
  margin-top: 0.25rem;
`;