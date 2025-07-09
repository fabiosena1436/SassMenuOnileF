// Arquivo: src/components/Button/index.js

import React from 'react';
import { ButtonWrapper } from './styles';

/**
 * Componente de botão reutilizável com variantes de estilo.
 * @param {object} props As propriedades do componente.
 * @param {React.ReactNode} props.children O conteúdo a ser exibido no botão.
 * @param {function} [props.onClick] A função a ser chamada no clique.
 * @param {('primary' | 'secondary' | 'danger')} [props.variant='primary'] A variante visual do botão.
 * @param {boolean} [props.disabled=false] Controla se o botão está desabilitado.
 * @param {string} [props.type='button'] O atributo 'type' do botão (ex: 'button', 'submit').
 * @param {object} [props.style] Estilos inline customizados.
 * @param {string} [props.$variant] Prop transitória para o styled-components.
 */
const Button = ({ children, onClick, variant = 'primary', disabled = false, type = 'button', style }) => {
  return (
    <ButtonWrapper
      onClick={onClick}
      $variant={variant} // Usa a prop transitória
      disabled={disabled}
      type={type}
      style={style}
    >
      {children}
    </ButtonWrapper>
  );
};

export default Button;