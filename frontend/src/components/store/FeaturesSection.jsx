import React from 'react';

const FEATURES = [
  { icon: '🎯', title: 'Quality Assurance', text: 'Every product undergoes rigorous testing to ensure premium quality and effectiveness for your agricultural needs.' },
  { icon: '🚀', title: 'Fast Delivery', text: 'Swift and reliable shipping ensures your products arrive exactly when you need them, keeping your operations on schedule.' },
  { icon: '💡', title: 'Expert Support', text: 'Our team of agricultural specialists is always ready to provide guidance and support for optimal results.' },
];

export default function FeaturesSection() {
  return (
    <section className="features-section" id="features">
      <div className="container">
        <div className="section-header">
          <span className="section-label" style={{ color: 'var(--gold)' }}>Why Choose Us</span>
          <h2 style={{ color: 'var(--cream)' }}>The AgriCare Difference</h2>
          <p style={{ opacity: 0.7 }}>Experience excellence in every aspect of our service</p>
        </div>
        <div className="features-grid">
          {FEATURES.map((f) => (
            <div className="feature-item" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
