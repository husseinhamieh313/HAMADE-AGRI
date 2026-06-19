import React from 'react';
import StarRating from '../store/StarRating.jsx';
import * as api from '../../api/api.js';

export default function TestimonialsPanel({ testimonials, onRefresh }) {
  async function handleDelete(id) {
    if (!window.confirm('Delete this review?')) return;
    try {
      await api.deleteTestimonial(id);
      onRefresh();
    } catch (err) {
      console.error(err);
      alert('Failed to delete review.');
    }
  }

  return (
    <section className="content-panel">
      <div className="section-header">
        <h2 className="section-title">Website Reviews</h2>
      </div>

      {testimonials.length === 0 ? (
        <p style={{ opacity: 0.7, padding: '1rem 0' }}>No reviews yet.</p>
      ) : (
        <div className="messages-list">
          {testimonials.map((t) => (
            <div key={t.id} className="message-card">
              <div className="message-card-header">
                <div>
                  <strong>{t.name}</strong>
                </div>
                <div className="message-card-actions">
                  <StarRating value={t.rating} readOnly size={14} />
                  <span className="message-date">{new Date(t.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              <p className="message-body">{t.comment}</p>
              <div className="action-buttons">
                <button className="action-btn btn-danger" onClick={() => handleDelete(t.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}