import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { StoreProvider } from './context/StoreContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { App } from './App';
import 'lenis/dist/lenis.css';
import './styles/style.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <StoreProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </StoreProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
);
