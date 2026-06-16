const mysql = require('mysql2/promise');
require('dotenv').config();

// Connection pool — works with the default XAMPP MySQL setup
// (host: localhost, user: root, no password) out of the box.
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'agricare_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
