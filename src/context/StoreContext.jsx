import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { STORAGE_KEYS } from '../utils/constants';
import { DEFAULT_PRODUCTS, DEFAULT_ORDERS } from '../utils/defaultProducts';

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Harmless cleanup: remove obsolete categories & fix Fresh Tomato
          return parsed
            .filter((p) => p.category !== 'Beverages' && p.category !== 'Household')
            .map((p) => {
              if (p.name === 'Fresh Tomatoes' || p.name === 'Fresh Tomato') {
                return { ...p, name: 'Tomato', category: 'Vegetables', image: 'Images/Tomato.jpg', emoji: '🍅' };
              }
              if (p.name === 'Mushroom' && (!p.image || p.image === '')) {
                return { ...p, image: 'Images/Mushroom.jpg' };
              }
              return p;
            });
        }
      }
    } catch (e) {
      console.warn('Error loading products from localStorage:', e);
    }
    return [...DEFAULT_PRODUCTS];
  });

  const [orders, setOrders] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error loading orders from localStorage:', e);
    }
    return [...DEFAULT_ORDERS];
  });

  // Sync products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.warn('Could not save products to localStorage:', e);
    }
  }, [products]);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.warn('Could not save orders to localStorage:', e);
    }
  }, [orders]);

  const addProduct = useCallback((productData) => {
    setProducts((prev) => {
      const newId = prev.length > 0 ? Math.max(...prev.map((p) => Number(p.id) || 0)) + 1 : 1;
      const newProduct = {
        id: newId,
        rating: 4.8,
        emoji: '🛒',
        ...productData,
      };
      return [...prev, newProduct];
    });
  }, []);

  const updateProduct = useCallback((id, updatedData) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === Number(id) ? { ...p, ...updatedData } : p))
    );
  }, []);

  const deleteProduct = useCallback((id) => {
    setProducts((prev) => prev.filter((p) => p.id !== Number(id)));
  }, []);

  const adjustStock = useCallback((id, delta) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === Number(id)) {
          return { ...p, stock: Math.max(0, (p.stock || 0) + delta) };
        }
        return p;
      })
    );
  }, []);

  const placeOrder = useCallback((orderData) => {
    // Generate unique order ID
    let newOrderId = '';
    do {
      newOrderId = 'KLF2026' + Math.floor(1000 + Math.random() * 9000);
    } while (orders.some((o) => o.id === newOrderId));

    const finalOrder = {
      ...orderData,
      id: newOrderId,
      status: 'Placed',
      createdAt: new Date().toISOString(),
    };

    // Deduct stock from products
    setProducts((prev) =>
      prev.map((prod) => {
        const orderItem = orderData.items.find((item) => item.id === prod.id);
        if (orderItem) {
          return { ...prod, stock: Math.max(0, prod.stock - orderItem.qty) };
        }
        return prod;
      })
    );

    // Prepend new order
    setOrders((prev) => [finalOrder, ...prev]);

    return finalOrder;
  }, [orders]);

  const updateOrderStatus = useCallback((orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  }, []);

  return (
    <StoreContext.Provider
      value={{
        products,
        orders,
        addProduct,
        updateProduct,
        deleteProduct,
        adjustStock,
        placeOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
