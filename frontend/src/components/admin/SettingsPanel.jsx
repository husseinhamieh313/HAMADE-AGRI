import React, { useState, useEffect } from 'react';
import * as api from '../../api/api.js';

const DEFAULT_FORM = {
  site_name: 'AgriCare Pharmacy',
  contact_email: 'support@agricare.com',
  contact_phone: '+1-800-AGRICARE',
  currency: 'USD',
};

export default function SettingsPanel({ settings, onRefresh }) {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [saveState, setSaveState] = useState('idle'); // idle | saving | saved | error

  useEffect(() => {
    // Guard against an empty/partial settings object ever blanking out the form.
    if (settings && Object.keys(settings).length > 0) {
      setForm({ ...DEFAULT_FORM, ...settings });
    }
  }, [settings]);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSave() {
    setSaveState('saving');
    try {
      await api.updateSettings(form);
      await onRefresh();
      setSaveState('saved');
      setTimeout(() => setSaveState('idle'), 2500);
    } catch (err) {
      console.error(err);
      setSaveState('error');
    }
  }

  return (
    <section className="content-panel">
      <div className="section-header">
        <h2 className="section-title">System Settings</h2>
      </div>

      <p style={{ opacity: 0.75, marginBottom: '0.5rem' }}>
        These values appear live on the storefront: the site name in the header logo, the phone/email in the
        top bar and contact section, and the currency symbol on every price (store and admin alike).
      </p>

      <div className="form-grid">
        <div className="form-group">
          <label>Site Name</label>
          <input type="text" value={form.site_name} onChange={(e) => update('site_name', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Contact Email</label>
          <input type="email" value={form.contact_email} onChange={(e) => update('contact_email', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Contact Phone</label>
          <input type="tel" value={form.contact_phone} onChange={(e) => update('contact_phone', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Currency</label>
          <select value={form.currency} onChange={(e) => update('currency', e.target.value)}>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
        <button className="btn btn-success" onClick={handleSave} disabled={saveState === 'saving'}>
          {saveState === 'saving' ? 'Saving…' : 'Save Settings'}
        </button>
        {saveState === 'saved' && <span className="badge badge-success">Saved ✓</span>}
        {saveState === 'error' && <span className="badge badge-danger">Failed to save — try again</span>}
      </div>
    </section>
  );
}