# AgriCare — React + Node.js + MySQL

A full-stack rebuild of the AgriCare storefront and admin dashboard:
- **frontend/** — React (Vite) single-page app, ported 1:1 from the original HTML/CSS design
- **backend/** — Node.js + Express REST API
- **database/** — MySQL schema + seed data (`agricare_db.sql`) for XAMPP/phpMyAdmin

## 1. Database setup (XAMPP)

1. Start Apache and MySQL from the XAMPP control panel.
2. Open phpMyAdmin (`http://localhost/phpmyadmin`).
3. Click **Import**, choose `database/agricare_db.sql`, and click **Go**.
   This creates the `agricare_db` database with all tables and seed data (12 products, an admin user, and a regular user).

   Alternatively, from a terminal:
   ```bash
   mysql -u root -p < database/agricare_db.sql
   ```

Seed login credentials:
- Admin: `admin@agricare.com` / `admin123`
- User: `user@example.com` / `user123`

## 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env   # adjust DB_USER / DB_PASSWORD if your MySQL isn't the XAMPP default
npm run dev             # or: npm start
```

The API runs at `http://localhost:5006`. Health check: `GET /api/health`.

## 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:7000` and proxies `/api/*` calls to the backend (see `vite.config.js`).

## Notes

- The cart is kept client-side (in `localStorage`) until checkout, at which point an order is created via `POST /api/orders` and persisted to MySQL.
- Passwords are stored in plain text in the database to mirror the original demo's behavior. For any real deployment, hash passwords (e.g. with `bcrypt`) before storing or comparing them, and move authentication to signed sessions/JWTs instead of trusting the client-stored user object.
- Admin login automatically redirects to `/admin`; non-admin accounts stay on the storefront.
