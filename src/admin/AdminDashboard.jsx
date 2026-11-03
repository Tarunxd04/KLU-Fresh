import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/formatters';
import { getStoredUsers } from '../utils/authStorage';
import { ProductFormModal } from './ProductFormModal';

export function AdminDashboard() {
  const { products, orders, addProduct, updateOrderStatus } = useStore();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalRevenue = orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + (o.total || 0), 0);

  const pendingOrders = orders.filter((o) => o.status === 'Placed' || o.status === 'Processing').length;
  const lowStockCount = products.filter((p) => p.stock <= 3).length;
  const storedUsers = getStoredUsers();

  const recentOrders = orders.slice(0, 5);

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    showToast(`Order #${orderId} status updated to "${newStatus}"`);
  };

  const handleSaveProduct = (prodData) => {
    addProduct(prodData);
    setIsModalOpen(false);
    showToast(`✓ Added ${prodData.name} to catalog`);
  };

  return (
    <div className="admin-tab-pane active" id="tab-admin-dashboard">
      <div className="admin-header-row">
        <div>
          <h2>Dashboard Overview</h2>
          <p className="admin-subtitle">Live store statistics, revenue, and fulfillment status</p>
        </div>
        <button
          className="btn btn-primary btn-small"
          id="adminAddNewProductBtnDash"
          onClick={() => setIsModalOpen(true)}
        >
          ➕ Add New Product
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="stat-icon-wrap icon-green">💰</div>
          <div>
            <div className="stat-label">Total Revenue</div>
            <div className="stat-value" id="adminStatRevenue">
              {formatPrice(totalRevenue)}
            </div>
            <div className="stat-sub">From all customer orders</div>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-icon-wrap icon-orange">📑</div>
          <div>
            <div className="stat-label">Total Orders</div>
            <div className="stat-value" id="adminStatOrders">
              {orders.length}
            </div>
            <div className="stat-sub" id="adminStatPendingOrders">
              {pendingOrders} active / pending
            </div>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-icon-wrap icon-blue">📦</div>
          <div>
            <div className="stat-label">Catalog Products</div>
            <div className="stat-value" id="adminStatProducts">
              {products.length}
            </div>
            <div className="stat-sub" id="adminStatLowStock">
              {lowStockCount} low in stock
            </div>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-icon-wrap icon-purple">👥</div>
          <div>
            <div className="stat-label">Registered Users</div>
            <div className="stat-value" id="adminStatUsers">
              {storedUsers.length}
            </div>
            <div className="stat-sub">Active customer accounts</div>
          </div>
        </div>
      </div>

      {/* Recent Orders Snapshot */}
      <div className="admin-section-card">
        <div className="admin-card-header">
          <h3>Recent Customer Orders</h3>
          <button
            className="link-btn"
            id="viewAllOrdersLink"
            onClick={() => navigate('/admin/orders')}
          >
            View All Orders →
          </button>
        </div>
        <div className="table-responsive">
          <table className="admin-table" id="adminRecentOrdersTable">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Slot</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="adminRecentOrdersBody">
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', color: 'var(--gray-text)' }}>
                    No customer orders yet
                  </td>
                </tr>
              ) : (
                recentOrders.map((o) => {
                  const statusCls = `status-${o.status.toLowerCase().replace(/\s+/g, '-')}`;
                  return (
                    <tr key={o.id}>
                      <td>
                        <strong>#{o.id}</strong>
                      </td>
                      <td>
                        {o.customerName}
                        <br />
                        <span style={{ fontSize: '11px', color: 'var(--gray-text)' }}>
                          {o.customerEmail || ''}
                        </span>
                      </td>
                      <td>{o.items.length} item(s)</td>
                      <td>
                        <strong>{formatPrice(o.total)}</strong>
                      </td>
                      <td>{o.slot}</td>
                      <td>
                        <span className={`status-badge ${statusCls}`}>{o.status}</span>
                      </td>
                      <td>
                        <select
                          className="status-select-sm"
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

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
      />
    </div>
  );
}
