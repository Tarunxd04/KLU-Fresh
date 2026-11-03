import React from 'react';

export function OrderSuccessModal({ order, isOpen, onClose, onViewOrders }) {
  if (!isOpen || !order) return null;

  return (
    <>
      <div className="overlay active" id="successOverlay" onClick={onClose} />
      <div className="modal success-modal open" id="successModal" data-lenis-prevent>
        <div className="success-emoji">🎉</div>
        <h2>Order Placed Successfully!</h2>
        <p className="success-line">
          <strong>Order ID:</strong> <span id="orderId">{order.id}</span>
        </p>
        <p className="success-line">
          <strong>Estimated Delivery:</strong> Today
        </p>
        <p className="success-line">
          <strong>Delivery Slot:</strong> <span id="orderSlot">{order.slot}</span>
        </p>
        <div className="success-actions">
          <button className="btn btn-outline" id="viewMyOrdersSuccessBtn" onClick={onViewOrders}>
            📦 View &amp; Track Order
          </button>
          <button className="btn btn-primary" id="continueShoppingBtn" onClick={onClose}>
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
}
