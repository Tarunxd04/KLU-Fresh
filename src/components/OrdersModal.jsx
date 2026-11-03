import React from 'react';
import { TRACKING_STEPS } from '../utils/constants';
import { formatPrice } from '../utils/formatters';

export function OrdersModal({ isOpen, onClose, orders }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="overlay active" id="ordersOverlay" onClick={onClose} />
      <div className="modal orders-modal open" id="ordersModal" data-lenis-prevent>
        <div className="modal-header">
          <div>
            <h3>📦 My Orders &amp; Live Tracking</h3>
            <p className="modal-subtitle">Track your delivery progress in real-time</p>
          </div>
          <button className="close-btn" id="closeOrders" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div id="ordersListContainer">
            {orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>📦</div>
                <h3>No orders found yet</h3>
                <p style={{ color: 'var(--gray-text)', marginTop: '6px' }}>
                  Place an order from our fresh catalog to track it here!
                </p>
              </div>
            ) : (
              orders.map((order) => {
                const currentStepIdx = TRACKING_STEPS.indexOf(order.status);
                const isCancelled = order.status === 'Cancelled';
                const dateFormatted = new Date(order.createdAt).toLocaleDateString('en-IN', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                });
                const statusCls = `status-${order.status.toLowerCase().replace(/\s+/g, '-')}`;

                return (
                  <div key={order.id} className="order-card">
                    <div className="order-card-header">
                      <div>
                        <div className="order-id">Order #{order.id}</div>
                        <div className="order-date">
                          Placed on {dateFormatted} &bull; Slot: {order.slot || 'Express'}
                        </div>
                      </div>
                      <span className={`status-badge ${statusCls}`}>{order.status}</span>
                    </div>

                    {!isCancelled ? (
                      <div className="tracking-stepper">
                        {TRACKING_STEPS.map((step, idx) => {
                          let cls = '';
                          if (idx < currentStepIdx) cls = 'completed';
                          else if (idx === currentStepIdx) cls = 'active';
                          return (
                            <div key={step} className={`step-item ${cls}`}>
                              <div className="step-circle">{idx < currentStepIdx ? '✓' : idx + 1}</div>
                              <div className="step-label">{step}</div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p
                        style={{
                          color: 'var(--danger)',
                          fontSize: '13px',
                          fontWeight: 700,
                          margin: '10px 0',
                        }}
                      >
                        This order has been cancelled.
                      </p>
                    )}

                    <div className="order-items-summary">
                      {order.items.map((it, i) => (
                        <div key={i} className="order-item-line">
                          <span>
                            {it.image ? (
                              <img
                                src={it.image.startsWith('/') ? it.image : '/' + it.image}
                                className="table-img"
                                style={{
                                  width: '22px',
                                  height: '22px',
                                  verticalAlign: 'middle',
                                  marginRight: '6px',
                                }}
                                alt={it.name}
                              />
                            ) : (
                              it.emoji || '🛒'
                            )}{' '}
                            {it.name} &times; {it.qty}
                          </span>
                          <span>{formatPrice(it.price * it.qty)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="order-card-footer">
                      <div>
                        📍 <strong>Deliver to:</strong> {order.customerName}, {order.address} (
                        {order.paymentMethod || 'COD'})
                      </div>
                      <div className="order-footer-total">Total: {formatPrice(order.total)}</div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}
