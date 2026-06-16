const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET /api/orders  -> orders with their items attached
router.get('/', async (req, res) => {
  try {
    const [orders] = await pool.query('SELECT * FROM orders ORDER BY id DESC');
    const [items] = await pool.query('SELECT * FROM order_items');

    const ordersWithItems = orders.map((order) => ({
      ...order,
      items: items.filter((i) => i.order_id === order.id),
    }));

    res.json(ordersWithItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// POST /api/orders   body: { userId, items: [{id, name, price, quantity}], total }
router.post('/', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { userId, items, total } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Order must contain at least one item' });
    }

    await connection.beginTransaction();

    const [orderResult] = await connection.query(
      'INSERT INTO orders (user_id, total, status) VALUES (?, ?, "pending")',
      [userId || null, total]
    );
    const orderId = orderResult.insertId;

    for (const item of items) {
      await connection.query(
        'INSERT INTO order_items (order_id, product_id, product_name, price, quantity) VALUES (?, ?, ?, ?, ?)',
        [orderId, item.id || null, item.name, item.price, item.quantity]
      );
    }

    await connection.commit();
    res.status(201).json({ id: orderId, userId, total, status: 'pending', items });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ error: 'Failed to create order' });
  } finally {
    connection.release();
  }
});

// PUT /api/orders/:id  body: { status: 'completed' | 'cancelled' | 'pending' }
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const [result] = await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Order not found' });
    res.json({ message: 'Order status updated', id: Number(req.params.id), status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

module.exports = router;
