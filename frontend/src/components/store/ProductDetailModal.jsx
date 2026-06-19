import React, { useEffect, useState } from 'react';
import * as api from '../../api/api.js';
import { useSettings } from '../../context/SettingsContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import StarRating from './StarRating.jsx';

export default function ProductDetailModal({ product, onClose, onReviewed }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', rating: 5, comment: '' });
  const { currencySymbol } = useSettings();
  const { addToCart } = useCart();

  useEffect(() => {
    if (!product) return;
    setLoading(true);
    api.getReviews(product.id).then(setReviews).catch(console.error).finally(() => setLoading(false));
  }, [product]);

  if (!product) return null;

  const avg = reviews.length ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.comment.trim()) return;
    setSubmitting(true);
    try {
      await api.createReview({
        product_id: product.id,
        user_id: user?.id || null,
        name: form.name,
        rating: form.rating,
        comment: form.comment,
      });
      const updated = await api.getReviews(product.id);
      setReviews(updated);
      setForm((f) => ({ ...f, comment: '' }));
      onReviewed && onReviewed(product.id);
    } catch (err) {
      console.error(err);
      alert('Failed to submit your review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content product-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="product-detail-header">
          <div
            className="product-detail-image"
            style={product.image ? { backgroundImage: `url('${product.image}')` } : undefined}
          >
            {!product.image && <span className="product-icon">{product.icon}</span>}
          </div>
          <div>
            <div className="product-category">{product.category}</div>
            <h2>{product.name}</h2>
            <div className="product-detail-rating">
              <StarRating value={avg} readOnly size={18} />
              <span>
                {avg ? avg.toFixed(1) : 'No ratings yet'}
                {reviews.length > 0 && ` (${reviews.length} review${reviews.length === 1 ? '' : 's'})`}
              </span>
            </div>
            <p>{product.description}</p>
            <div className="product-detail-footer">
              <span className="product-price">{currencySymbol}{Number(product.price).toFixed(2)}</span>
              <button className="add-to-cart" onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          </div>
        </div>

        <hr className="product-detail-divider" />

        <h3 className="reviews-heading">Customer Reviews</h3>

        {loading ? (
          <p style={{ opacity: 0.7 }}>Loading reviews…</p>
        ) : reviews.length === 0 ? (
          <p style={{ opacity: 0.7, marginBottom: '2rem' }}>No reviews yet — be the first to share your experience!</p>
        ) : (
          <div className="reviews-list">
            {reviews.map((r) => (
              <div className="review-card" key={r.id}>
                <div className="review-card-header">
                  <strong>{r.name}</strong>
                  <StarRating value={r.rating} readOnly size={14} />
                </div>
                <p className="review-comment">{r.comment}</p>
                <span className="review-date">{new Date(r.created_at).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        )}

        <form className="review-form" onSubmit={handleSubmit}>
          <h4>Write a Review</h4>
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
            <label>Your Review</label>
            <textarea
              value={form.comment}
              onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
}