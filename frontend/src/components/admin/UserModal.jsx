import React, { useState, useEffect } from 'react';

const EMPTY_FORM = { name: '', email: '', password: '', role: 'user' };

export default function UserModal({ open, user, onClose, onSave }) {
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    if (user) {
      setForm({ name: user.name, email: user.email, password: user.password, role: user.role });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [user, open]);

  if (!open) return null;

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>{user ? 'Edit User' : 'Add User'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={form.password} onChange={(e) => update('password', e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select value={form.role} onChange={(e) => update('role', e.target.value)} required>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success" style={{ width: '100%' }}>Save User</button>
        </form>
      </div>
    </div>
  );
}
