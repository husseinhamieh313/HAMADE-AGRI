import React from 'react';
import { useCart } from '../../context/CartContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useSettings } from '../../context/SettingsContext.jsx';
import * as api from '../../api/api.js';

export default function CartSidebar({ active, onClose }) {
  const { cart, total, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const { currencySymbol } = useSettings();

  async function handleCheckout() {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    if (!window.confirm(`Proceed to payment for ${currencySymbol}${total.toFixed(2)}?`)) return;

    try {
      await api.createOrder({
        userId: user ? user.id : null,
        items: cart.map((item) => ({ id: item.id, name: item.name, price: item.price, quantity: item.quantity })),
        total,
      });
      alert('Payment successful! Thank you for your purchase!');
      clearCart();
      onClose();
    } catch (err) {
      console.error(err);
      alert('Something went wrong placing your order. Please try again.');
    }
  }

  return (
    <>
      {active && <div className="cart-overlay" onClick={onClose} />}
      <div className={`cart-sidebar ${active ? 'active' : ''}`}>
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button className="cart-close" onClick={onClose}>×</button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '3rem', color: '#999' }}>Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-image">{item.icon || '🛒'}</div>
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">{currencySymbol}{Number(item.price).toFixed(2)}</div>
                  <div className="cart-item-quantity">
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                    <button
                      className="qty-btn"
                      style={{ marginLeft: 'auto', color: '#dc3545' }}
                      onClick={() => removeFromCart(item.id)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-footer">
          <div className="cart-total">
            <span>Total</span>
            <span>{currencySymbol}{total.toFixed(2)}</span>
          </div>
          <button className="btn btn-primary" style={{ width: '100%', marginBottom: '0.75rem' }} onClick={handleCheckout}>
            Checkout Now
          </button>
          <button className="btn btn-outline" style={{ width: '100%' }} onClick={onClose}>
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
}