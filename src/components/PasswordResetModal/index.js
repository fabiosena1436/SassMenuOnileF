import React, { useState } from 'react';
import Modal from '../Modal'; // Usando o seu modal genérico como base
import Button from '../Button';
import { Input, FormGroup, ErrorMessage } from './styles';

const PasswordResetModal = ({ isOpen, onClose, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Por favor, insira um endereço de e-mail.');
      return;
    }
    setError('');
    onSubmit(email); // Envia o e-mail para a função que veio do pai
  };

  const handleClose = () => {
    // Limpa o estado ao fechar
    setEmail('');
    setError('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Recuperar Senha"
      footer={
        <>
          <Button $variant="secondary" onClick={handleClose}>Cancelar</Button>
          <Button $variant="primary" onClick={handleSubmit}>Enviar Link</Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <p>Insira o seu e-mail abaixo para receber um link de recuperação de senha.</p>
        <FormGroup>
          <Input
            type="email"
            placeholder="seu-email@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus // Foca no campo de input assim que o modal abre
          />
        </FormGroup>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </form>
    </Modal>
  );
};

export default PasswordResetModal;