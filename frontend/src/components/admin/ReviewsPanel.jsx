import React from 'react';
import StarRating from '../store/StarRating.jsx';
import * as api from '../../api/api.js';

export default function ReviewsPanel({ reviews, onRefresh }) {
  async function handleDelete(id) {
    if (!window.confirm('Delete this review?')) return;
    try {
      await api.deleteReview(id);
      onRefresh();
    } catch (err) {
      console.error(err);
      alert('Failed to delete review.');
    }
  }

  return (
    <section className="content-panel">
      <div className="section-header">
        <h2 className="section-title">Customer Reviews</h2>
      </div>

      {reviews.length === 0 ? (
        <p style={{ opacity: 0.7, padding: '1rem 0' }}>No reviews yet.</p>
      ) : (
        <div className="messages-list">
          {reviews.map((r) => (
            <div key={r.id} className="message-card">
              <div className="message-card-header">
                <div>
                  <strong>{r.name}</strong>
                  <span className="message-meta"> · on {r.product_name}</span>
                </div>
                <div className="message-card-actions">
                  <StarRating value={r.rating} readOnly size={14} />
                  <span className="message-date">{new Date(r.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              <p className="message-body">{r.comment}</p>
              <div className="action-buttons">
                <button className="action-btn btn-danger" onClick={() => handleDelete(r.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}