import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext.jsx';
import { useSettings } from '../../context/SettingsContext.jsx';

export default function Header({ onSearch, onOpenLogin, onToggleCart, onScrollTo }) {
  const { totalItems } = useCart();
  const { settings } = useSettings();
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleKeyUp(e) {
    if (e.key === 'Enter') onSearch(searchTerm);
  }

  const phone = settings?.contact_phone || '+1-800-AGRICARE';
  const email = settings?.contact_email || 'support@agricare.com';

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-top">
        <div className="container">
          <span>☎ {phone} | ✉ {email}</span>
          <span>🚚 Free Shipping on Orders Over $100</span>
        </div>
      </div>
      <div className="container">
        <div className="header-content">
          <a href="#home" className="logo" onClick={(e) => { e.preventDefault(); onScrollTo('home'); }}>
            {settings?.site_name || 'AgriCare'}
          </a>

          <div className="search-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search premium products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyUp={handleKeyUp}
            />
          </div>

          <nav className="nav">
            <button className="linklike" onClick={() => onScrollTo('home')}>Home</button>
            <button className="linklike" onClick={() => onScrollTo('products')}>Products</button>
            <button className="linklike" onClick={() => onScrollTo('features')}>Features</button>
            <button className="linklike" onClick={() => onScrollTo('testimonials')}>Reviews</button>
            <button className="linklike" onClick={() => onScrollTo('contact')}>Contact</button>
          </nav>

          <div className="header-actions">
            <button className="btn btn-outline" onClick={onOpenLogin}>Login</button>
            <div className="cart-icon" onClick={onToggleCart}>
              🛒
              <span className="cart-count">{totalItems}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}