import React from 'react';

export default function DashboardOverview({ products, users, orders }) {
  const revenue = orders.reduce((sum, o) => sum + Number(o.total), 0);
  const recentOrders = [...orders].slice(0, 5);
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section>
      <div className="top-bar">
        <h1>Dashboard Overview</h1>
        <div className="date-display">{today}</div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-value">{products.length}</div>
          <div className="stat-label">Total Products</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-value">{users.length}</div>
          <div className="stat-label">Total Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🛒</div>
          <div className="stat-value">{orders.length}</div>
          <div className="stat-label">Total Orders</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-value">${revenue.toFixed(2)}</div>
          <div className="stat-label">Total Revenue</div>
        </div>
      </div>

      <div className="content-panel">
        <h2 style={{ color: 'var(--forest-dark)', marginBottom: '2rem', fontSize: '2rem' }}>Recent Orders</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{new Date(order.created_at).toLocaleDateString()}</td>
                <td>${Number(order.total).toFixed(2)}</td>
                <td><span className="badge badge-warning">{order.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
