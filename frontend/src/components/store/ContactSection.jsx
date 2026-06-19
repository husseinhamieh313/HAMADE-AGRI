import React, { useState } from 'react';
import * as api from '../../api/api.js';
import { useSettings } from '../../context/SettingsContext.jsx';

const EMPTY_FORM = { name: '', email: '', phone: '', message: '' };

export default function ContactSection() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const { settings } = useSettings();

  const phone = settings?.contact_phone || '70831809';
  const email = settings?.contact_email || 'hamadeagri@gmail.com';

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      await api.createMessage(form);
      setStatus('sent');
      setForm(EMPTY_FORM);
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Get In Touch</span>
          <h2>Contact Our Experts</h2>
          <p>Have questions? Our team is here to help you succeed</p>
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            <h3>Reach Out Today</h3>
            <div className="contact-item">
              <div className="contact-item-icon">📍</div>
              <div>
                <h4 style={{ marginBottom: '0.5rem', color: 'var(--forest-dark)' }}>Visit Us</h4>
                <p>Kfarmelki,saida-jbaa main road</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">📞</div>
              <div>
                <h4 style={{ marginBottom: '0.5rem', color: 'var(--forest-dark)' }}>Call Us</h4>
                <p>{phone}</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">✉</div>
              <div>
                <h4 style={{ marginBottom: '0.5rem', color: 'var(--forest-dark)' }}>Email Us</h4>
                <p>{email}</p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your Name</label>
              <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea value={form.message} onChange={(e) => update('message', e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={status === 'sending'}>
              {status === 'sending' && 'Sending…'}
              {status === 'sent' && 'Thank you — message sent!'}
              {status === 'error' && 'Something went wrong — try again'}
              {status === 'idle' && 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}