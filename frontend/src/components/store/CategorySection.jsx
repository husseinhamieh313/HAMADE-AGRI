import React from 'react';

const CATEGORIES = [
  { key: 'fertilizers', icon: '🌱', name: 'Fertilizers', tagline: 'Premium Nutrients' },
  { key: 'pesticides', icon: '🛡️', name: 'Pesticides', tagline: 'Protective Solutions' },
  { key: 'tools', icon: '🔧', name: 'Tools', tagline: 'Professional Equipment' },
  { key: 'services', icon: '⚙️', name: 'Services', tagline: 'Expert Consulting' },
];

export default function CategorySection({ onFilterCategory }) {
  return (
    <section className="category-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Our Expertise</span>
          <h2>Product Categories</h2>
          <p>Discover our comprehensive range of agricultural solutions, meticulously curated for your success</p>
        </div>
        <div className="category-grid">
          {CATEGORIES.map((cat) => (
            <div className="category-card" key={cat.key} onClick={() => onFilterCategory(cat.key)}>
              <div className="category-icon">{cat.icon}</div>
              <h3 className="category-name">{cat.name}</h3>
              <p className="category-count">{cat.tagline}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { CATEGORIES };
