import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { STORAGE_KEYS, COUPONS } from '../utils/constants';
import { useStore } from './StoreContext';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { products } = useStore();
  const { showToast } = useToast();

  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CART);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Error loading cart from localStorage:', e);
    }
    return [];
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Error loading wishlist from localStorage:', e);
    }
    return [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState(0);

  // Filter out any cart or wishlist items that reference deleted products
  useEffect(() => {
    setCart((prev) => prev.filter((item) => products.some((p) => p.id === item.id)));
    setWishlist((prev) => prev.filter((id) => products.some((p) => p.id === id)));
  }, [products]);

  // Save cart
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not save cart to localStorage:', e);
    }
  }, [cart]);

  // Save wishlist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Could not save wishlist to localStorage:', e);
    }
  }, [wishlist]);

  const addToCart = useCallback((id) => {
    const product = products.find((p) => p.id === Number(id));
    if (!product) return;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      const currentQty = existing ? existing.qty : 0;

      if (currentQty >= product.stock) {
        showToast('⚠️ Maximum available stock reached');
        return prev;
      }

      showToast('✓ Added to cart');
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { id: product.id, qty: 1 }];
    });
  }, [products, showToast]);

  const changeQty = useCallback((id, delta) => {
    const product = products.find((p) => p.id === Number(id));
    if (!product) return;

    setCart((prev) => {
      const item = prev.find((i) => i.id === product.id);
      if (!item) return prev;

      const newQty = item.qty + delta;
      if (newQty <= 0) {
        return prev.filter((i) => i.id !== product.id);
      }
      if (newQty > product.stock) {
        showToast('⚠️ Reached maximum available stock');
        return prev.map((i) => (i.id === product.id ? { ...i, qty: product.stock } : i));
      }

      return prev.map((i) => (i.id === product.id ? { ...i, qty: newQty } : i));
    });
  }, [products, showToast]);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((item) => item.id !== Number(id)));
    showToast('Item removed from cart');
  }, [showToast]);

  const toggleWishlist = useCallback((id) => {
    const numId = Number(id);
    setWishlist((prev) => {
      const exists = prev.includes(numId);
      if (exists) {
        showToast('Removed from wishlist');
        return prev.filter((item) => item !== numId);
      } else {
        showToast('❤️ Added to wishlist');
        return [...prev, numId];
      }
    });
  }, [showToast]);

  const applyCoupon = useCallback((code) => {
    const trimmed = (code || '').trim().toUpperCase();
    if (COUPONS[trimmed]) {
      setAppliedCoupon(COUPONS[trimmed]);
      showToast('✓ Coupon applied successfully');
      return { success: true, message: 'Coupon KLU10 applied: 10% OFF! 🎉' };
    } else {
      setAppliedCoupon(0);
      return { success: false, message: 'Invalid coupon code. Try KLU10' };
    }
  }, [showToast]);

  const clearCart = useCallback(() => {
    setCart([]);
    setAppliedCoupon(0);
  }, []);

  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => {
      const p = products.find((prod) => prod.id === item.id);
      return sum + (p ? p.price * item.qty : 0);
    }, 0);
    const discount = subtotal * appliedCoupon;
    const delivery = 0; // FREE
    const total = subtotal - discount + delivery;
    const count = cart.reduce((sum, item) => sum + item.qty, 0);

    return {
      subtotal,
      discount,
      delivery,
      total,
      count,
    };
  }, [cart, products, appliedCoupon]);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        appliedCoupon,
        addToCart,
        changeQty,
        removeFromCart,
        toggleWishlist,
        applyCoupon,
        clearCart,
        totals,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
