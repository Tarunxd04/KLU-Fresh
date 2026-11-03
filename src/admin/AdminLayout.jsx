import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { useToast } from '../context/ToastContext';

export function AdminLayout() {
  const { user, logout } = useAuth();
  const { orders } = useStore();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Add "admin-body" class to body when in admin section
  useEffect(() => {
    document.body.classList.add('admin-body');
    return () => {
      document.body.classList.remove('admin-body');
    };
  }, []);

  const handleLogout = () => {
    logout();
    showToast('Admin logged out successfully 👋');
    setTimeout(() => {
      navigate('/');
    }, 400);
  };

  return (
    <div id="adminModuleView" className="admin-module">
      {/* Admin Top Bar */}
      <div className="admin-topbar">
        <div className="admin-topbar-left">
          <div
            className="logo"
            id="adminLogoHome"
            onClick={() => navigate('/admin/dashboard')}
          >
            <span className="logo-leaf">🌿</span>
            <span className="logo-text">
              KLU <span>Fresh</span> <span className="admin-badge-tag">Admin Panel</span>
            </span>
          </div>
        </div>
        <div className="admin-topbar-actions">
          <span className="admin-user-pill">
            🛡️ Store Admin ({user?.email || 'admin@klufresh.com'})
          </span>
          <button
            className="btn btn-outline btn-small"
            id="adminBackToStoreBtn"
            onClick={() => navigate('/')}
          >
            🏪 View Storefront
          </button>
          <button
            className="btn btn-primary btn-small"
            id="adminLogoutBtn"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>
        </div>
      </div>

      <div className="admin-container">
        {/* Admin Sidebar Nav */}
        <aside className="admin-sidebar">
          <div className="admin-sidebar-menu">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="admin-nav-icon">📊</span>
              <span>Dashboard Overview</span>
            </NavLink>
            <NavLink
              to="/admin/products"
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="admin-nav-icon">📦</span>
              <span>Manage Products</span>
            </NavLink>
            <NavLink
              to="/admin/orders"
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="admin-nav-icon">📑</span>
              <span>Customer Orders</span>
              <span className="badge" id="adminOrdersBadge">
                {orders.length}
              </span>
            </NavLink>
            <NavLink
              to="/admin/users"
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="admin-nav-icon">👥</span>
              <span>Registered Users</span>
            </NavLink>
          </div>
          <div className="admin-sidebar-footer">
            <div className="admin-status-indicator">
              <span className="pulse-dot"></span> Live Store Management
            </div>
          </div>
        </aside>

        {/* Admin Main Content Area */}
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
