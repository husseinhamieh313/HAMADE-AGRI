import React from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';

const NAV_ITEMS = [
  { key: 'dashboard', icon: '📊', label: 'Dashboard' },
  { key: 'products', icon: '📦', label: 'Products' },
  { key: 'users', icon: '👥', label: 'Users' },
  { key: 'orders', icon: '🛒', label: 'Orders' },
  { key: 'messages', icon: '✉️', label: 'Messages' },
  { key: 'reviews', icon: '⭐', label: 'Product Reviews' },
  { key: 'testimonials', icon: '💬', label: 'Website Reviews' },
  { key: 'settings', icon: '⚙️', label: 'Settings' },
];

export default function Sidebar({ active, onChange, unreadMessages = 0 }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/');
    }
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">AgriCare</div>
        <div className="sidebar-subtitle">ADMIN DASHBOARD</div>
      </div>
      <div className="admin-profile">
        <div className="admin-avatar">{(user?.name || 'A')[0].toUpperCase()}</div>
        <div>
          <div style={{ fontWeight: 600 }}>{user?.name || 'Administrator'}</div>
          <div style={{ fontSize: '0.813rem', opacity: 0.7 }}>Super Admin</div>
        </div>
      </div>

      <Link to="/" className="view-store-btn">
        🏬 View Store
      </Link>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <div
            key={item.key}
            className={`nav-item ${active === item.key ? 'active' : ''}`}
            onClick={() => onChange(item.key)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
            {item.key === 'messages' && unreadMessages > 0 && (
              <span className="nav-badge">{unreadMessages}</span>
            )}
          </div>
        ))}
      </nav>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </aside>
  );
}