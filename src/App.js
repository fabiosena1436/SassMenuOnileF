// Arquivo: src/App.js

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import AppRoutes from './routes';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      {/* O StoreSettingsProvider foi removido daqui */}
      <AuthProvider>
        <CartProvider>
          <GlobalStyles />
          <Toaster position="top-right" />
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;