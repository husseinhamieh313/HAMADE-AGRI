import React, { useState, useEffect, useCallback } from 'react';
import * as api from '../../api/api.js';
import { useAuth } from '../../context/AuthContext.jsx';
import StarRating from './StarRating.jsx';

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { user } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', rating: 5, comment: '' });

  const loadTestimonials = useCallback(() => {
    setLoading(true);
    api.getTestimonials().then(setTestimonials).catch(console.error).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadTestimonials();
  }, [loadTestimonials]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.comment.trim()) return;
    setSubmitting(true);
    try {
      await api.createTestimonial({
        name: form.name,
        rating: form.rating,
        comment: form.comment,
        user_id: user?.id || null,
      });
      await loadTestimonials();
      setForm((f) => ({ ...f, comment: '' }));
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      console.error(err);
      alert('Failed to submit your review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Customer Voices</span>
          <h2>What Our Customers Say</h2>
          <p>Real feedback from the farmers and growers who trust AgriCare</p>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', opacity: 0.7 }}>Loading reviews…</p>
        ) : testimonials.length === 0 ? (
          <p style={{ textAlign: 'center', opacity: 0.7, marginBottom: '3rem' }}>
            No reviews yet — be the first to share your experience!
          </p>
        ) : (
          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <div className="testimonial-card" key={t.id}>
                <StarRating value={t.rating} readOnly size={16} />
                <p className="testimonial-comment">“{t.comment}”</p>
                <div className="testimonial-author">{t.name}</div>
                <span className="testimonial-date">{new Date(t.created_at).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        )}

        <div className="testimonial-form-wrapper">
          <form className="testimonial-form" onSubmit={handleSubmit}>
            <h3>Share Your Experience</h3>
            <div className="form-group">
              <label>Your Rating</label>
              <StarRating value={form.rating} onChange={(v) => setForm((f) => ({ ...f, rating: v }))} size={26} />
            </div>
            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                required
              />
            </div>
            <div className="form-group">
              <label>Your Comment</label>
              <textarea
                value={form.comment}
                onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={submitting}>
              {submitting ? 'Submitting…' : submitted ? 'Thank you for your feedback!' : 'Submit Review'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}