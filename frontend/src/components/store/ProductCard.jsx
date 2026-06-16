import React from 'react';
import { useCart } from '../../context/CartContext.jsx';

export default function ProductCard({ product, onAdded }) {
  const { addToCart } = useCart();

  function handleAdd() {
    addToCart(product);
    onAdded(product.name);
  }

  return (
    <div className="product-card">
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
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">${Number(product.price).toFixed(2)}</span>
          <button className="add-to-cart" onClick={handleAdd}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
