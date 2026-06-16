import React, { useState } from 'react';
import UserModal from './UserModal.jsx';
import * as api from '../../api/api.js';

export default function UsersPanel({ users, onRefresh }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  function openAdd() {
    setEditingUser(null);
    setModalOpen(true);
  }

  function openEdit(user) {
    setEditingUser(user);
    setModalOpen(true);
  }

  async function handleSave(data) {
    try {
      if (editingUser) {
        await api.updateUser(editingUser.id, data);
      } else {
        await api.createUser(data);
      }
      setModalOpen(false);
      onRefresh();
      alert('User saved successfully!');
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error || 'Failed to save user.');
    }
  }

  async function handleDelete(user) {
    if (user.role === 'admin') {
      alert('Cannot delete admin users!');
      return;
    }
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.deleteUser(user.id);
      onRefresh();
      alert('User deleted successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to delete user.');
    }
  }

  return (
    <section className="content-panel">
      <div className="section-header">
        <h2 className="section-title">User Management</h2>
        <button className="btn btn-primary" onClick={openAdd}>+ Add User</button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td><span className={`badge ${user.role === 'admin' ? 'badge-danger' : 'badge-success'}`}>{user.role}</span></td>
              <td>
                <div className="action-buttons">
                  <button className="action-btn btn-primary" onClick={() => openEdit(user)}>Edit</button>
                  <button className="action-btn btn-danger" disabled={user.role === 'admin'} onClick={() => handleDelete(user)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <UserModal open={modalOpen} user={editingUser} onClose={() => setModalOpen(false)} onSave={handleSave} />
    </section>
  );
}
