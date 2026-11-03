import React from 'react';
import { useStore } from '../context/StoreContext';
import { getStoredUsers } from '../utils/authStorage';

export function AdminUsers() {
  const { orders } = useStore();
  const storedUsers = getStoredUsers();

  const usersList = [
    {
      id: 'admin_001',
      name: 'Store Administrator',
      email: 'admin@klufresh.com',
      role: 'admin',
      createdAt: 'System Admin',
    },
    ...storedUsers,
  ];

  return (
    <div className="admin-tab-pane active" id="tab-admin-users">
      <div className="admin-header-row">
        <div>
          <h2>Registered Customers</h2>
          <p className="admin-subtitle">List of customer accounts registered on KLU Fresh</p>
        </div>
      </div>

      <div className="admin-section-card">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Account Role</th>
                <th>Registered On</th>
                <th>Total Orders Placed</th>
              </tr>
            </thead>
            <tbody id="adminUsersTableBody">
              {usersList.map((u) => {
                const userOrdersCount = orders.filter(
                  (o) => o.userId === u.id || o.customerEmail === u.email
                ).length;
                const isAdm = u.role === 'admin';
                const dateFormatted =
                  u.createdAt === 'System Admin'
                    ? 'System Admin'
                    : u.createdAt
                    ? new Date(u.createdAt).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    : 'Recently';

                return (
                  <tr key={u.id}>
                    <td>
                      <strong>{u.name}</strong>
                    </td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`role-badge ${isAdm ? 'admin-role' : ''}`}>
                        {isAdm ? '🛡️ Store Admin' : '👤 Customer'}
                      </span>
                    </td>
                    <td>{dateFormatted}</td>
                    <td>
                      <strong>{isAdm ? '—' : `${userOrdersCount} orders`}</strong>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
