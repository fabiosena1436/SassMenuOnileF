// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Importações atualizadas
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';

import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import AppRoutes from './routes';

/**
 * Documentação do App.js:
 * Este é o componente principal da sua aplicação.
 * A mudança chave aqui é envolver toda a aplicação com o <ThemeProvider>.
 *
 * O <ThemeProvider> recebe o nosso objeto `theme` como uma "prop" (propriedade)
 * e o disponibiliza para todos os componentes estilizados (styled-components)
 * que estão dentro dele.
 *
 * Também atualizamos os caminhos de importação do GlobalStyles para a nova pasta.
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CartProvider>
            <GlobalStyles />
            <Toaster position="top-right" />
            <AppRoutes />
          </CartProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;