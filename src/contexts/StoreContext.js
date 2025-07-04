// Arquivo: src/contexts/StoreContext.js

import { createContext, useContext } from 'react';

// Criamos o contexto que irá armazenar as informações da loja atual
export const StoreContext = createContext(null);

// Criamos um "gancho" (hook) para facilitar o uso do contexto nas páginas
export const useStore = () => {
  return useContext(StoreContext);
};