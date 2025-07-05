// Arquivo: src/contexts/StoreContext.js

import { createContext, useContext } from 'react';

// Criamos o contexto que irá armazenar as informações da loja atual
export const StoreContext = createContext(null);

// Criamos um "gancho" (hook) para facilitar o uso do contexto nas páginas
export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    // Este erro ajuda a detetar se um componente está a tentar usar o contexto fora do provedor.
    throw new Error('useStore deve ser usado dentro de um StoreProvider');
  }
  return context;
};