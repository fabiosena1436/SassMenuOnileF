// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// --- INÍCIO DO CÓDIGO PARA IGNORAR O ERRO ---
// Este erro ("ResizeObserver loop completed with undelivered notifications") é comum
// em aplicações React e geralmente não afeta o funcionamento.
// Este código o oculta para manter a consola limpa.
const originalError = console.error;
console.error = (...args) => {
  if (
    args[0] &&
    typeof args[0] === 'string' &&
    args[0].includes('ResizeObserver loop completed with undelivered notifications')
  ) {
    return;
  }
  originalError(...args);
};
// --- FIM DO CÓDIGO PARA IGNORAR O ERRO ---

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();