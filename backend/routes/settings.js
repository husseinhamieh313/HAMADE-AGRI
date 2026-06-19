const express = require('express');
const router = express.Router();
const pool = require('../config/db');

const DEFAULTS = {
  site_name: 'AgriCare Pharmacy',
  contact_email: 'support@agricare.com',
  contact_phone: '+1-800-AGRICARE',
  currency: 'USD',
};

// GET /api/settings
// Always returns a real row — auto-creates one with defaults if the table is empty,
// so the frontend never receives an empty object that would blank out the form.
router.get('/', async (req, res) => {
  try {
    let [rows] = await pool.query('SELECT * FROM settings LIMIT 1');

    if (rows.length === 0) {
      await pool.query(
        'INSERT INTO settings (site_name, contact_email, contact_phone, currency) VALUES (?, ?, ?, ?)',
        [DEFAULTS.site_name, DEFAULTS.contact_email, DEFAULTS.contact_phone, DEFAULTS.currency]
      );
      [rows] = await pool.query('SELECT * FROM settings LIMIT 1');
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// PUT /api/settings
router.put('/', async (req, res) => {
  try {
    // Fall back to defaults instead of passing `undefined` to MySQL (which mysql2 rejects outright)
    const site_name = req.body.site_name ?? DEFAULTS.site_name;
    const contact_email = req.body.contact_email ?? DEFAULTS.contact_email;
    const contact_phone = req.body.contact_phone ?? DEFAULTS.contact_phone;
    const currency = req.body.currency ?? DEFAULTS.currency;

    const [existing] = await pool.query('SELECT id FROM settings LIMIT 1');

    if (existing.length === 0) {
      await pool.query(
        'INSERT INTO settings (site_name, contact_email, contact_phone, currency) VALUES (?, ?, ?, ?)',
        [site_name, contact_email, contact_phone, currency]
      );
    } else {
      await pool.query(
        'UPDATE settings SET site_name=?, contact_email=?, contact_phone=?, currency=? WHERE id=?',
        [site_name, contact_email, contact_phone, currency, existing[0].id]
      );
    }

    const [rows] = await pool.query('SELECT * FROM settings LIMIT 1');
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

module.exports = router;