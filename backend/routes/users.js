const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET /api/users
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, email, password, role, created_at FROM users ORDER BY id ASC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// POST /api/users  (admin "add user" form)
router.post('/', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'name, email and password are required' });
    }
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, password, role || 'user']
    );
    const [rows] = await pool.query('SELECT id, name, email, role FROM users WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// PUT /api/users/:id
router.put('/:id', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const [result] = await pool.query(
      'UPDATE users SET name=?, email=?, password=?, role=? WHERE id=?',
      [name, email, password, role, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
    const [rows] = await pool.query('SELECT id, name, email, role FROM users WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// DELETE /api/users/:id  (admins are protected)
router.delete('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT role FROM users WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'User not found' });
    if (rows[0].role === 'admin') {
      return res.status(403).json({ error: 'Cannot delete admin users' });
    }
    await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;
