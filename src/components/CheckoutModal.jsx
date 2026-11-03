import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/formatters';

export function CheckoutModal({ isOpen, onClose, onSuccess }) {
  const { user } = useAuth();
  const { cart, totals, clearCart } = useCart();
  const { products, placeOrder } = useStore();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Vijayawada',
    pincode: '522502',
    slot: null,
    payment: 'Cash on Delivery',
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || '',
      }));
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleSlotSelect = (slot) => {
    setFormData((prev) => ({ ...prev, slot }));
  };

  const handlePlaceOrder = () => {
    const name = formData.name.trim();
    const address = formData.address.trim();

    if (!name || !address) {
      showToast('Please enter your name and delivery address');
      return;
    }

    if (!formData.slot) {
      showToast('Please choose a delivery time slot');
      return;
    }

    const orderedItems = cart.map((item) => {
      const p = products.find((prod) => prod.id === item.id);
      return {
        id: item.id,
        name: p ? p.name : 'Grocery Item',
        qty: item.qty,
        price: p ? p.price : 0,
        emoji: p ? p.emoji || '🛒' : '🛒',
        image: p ? p.image : undefined,
      };
    });

    const newOrder = placeOrder({
      userId: user ? user.id : 'guest_' + Date.now().toString(36),
      customerName: name,
      customerEmail: user ? user.email : (formData.phone ? `${formData.phone}@phone.user` : 'guest@klufresh.in'),
      phone: formData.phone.trim(),
      address,
      city: formData.city.trim() || 'Vijayawada',
      pincode: formData.pincode.trim() || '522502',
      slot: formData.slot,
      paymentMethod: formData.payment,
      items: orderedItems,
      subtotal: totals.subtotal,
      discount: totals.discount,
      total: totals.total,
    });

    clearCart();
    showToast('🎉 Order placed successfully!');
    onSuccess(newOrder);
  };

  return (
    <>
      <div className="overlay active" id="checkoutOverlay" onClick={onClose} />
      <div className="modal open" id="checkoutModal" data-lenis-prevent>
        <div className="modal-header">
          <h3>Checkout</h3>
          <button className="close-btn" id="closeCheckout" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <h4 className="modal-subhead">Delivery Address</h4>
          <div className="form-grid">
            <input
              type="text"
              id="custName"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="text"
              id="custPhone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <input
              type="text"
              id="custAddress"
              placeholder="Address"
              className="span-2"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
            <input
              type="text"
              id="custCity"
              placeholder="City"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
            <input
              type="text"
              id="custPincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
            />
          </div>

          <h4 className="modal-subhead">Choose Delivery Slot</h4>
          <div className="slot-grid" id="slotGrid">
            {['10 AM – 12 PM', '12 PM – 2 PM', '4 PM – 6 PM', '6 PM – 8 PM'].map((slot) => (
              <button
                key={slot}
                type="button"
                className={`slot-btn ${formData.slot === slot ? 'selected' : ''}`}
                data-slot={slot}
                onClick={() => handleSlotSelect(slot)}
              >
                {slot}
              </button>
            ))}
          </div>

          <h4 className="modal-subhead">Payment Method</h4>
          <div className="payment-grid" id="paymentGrid">
            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="Cash on Delivery"
                checked={formData.payment === 'Cash on Delivery'}
                onChange={(e) => setFormData({ ...formData, payment: e.target.value })}
              />{' '}
              Cash on Delivery
            </label>
            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="UPI"
                checked={formData.payment === 'UPI'}
                onChange={(e) => setFormData({ ...formData, payment: e.target.value })}
              />{' '}
              UPI (GooglePay / PhonePe / Paytm)
            </label>
            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="Card"
                checked={formData.payment === 'Card'}
                onChange={(e) => setFormData({ ...formData, payment: e.target.value })}
              />{' '}
              Credit / Debit Card
            </label>
          </div>

          <div className="checkout-total" id="checkoutTotal">
            <span>Amount Payable</span>
            <span>{formatPrice(totals.total)}</span>
          </div>

          <button
            className="btn btn-primary full-width"
            id="placeOrderBtn"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}
