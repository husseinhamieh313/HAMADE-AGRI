import React from 'react';
import { useCart } from '../../context/CartContext.jsx';
import { useSettings } from '../../context/SettingsContext.jsx';
import StarRating from './StarRating.jsx';

export default function ProductCard({ product, onAdded, summary, onOpenDetail }) {
  const { addToCart } = useCart();
  const { currencySymbol } = useSettings();

  function handleAdd(e) {
    e.stopPropagation();
    addToCart(product);
    onAdded(product.name);
  }

  return (
    <div className="product-card" onClick={() => onOpenDetail(product)}>
      <div
        className="product-image"
        style={product.image ? { backgroundImage: `url('${product.image}')` } : undefined}
      >
        {!product.image && <span className="product-icon">{product.icon}</span>}
        {!!product.featured && <div className="product-badge">Featured</div>}
      </div>
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating-summary">
          <StarRating value={summary?.avg_rating || 0} readOnly size={14} />
          <span className="rating-count">
            {summary?.review_count ? `(${summary.review_count})` : 'No reviews yet'}
          </span>
        </div>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">{currencySymbol}{Number(product.price).toFixed(2)}</span>
          <button className="add-to-cart" onClick={handleAdd}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}