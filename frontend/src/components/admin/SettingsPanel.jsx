import React, { useState, useEffect } from 'react';
import * as api from '../../api/api.js';

export default function SettingsPanel({ settings, onRefresh }) {
  const [form, setForm] = useState({
    site_name: 'AgriCare Pharmacy',
    contact_email: 'support@agricare.com',
    contact_phone: '+1-800-AGRICARE',
    currency: 'USD',
  });

  useEffect(() => {
    if (settings) setForm(settings);
  }, [settings]);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSave() {
    try {
      await api.updateSettings(form);
      onRefresh();
      alert('Settings saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save settings.');
    }
  }

  return (
    <section className="content-panel">
      <div className="section-header">
        <h2 className="section-title">System Settings</h2>
      </div>
      <div className="form-grid">
        <div className="form-group">
          <label>Site Name</label>
          <input type="text" value={form.site_name || ''} onChange={(e) => update('site_name', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Contact Email</label>
          <input type="email" value={form.contact_email || ''} onChange={(e) => update('contact_email', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Contact Phone</label>
          <input type="tel" value={form.contact_phone || ''} onChange={(e) => update('contact_phone', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Currency</label>
          <select value={form.currency || 'USD'} onChange={(e) => update('currency', e.target.value)}>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </select>
        </div>
      </div>
      <button className="btn btn-success" style={{ marginTop: '2rem' }} onClick={handleSave}>Save Settings</button>
    </section>
  );
}
