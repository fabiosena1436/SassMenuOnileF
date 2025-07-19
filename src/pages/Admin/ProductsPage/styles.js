// src/pages/Admin/ProductsPage/styles.js
import styled from 'styled-components';

export const PageWrapper = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 1rem;
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
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.textDarkest};

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const FormContainer = styled.form`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  margin-bottom: 2.5rem;

  h3 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
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
    color: ${({ theme }) => theme.colors.textMedium};
  }

  &.full-width {
    grid-column: 1 / -1;
  }
`;

export const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
`;

export const Textarea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  min-height: 80px;
  resize: vertical;
`;

export const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const FormActions = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;

  /* --- MUDANÇA PARA RESPONSIVIDADE --- */
  @media (max-width: 768px) {
    flex-direction: column-reverse; /* Empilha os botões */
    
    button {
      width: 100%;
    }
  }
`;

export const ProductListSection = styled.section`
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.colors.textDarkest};
  }
`;

export const ProductListItem = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr auto;
  gap: 1.5rem;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  margin-bottom: 1rem;
  border-left: 5px solid ${({ $isAvailable, theme }) => $isAvailable ? theme.colors.successDark : theme.colors.neutral};
  
  @media (max-width: 992px) {
    grid-template-columns: 80px 1fr;
    gap: 1rem;
  }
`;

export const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.md};
    
  @media (max-width: 992px) {
    width: 80px;
    height: 80px;
    grid-row: 1 / 3;
  }
`;

export const ProductInfo = styled.div`
  @media (max-width: 992px) {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }

  h4 {
    margin: 0 0 0.25rem 0;
    font-size: 1.2rem;
  }
  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textLight};
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
  flex-wrap: wrap; /* Permite quebrar linha */

  @media (max-width: 992px) {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }
`;

export const Price = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.successDarker};
`;

export const Tag = styled.span`
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  color: ${({ theme }) => theme.colors.textMedium};
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.8rem;
`;

export const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 992px) {
    grid-column: 1 / -1;
    grid-row: 3 / 4;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: 1rem;
  }

  button {
    min-width: 150px;
    @media (max-width: 768px) {
      min-width: auto;
      flex-grow: 1;
    }
  }
`;

export const LoadingText = styled.p`
  text-align: center;
  padding: 2rem;
  font-style: italic;
  color: ${({ theme }) => theme.colors.textLight};
`;

export const InfoText = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.infoBg};
  border: 1px solid ${({ theme }) => theme.colors.infoBorder};
  color: ${({ theme }) => theme.colors.infoText};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin: 1rem 0;

  a {
    color: ${({ theme }) => theme.colors.primaryDark};
    font-weight: bold;
  }
`;

export const UploadGroup = styled(FormGroup)`
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 768px) {
    grid-column: span 1; /* Ocupa apenas 1 coluna no mobile */
  }

  span {
    text-align: center;
    color: ${({ theme }) => theme.colors.textSubtle};
    margin: 0.5rem 0;
  }
`;

export const UploadLabel = styled.label`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textMedium};
  margin-bottom: 5px;
`;

export const FileInput = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
`;

export const ProgressBar = styled.div`
  height: 5px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
  margin-top: 5px;
  transition: width 0.3s ease-in-out;
`;

export const ImageInputMethodToggle = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  position: relative;

  @media (max-width: 768px) {
    gap: 8px;
  }

  /* Esconde os radio buttons mas mantém funcionais */
  input[type="radio"] {
    position: absolute;
    opacity: 0;
    width: 1px;
    height: 1px;
  }

  label {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 12px 16px;
    border: 2px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    background-color: ${({ theme }) => theme.colors.white};
    font-size: 0.95rem;
    font-weight: 500;
    min-height: 44px; /* Tamanho mínimo para touch */

    @media (max-width: 768px) {
      padding: 10px 8px;
      font-size: 0.85rem;
    }

    @media (max-width: 480px) {
      padding: 8px 6px;
      font-size: 0.8rem;
    }
  }

  /* Estilo para quando está selecionado */
  input[type="radio"]:checked + label {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    border-color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
  }

  /* Hover effect para desktop */
  @media (hover: hover) {
    label:hover {
      border-color: ${({ theme }) => theme.colors.primary};
      background-color: ${({ theme }) => theme.colors.backgroundLight};
    }

    input[type="radio"]:checked + label:hover {
      background-color: ${({ theme }) => theme.colors.primaryDark};
      border-color: ${({ theme }) => theme.colors.primaryDark};
    }
  }
`;