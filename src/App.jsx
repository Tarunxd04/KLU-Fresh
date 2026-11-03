import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { AdminLayout } from './admin/AdminLayout';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminProducts } from './admin/AdminProducts';
import { AdminOrders } from './admin/AdminOrders';
import { AdminUsers } from './admin/AdminUsers';
import { AdminRoute } from './components/AdminRoute';

export function App() {
  return (
    <Routes>
      {/* Public storefront & auth modal trigger routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Home />} />
      <Route path="/signup" element={<Home />} />

      {/* Admin routes with protection */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="users" element={<AdminUsers />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
