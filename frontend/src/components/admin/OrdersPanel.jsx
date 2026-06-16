import React from 'react';
import * as api from '../../api/api.js';

export default function OrdersPanel({ orders, onRefresh }) {
  async function setStatus(orderId, status) {
    try {
      await api.updateOrderStatus(orderId, status);
      onRefresh();
      alert(`Order #${orderId} status updated to ${status}`);
    } catch (err) {
      console.error(err);
      alert('Failed to update order status.');
    }
  }

  return (
    <section className="content-panel">
      <div className="section-header">
        <h2 className="section-title">Order Management</h2>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{new Date(order.created_at).toLocaleDateString()}</td>
              <td>{order.items.length} items</td>
              <td>${Number(order.total).toFixed(2)}</td>
              <td><span className="badge badge-warning">{order.status}</span></td>
              <td>
                <div className="action-buttons">
                  <button className="action-btn btn-success" onClick={() => setStatus(order.id, 'completed')}>Complete</button>
                  <button className="action-btn btn-danger" onClick={() => setStatus(order.id, 'cancelled')}>Cancel</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
