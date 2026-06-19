const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET /api/reviews/summary
// -> { [product_id]: { avg_rating, review_count } } for every product that has reviews
router.get('/summary', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT product_id, AVG(rating) AS avg_rating, COUNT(*) AS review_count FROM reviews GROUP BY product_id'
    );
    const summary = {};
    rows.forEach((row) => {
      summary[row.product_id] = {
        avg_rating: parseFloat(row.avg_rating),
        review_count: row.review_count,
      };
    });
    res.json(summary);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch review summary' });
  }
});

// GET /api/reviews/all  -> every review with its product name, for admin moderation
router.get('/all', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT reviews.*, products.name AS product_name
       FROM reviews
       JOIN products ON products.id = reviews.product_id
       ORDER BY reviews.created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// GET /api/reviews?productId=X  -> reviews for one product, newest first
router.get('/', async (req, res) => {
  try {
    const { productId } = req.query;
    if (!productId) return res.status(400).json({ error: 'productId is required' });
    const [rows] = await pool.query(
      'SELECT * FROM reviews WHERE product_id = ? ORDER BY created_at DESC',
      [productId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// POST /api/reviews
router.post('/', async (req, res) => {
  try {
    const { product_id, user_id, name, rating, comment } = req.body;
    if (!product_id || !name || !rating || !comment) {
      return res.status(400).json({ error: 'product_id, name, rating and comment are required' });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'rating must be between 1 and 5' });
    }
    const [result] = await pool.query(
      'INSERT INTO reviews (product_id, user_id, name, rating, comment) VALUES (?, ?, ?, ?, ?)',
      [product_id, user_id || null, name, rating, comment]
    );
    const [rows] = await pool.query('SELECT * FROM reviews WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit review' });
  }
});

// DELETE /api/reviews/:id  (admin moderation)
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM reviews WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Review not found' });
    res.json({ message: 'Review deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

module.exports = router;