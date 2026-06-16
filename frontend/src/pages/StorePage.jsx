import React, { useEffect, useState, useCallback } from 'react';
import '../styles/store.css';
import Header from '../components/store/Header.jsx';
import Hero from '../components/store/Hero.jsx';
import CategorySection from '../components/store/CategorySection.jsx';
import ProductsSection from '../components/store/ProductsSection.jsx';
import FeaturesSection from '../components/store/FeaturesSection.jsx';
import ContactSection from '../components/store/ContactSection.jsx';
import Footer from '../components/store/Footer.jsx';
import CartSidebar from '../components/store/CartSidebar.jsx';
import AuthModal from '../components/store/AuthModal.jsx';
import * as api from '../api/api.js';

export default function StorePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const loadProducts = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const data = await api.getProducts(params);
      setProducts(data);
    } catch (err) {
      console.error('Failed to load products', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  function filterCategory(category) {
    loadProducts({ category });
    scrollTo('products');
  }

  function search(term) {
    loadProducts({ search: term });
  }

  return (
    <div className="store">
      <Header
        onSearch={search}
        onOpenLogin={() => setLoginOpen(true)}
        onToggleCart={() => setCartOpen((v) => !v)}
        onScrollTo={scrollTo}
      />
      <Hero onScrollTo={scrollTo} />
      <CategorySection onFilterCategory={filterCategory} />
      <ProductsSection products={products} loading={loading} />
      <FeaturesSection />
      <ContactSection />
      <Footer onScrollTo={scrollTo} onFilterCategory={filterCategory} onOpenLogin={() => setLoginOpen(true)} />

      <CartSidebar active={cartOpen} onClose={() => setCartOpen(false)} />
      <AuthModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
}
