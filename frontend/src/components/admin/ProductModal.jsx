import React, { useState, useEffect } from 'react';
import { useSettings } from '../../context/SettingsContext.jsx';

const ICON_OPTIONS = [
  { value: '🌱', label: '🌱 Fertilizers' },
  { value: '🛡️', label: '🛡️ Pesticides' },
  { value: '🔧', label: '🔧 Tools' },
  { value: '⚙️', label: '⚙️ Services' },
];

const EMPTY_FORM = {
  name: '',
  category: 'fertilizers',
  price: '',
  icon: '🌱',
  image: '',
  description: '',
  featured: false,
};

export default function ProductModal({ open, product, onClose, onSave }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const { currencySymbol } = useSettings();

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        category: product.category,
        price: product.price,
        icon: product.icon || '🌱',
        image: product.image || '',
        description: product.description,
        featured: !!product.featured,
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [product, open]);

  if (!open) return null;

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave({ ...form, price: parseFloat(form.price) });
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '700px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>{product ? 'Edit Product' : 'Add Product'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Image URL</label>
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={form.image}
              onChange={(e) => update('image', e.target.value)}
            />
            <p style={{ fontSize: '0.813rem', opacity: 0.7, marginTop: '0.5rem' }}>
              Enter image URL or leave blank to use emoji icon
            </p>
          </div>

          {form.image && (
            <div className="form-group">
              <label>Image Preview</label>
              <div style={{ width: '100%', height: '200px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(45,80,22,0.15)' }}>
                <img
                  src={form.image}
                  alt="preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            </div>
          )}

          <div className="form-grid">
            <div className="form-group">
              <label>Product Name</label>
              <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select value={form.category} onChange={(e) => update('category', e.target.value)} required>
                <option value="fertilizers">Fertilizers</option>
                <option value="pesticides">Pesticides</option>
                <option value="tools">Tools</option>
                <option value="services">Services</option>
              </select>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Price ({currencySymbol})</label>
              <input type="number" step="0.01" value={form.price} onChange={(e) => update('price', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Icon (Fallback if no image)</label>
              <select
                value={form.icon}
                onChange={(e) => update('icon', e.target.value)}
                required
                style={{ fontSize: '1.5rem', padding: '0.875rem 1rem' }}
              >
                {ICON_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              required
              style={{ minHeight: '120px' }}
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => update('featured', e.target.checked)}
                style={{ width: 'auto', marginRight: '0.5rem' }}
              />
              Featured product
            </label>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" className="btn btn-success" style={{ flex: 1 }}>Save Product</button>
            <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}