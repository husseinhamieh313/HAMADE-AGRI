import React from 'react';

export default function Hero({ onScrollTo }) {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content">
          <span className="hero-badge">PREMIUM AGRICULTURAL SOLUTIONS</span>
          <h1>Cultivating Excellence in Every Harvest</h1>
          <p>
            Elevate your agricultural endeavors with our curated selection of premium fertilizers,
            pesticides, tools, and expert services. Where tradition meets innovation.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => onScrollTo('products')}>
              Explore Collection
            </button>
            <button className="btn btn-outline" onClick={() => onScrollTo('contact')}>
              Consult Expert
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
