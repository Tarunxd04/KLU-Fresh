import React, { createContext, useContext, useState, useRef, useCallback } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toastMessage, setToastMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef(null);

  const showToast = useCallback((message) => {
    setToastMessage(message);
    setIsVisible(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 2500);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div id="toast" className={`toast ${isVisible ? 'show' : ''}`}>
        {toastMessage}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
