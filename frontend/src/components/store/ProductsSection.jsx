import React, { useState } from 'react';
import ProductCard from './ProductCard.jsx';

export default function ProductsSection({ products, loading }) {
  const [toast, setToast] = useState('');

  function handleAdded(name) {
    setToast(`${name} added to cart!`);
    setTimeout(() => setToast(''), 2000);
  }

  return (
    <section className="products-section" id="products">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Premium Selection</span>
          <h2>Featured Products</h2>
          <p>Handpicked solutions for optimal agricultural performance</p>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', opacity: 0.7 }}>Loading products…</p>
        ) : products.length === 0 ? (
          <p style={{ textAlign: 'center', opacity: 0.7 }}>No products found.</p>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onAdded={handleAdded} />
            ))}
          </div>
        )}
      </div>

      {toast && <div className="toast">{toast}</div>}
    </section>
  );
}
