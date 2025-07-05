import styled from 'styled-components';

export const PageWrapper = styled.div`
  padding: 2rem;
  background-color: #f4f7f6;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #1a202c;
`;

export const FormContainer = styled.form`
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 2.5rem;

  h3 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #4a5568;
  }

  &.full-width {
    grid-column: 1 / -1;
  }
`;

export const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  font-size: 1rem;
`;

export const Textarea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  font-size: 1rem;
  min-height: 80px;
  resize: vertical;
`;

export const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  font-size: 1rem;
  background-color: white;
`;

export const FormActions = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

export const ProductListSection = styled.section``;

export const ProductListItem = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr auto;
  gap: 1.5rem;
  align-items: center;
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.07);
  margin-bottom: 1rem;
  border-left: 5px solid ${({ $isAvailable }) => $isAvailable ? '#22c55e' : '#a1a1aa'};
`;

export const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
`;

export const ProductInfo = styled.div`
  h4 {
    margin: 0 0 0.25rem 0;
    font-size: 1.2rem;
  }
  p {
    margin: 0;
    color: #6b7280;
    font-size: 0.9rem;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

export const ProductDetails = styled.div`
  margin-top: 0.5rem;
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  align-items: center;
`;

export const Price = styled.span`
  font-weight: 700;
  color: #166534;
`;

export const Tag = styled.span`
  background-color: #f3f4f6;
  color: #4b5563;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.8rem;
`;

export const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const LoadingText = styled.p`
  text-align: center;
  padding: 2rem;
  font-style: italic;
  color: #6b7280;
`;

export const InfoText = styled.p`
  text-align: center;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
`;