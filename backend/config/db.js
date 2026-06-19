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

// Test the connection once at startup so a misconfigured DB fails loudly
// in the terminal instead of as a silent 500 on every single API call.
(async () => {
  try {
    const connection = await pool.getConnection();
    await connection.query('SELECT 1');
    connection.release();
    console.log('✅ Connected to MySQL database:', process.env.DB_NAME || 'agricare_db');
  } catch (err) {
    console.error('❌ Could not connect to MySQL. The API will return 500 on every request until this is fixed.');
    console.error('   Reason:', err.code || err.message);
    if (err.code === 'ECONNREFUSED') {
      console.error('   → MySQL does not appear to be running. Start it from the XAMPP control panel.');
    } else if (err.code === 'ER_BAD_DB_ERROR') {
      console.error('   → The database "' + (process.env.DB_NAME || 'agricare_db') + '" does not exist yet.');
      console.error('     Import database/agricare_db.sql in phpMyAdmin first.');
    } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('   → Wrong MySQL username/password. Check backend/.env (DB_USER, DB_PASSWORD).');
    }
  }
})();

module.exports = pool;