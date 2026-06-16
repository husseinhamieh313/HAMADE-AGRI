const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET /api/settings
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM settings LIMIT 1');
    res.json(rows[0] || {});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// PUT /api/settings
router.put('/', async (req, res) => {
  try {
    const { site_name, contact_email, contact_phone, currency } = req.body;
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
