import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export default function AuthModal({ open, onClose }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  if (!open) return null;

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const loggedInUser = await login(loginEmail, loginPassword);
      if (loggedInUser.role === 'admin') {
        navigate('/admin');
      } else {
        alert('Welcome back, ' + loggedInUser.name + '!');
        onClose();
      }
    } catch (err) {
      alert(err?.response?.data?.error || 'Invalid credentials!');
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    if (regPassword !== regConfirm) {
      alert('Passwords do not match!');
      return;
    }
    if (regPassword.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }
    try {
      const newUser = await register(regName, regEmail, regPassword);
      alert('Account created successfully! Welcome, ' + newUser.name + '!');
      onClose();
    } catch (err) {
      const message = err?.response?.data?.error || 'Registration failed';
      alert(message);
      if (message.toLowerCase().includes('already registered')) setMode('login');
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        {mode === 'login' ? (
          <div>
            <h2>Welcome Back</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Login</button>
                <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
              </div>
            </form>
            <p style={{ textAlign: 'center', marginTop: '1.5rem', opacity: 0.7, fontSize: '0.875rem' }}>
              Don't have an account?{' '}
              <button className="linklike" style={{ color: 'var(--gold)', fontWeight: 600 }} onClick={() => setMode('register')}>
                Register here
              </button>
            </p>
            <p style={{ textAlign: 'center', marginTop: '0.5rem', opacity: 0.6, fontSize: '0.813rem' }}>
              Admin: admin@agricare.com / admin123
            </p>
          </div>
        ) : (
          <div>
            <h2>Create Account</h2>
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" value={regName} onChange={(e) => setRegName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} required minLength={6} />
                <p style={{ fontSize: '0.813rem', opacity: 0.7, marginTop: '0.5rem' }}>Password must be at least 6 characters</p>
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" value={regConfirm} onChange={(e) => setRegConfirm(e.target.value)} required />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Create Account</button>
                <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
              </div>
            </form>
            <p style={{ textAlign: 'center', marginTop: '1.5rem', opacity: 0.7, fontSize: '0.875rem' }}>
              Already have an account?{' '}
              <button className="linklike" style={{ color: 'var(--gold)', fontWeight: 600 }} onClick={() => setMode('login')}>
                Login here
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
