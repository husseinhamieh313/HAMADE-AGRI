const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const pool = require('./config/db');

app.use(cors());
app.use(express.json());

app.use('/api/products', require('./routes/products'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/testimonials', require('./routes/testimonials'));

// Health check that actually verifies the database connection,
// instead of just confirming the Node process is alive.
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (err) {
    res.status(500).json({ status: 'error', database: 'disconnected', reason: err.code || err.message });
  }
});

app.listen(PORT, () => {
  console.log(`AgriCare API running on http://localhost:${PORT}`);
});