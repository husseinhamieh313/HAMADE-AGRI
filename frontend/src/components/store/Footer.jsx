import React from 'react';

export default function Footer({ onScrollTo, onFilterCategory, onOpenLogin }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div>
            <div className="footer-brand">AgriCare</div>
            <p style={{ opacity: 0.7, lineHeight: 1.8 }}>
              Cultivating excellence in agriculture since 2020. Your trusted partner for premium agricultural solutions.
            </p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><button className="linklike" onClick={() => onScrollTo('home')}>Home</button></li>
              <li><button className="linklike" onClick={() => onScrollTo('products')}>Products</button></li>
              <li><button className="linklike" onClick={() => onScrollTo('features')}>Features</button></li>
              <li><button className="linklike" onClick={() => onScrollTo('contact')}>Contact</button></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Categories</h4>
            <ul>
              <li><button className="linklike" onClick={() => onFilterCategory('fertilizers')}>Fertilizers</button></li>
              <li><button className="linklike" onClick={() => onFilterCategory('pesticides')}>Pesticides</button></li>
              <li><button className="linklike" onClick={() => onFilterCategory('tools')}>Tools</button></li>
              <li><button className="linklike" onClick={() => onFilterCategory('services')}>Services</button></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><button className="linklike" onClick={onOpenLogin}>Admin Login</button></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Shipping Info</a></li>
              <li><a href="#">Returns</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 AgriCare Premium Agricultural Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
