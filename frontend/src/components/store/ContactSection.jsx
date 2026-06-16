import React, { useState } from 'react';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    e.target.reset();
    setTimeout(() => setSubmitted(false), 3000);
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
                <p>123 Farm Road, Agricultural District</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">📞</div>
              <div>
                <h4 style={{ marginBottom: '0.5rem', color: 'var(--forest-dark)' }}>Call Us</h4>
                <p>+1-800-AGRICARE</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">✉</div>
              <div>
                <h4 style={{ marginBottom: '0.5rem', color: 'var(--forest-dark)' }}>Email Us</h4>
                <p>support@agricare.com</p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your Name</label>
              <input type="text" required />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" required />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" required />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea required />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              {submitted ? 'Thank you — message sent!' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
