import React from 'react';
import * as api from '../../api/api.js';

export default function MessagesPanel({ messages, onRefresh }) {
  async function markRead(msg) {
    if (msg.status === 'read') return;
    try {
      await api.updateMessageStatus(msg.id, 'read');
      onRefresh();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this message?')) return;
    try {
      await api.deleteMessage(id);
      onRefresh();
    } catch (err) {
      console.error(err);
      alert('Failed to delete message.');
    }
  }

  return (
    <section className="content-panel">
      <div className="section-header">
        <h2 className="section-title">Contact Messages</h2>
      </div>

      {messages.length === 0 ? (
        <p style={{ opacity: 0.7, padding: '1rem 0' }}>No messages yet.</p>
      ) : (
        <div className="messages-list">
          {messages.map((msg) => (
            <div key={msg.id} className={`message-card ${msg.status === 'new' ? 'message-card-new' : ''}`}>
              <div className="message-card-header">
                <div>
                  <strong>{msg.name}</strong>
                  <span className="message-meta"> · {msg.email}{msg.phone ? ` · ${msg.phone}` : ''}</span>
                </div>
                <div className="message-card-actions">
                  {msg.status === 'new' && <span className="badge badge-warning">New</span>}
                  <span className="message-date">{new Date(msg.created_at).toLocaleString()}</span>
                </div>
              </div>
              <p className="message-body">{msg.message}</p>
              <div className="action-buttons">
                {msg.status === 'new' && (
                  <button className="action-btn btn-success" onClick={() => markRead(msg)}>Mark as Read</button>
                )}
                <button className="action-btn btn-danger" onClick={() => handleDelete(msg.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}