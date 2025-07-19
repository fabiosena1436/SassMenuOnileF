import styled from 'styled-components';

export const FormGroup = styled.div`
  margin: 1.5rem 0;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.dangerDark};
  font-size: 0.9rem;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
`;