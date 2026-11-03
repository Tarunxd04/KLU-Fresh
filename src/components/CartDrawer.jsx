import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';
import { formatPrice, imageSrc } from '../utils/formatters';

export function CartDrawer({ isOpen, onClose, onCheckout }) {
  const { cart, changeQty, removeFromCart, totals, applyCoupon, appliedCoupon } = useCart();
  const { products } = useStore();
  const [couponCode, setCouponCode] = useState('');
  const [couponStatus, setCouponStatus] = useState(null); // { success: boolean, message: string }

  const handleApplyCoupon = () => {
    const res = applyCoupon(couponCode);
    setCouponStatus(res);
  };

  return (
    <>
      <div
        className={`overlay ${isOpen ? 'active' : ''}`}
        id="cartOverlay"
        onClick={onClose}
      />
      <aside className={`cart-sidebar ${isOpen ? 'open' : ''}`} id="cartSidebar" data-lenis-prevent>
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button className="close-btn" id="closeCart" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="cart-items" id="cartItems">
          {cart.length === 0 ? (
            <p className="empty-cart">
              Your cart is empty 🛒
              <br />
              Add fresh groceries to start shopping!
            </p>
          ) : (
            cart.map((item) => {
              const p = products.find((prod) => prod.id === item.id);
              if (!p) return null;
              return (
                <div key={p.id} className="cart-item">
                  <div className="cart-item-emoji">
                    {p.image ? (
                      <img src={imageSrc(p.image)} className="cart-thumb-img" alt={p.name} />
                    ) : (
                      p.emoji || '🛒'
                    )}
                  </div>
                  <div className="cart-item-info">
                    <div className="cart-item-name">{p.name}</div>
                    <div className="cart-item-price">{formatPrice(p.price * item.qty)}</div>
                    <div className="cart-item-qty">
                      <button
                        className="qty-btn"
                        data-id={p.id}
                        data-delta="-1"
                        onClick={() => changeQty(p.id, -1)}
                      >
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button
                        className="qty-btn"
                        data-id={p.id}
                        data-delta="1"
                        onClick={() => changeQty(p.id, 1)}
                      >
                        +
                      </button>
                      <button
                        className="cart-item-remove"
                        data-id={p.id}
                        onClick={() => removeFromCart(p.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="cart-footer" id="cartFooter">
          <div className="coupon-row">
            <input
              type="text"
              id="couponInput"
              placeholder="Enter coupon code (try KLU10)"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button className="btn btn-small" id="applyCouponBtn" onClick={handleApplyCoupon}>
              Apply
            </button>
          </div>
          <p
            className="coupon-msg"
            id="couponMsg"
            style={{ color: couponStatus?.success ? 'var(--mid-green)' : 'var(--danger)' }}
          >
            {couponStatus?.message || ''}
          </p>

          <div className="summary-row">
            <span>Subtotal</span>
            <span id="sumSubtotal">{formatPrice(totals.subtotal)}</span>
          </div>
          <div className="summary-row">
            <span>Discount</span>
            <span id="sumDiscount">-{formatPrice(totals.discount)}</span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span id="sumDelivery">
              {totals.delivery === 0 ? 'FREE' : formatPrice(totals.delivery)}
            </span>
          </div>
          <div className="summary-row total-row">
            <span>Total</span>
            <span id="sumTotal">{formatPrice(totals.total)}</span>
          </div>

          <button
            className="btn btn-primary full-width"
            id="checkoutBtn"
            onClick={onCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </aside>
    </>
  );
}
