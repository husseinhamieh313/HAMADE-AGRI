const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET /api/testimonials  -> all testimonials, newest first
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM testimonials ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

// POST /api/testimonials
router.post('/', async (req, res) => {
  try {
    const { name, rating, comment, user_id } = req.body;
    if (!name || !rating || !comment) {
      return res.status(400).json({ error: 'name, rating and comment are required' });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'rating must be between 1 and 5' });
    }
    const [result] = await pool.query(
      'INSERT INTO testimonials (name, rating, comment, user_id) VALUES (?, ?, ?, ?)',
      [name, rating, comment, user_id || null]
    );
    const [rows] = await pool.query('SELECT * FROM testimonials WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit testimonial' });
  }
});

// DELETE /api/testimonials/:id  (admin moderation)
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM testimonials WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Testimonial not found' });
    res.json({ message: 'Testimonial deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
});

module.exports = router;