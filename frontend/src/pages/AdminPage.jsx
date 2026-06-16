import React, { useState, useEffect, useCallback } from 'react';
import '../styles/admin.css';
import Sidebar from '../components/admin/Sidebar.jsx';
import DashboardOverview from '../components/admin/DashboardOverview.jsx';
import ProductsPanel from '../components/admin/ProductsPanel.jsx';
import UsersPanel from '../components/admin/UsersPanel.jsx';
import OrdersPanel from '../components/admin/OrdersPanel.jsx';
import SettingsPanel from '../components/admin/SettingsPanel.jsx';
import * as api from '../api/api.js';

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [settings, setSettings] = useState(null);

  const refreshProducts = useCallback(() => api.getProducts().then(setProducts).catch(console.error), []);
  const refreshUsers = useCallback(() => api.getUsers().then(setUsers).catch(console.error), []);
  const refreshOrders = useCallback(() => api.getOrders().then(setOrders).catch(console.error), []);
  const refreshSettings = useCallback(() => api.getSettings().then(setSettings).catch(console.error), []);

  useEffect(() => {
    refreshProducts();
    refreshUsers();
    refreshOrders();
    refreshSettings();
  }, [refreshProducts, refreshUsers, refreshOrders, refreshSettings]);

  return (
    <div className="admin">
      <Sidebar active={activeSection} onChange={setActiveSection} />
      <main className="main-content">
        {activeSection === 'dashboard' && (
          <DashboardOverview products={products} users={users} orders={orders} />
        )}
        {activeSection === 'products' && (
          <>
            <div className="top-bar"><h1>Products</h1></div>
            <ProductsPanel products={products} onRefresh={refreshProducts} />
          </>
        )}
        {activeSection === 'users' && (
          <>
            <div className="top-bar"><h1>Users</h1></div>
            <UsersPanel users={users} onRefresh={refreshUsers} />
          </>
        )}
        {activeSection === 'orders' && (
          <>
            <div className="top-bar"><h1>Orders</h1></div>
            <OrdersPanel orders={orders} onRefresh={refreshOrders} />
          </>
        )}
        {activeSection === 'settings' && (
          <>
            <div className="top-bar"><h1>Settings</h1></div>
            <SettingsPanel settings={settings} onRefresh={refreshSettings} />
          </>
        )}
      </main>
    </div>
  );
}
