import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import StorePage from './pages/StorePage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import { useAuth } from './context/AuthContext.jsx';

function RequireAdmin({ children }) {
  const { user } = useAuth();
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<StorePage />} />
      <Route
        path="/admin"
        element={
          <RequireAdmin>
            <AdminPage />
          </RequireAdmin>
        }
      />
    </Routes>
  );
}
