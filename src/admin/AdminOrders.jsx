import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/formatters';

export function AdminOrders() {
  const { orders, updateOrderStatus } = useStore();
  const { showToast } = useToast();
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders =
    statusFilter === 'all' ? orders : orders.filter((o) => o.status === statusFilter);

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    showToast(`Order #${orderId} status updated to "${newStatus}"`);
  };

  return (
    <div className="admin-tab-pane active" id="tab-admin-orders">
      <div className="admin-header-row">
        <div>
          <h2>Customer Orders &amp; Fulfillment</h2>
          <p className="admin-subtitle">
            Manage customer orders and update real-time fulfillment status
          </p>
        </div>
        <div className="admin-order-filters">
          <select
            id="adminOrderStatusFilter"
            className="admin-select-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Order Statuses</option>
            <option value="Placed">Placed</option>
            <option value="Processing">Processing</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="admin-section-card">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID &amp; Time</th>
                <th>Customer Info</th>
                <th>Delivery Address</th>
                <th>Items Ordered</th>
                <th>Payment</th>
                <th>Total</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody id="adminAllOrdersTableBody">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    style={{ textAlign: 'center', color: 'var(--gray-text)', padding: '30px' }}
                  >
                    No customer orders found
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o) => {
                  const dateFormatted = new Date(o.createdAt).toLocaleDateString('en-IN', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  });
                  return (
                    <tr key={o.id}>
                      <td>
                        <strong>#{o.id}</strong>
                        <br />
                        <span style={{ fontSize: '11px', color: 'var(--gray-text)' }}>
                          {dateFormatted}
                        </span>
                        <br />
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            color: 'var(--dark-green)',
                          }}
                        >
                          Slot: {o.slot}
                        </span>
                      </td>
                      <td>
                        <strong>{o.customerName}</strong>
                        <br />
                        <span style={{ fontSize: '11.5px', color: 'var(--gray-text)' }}>
                          {o.customerEmail || ''}
                        </span>
                        <br />
                        <span style={{ fontSize: '11.5px', color: 'var(--gray-text)' }}>
                          📞 {o.phone || 'N/A'}
                        </span>
                      </td>
                      <td style={{ maxWidth: '200px' }}>
                        {o.address}, {o.city} - {o.pincode}
                      </td>
                      <td>
                        <div style={{ fontSize: '12px', lineHeight: 1.4 }}>
                          {o.items.map((it, idx) => (
                            <div key={idx}>
                              {it.emoji || '🛒'} {it.name} &times; {it.qty}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td>
                        <span className="role-badge">{o.paymentMethod || 'COD'}</span>
                      </td>
                      <td>
                        <strong>{formatPrice(o.total)}</strong>
                      </td>
                      <td>
                        <select
                          className="status-select-sm"
                          data-order-id={o.id}
                          value={o.status}
                          onChange={(e) => handleStatusChange(o.id, e.target.value)}
                        >
                          {['Placed', 'Processing', 'Out for Delivery', 'Delivered', 'Cancelled'].map(
                            (s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            )
                          )}
                        </select>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
