-- ============================================================
-- AgriCare Database
-- Import this file in phpMyAdmin (XAMPP) or via:
--   mysql -u root -p < agricare_db.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS `agricare_db`
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `agricare_db`;

-- ------------------------------------------------------------
-- Table: users
-- NOTE: passwords are stored as plain text here to mirror the
-- original demo. For any real deployment, hash passwords
-- (e.g. with bcrypt) before storing/comparing them.
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('admin','user') NOT NULL DEFAULT 'user',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO `users` (`name`, `email`, `password`, `role`) VALUES
('Admin User', 'admin@agricare.com', 'admin123', 'admin'),
('John Farmer', 'user@example.com', 'user123', 'user');

-- ------------------------------------------------------------
-- Table: products
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `category` ENUM('fertilizers','pesticides','tools','services') NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `description` TEXT,
  `icon` VARCHAR(10) DEFAULT NULL,
  `image` VARCHAR(500) DEFAULT NULL,
  `featured` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO `products` (`name`, `category`, `price`, `description`, `icon`, `image`, `featured`) VALUES
('Organic NPK Fertilizer', 'fertilizers', 45.99, 'Premium organic fertilizer enriched with balanced nitrogen, phosphorus, and potassium for optimal plant growth and soil health.', '🌱', 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400', 1),
('Advanced Nitrogen Booster', 'fertilizers', 38.50, 'Enhanced nitrogen formula designed for lush green growth, perfect for leafy vegetables and lawns.', '🌿', 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400', 0),
('Phosphorus Plus', 'fertilizers', 42.00, 'High phosphorus content promoting robust root development and abundant flowering.', '🌾', 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400', 0),
('Bio-Safe Pesticide', 'pesticides', 52.00, 'Eco-friendly pest control solution that is safe for beneficial insects while effectively eliminating pests.', '🛡️', 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400', 1),
('Insect Control Spray', 'pesticides', 29.99, 'Fast-acting insecticide providing immediate relief from aphids, beetles, and common garden pests.', '🦟', 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=400', 0),
('Fungicide Protection', 'pesticides', 35.50, 'Broad-spectrum fungicide that protects crops from fungal infections and diseases.', '🍄', 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400', 0),
('Professional Pruning Shears', 'tools', 34.99, 'Heavy-duty stainless steel pruning shears with ergonomic design for comfortable, extended use.', '✂️', 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400', 0),
('Irrigation System Kit', 'tools', 149.99, 'Complete drip irrigation setup including timers, hoses, and emitters for efficient water management.', '💧', 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400', 1),
('Digital Soil Meter', 'tools', 24.99, 'Advanced digital pH and moisture meter for precise soil analysis and crop management.', '📊', 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=400', 0),
('Soil Testing Service', 'services', 75.00, 'Comprehensive laboratory soil analysis including pH, nutrients, and contamination testing.', '🔬', 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400', 1),
('Crop Consultation', 'services', 120.00, 'Expert agricultural consultation from certified agronomists, including farm visit and detailed report.', '👨‍🌾', 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400', 0),
('Pest Management Plan', 'services', 150.00, 'Custom integrated pest management strategy with monitoring and treatment recommendations.', '🦗', 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400', 0);

-- ------------------------------------------------------------
-- Table: orders
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT DEFAULT NULL,
  `total` DECIMAL(10,2) NOT NULL,
  `status` ENUM('pending','completed','cancelled') NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Table: order_items
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `order_items`;
CREATE TABLE `order_items` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT NOT NULL,
  `product_id` INT DEFAULT NULL,
  `product_name` VARCHAR(255) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Table: settings (single row, site-wide configuration)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `site_name` VARCHAR(255) NOT NULL DEFAULT 'AgriCare Pharmacy',
  `contact_email` VARCHAR(255) NOT NULL DEFAULT 'support@agricare.com',
  `contact_phone` VARCHAR(50) NOT NULL DEFAULT '+1-800-AGRICARE',
  `currency` VARCHAR(10) NOT NULL DEFAULT 'USD'
) ENGINE=InnoDB;

INSERT INTO `settings` (`site_name`, `contact_email`, `contact_phone`, `currency`) VALUES
('AgriCare Pharmacy', 'support@agricare.com', '+1-800-AGRICARE', 'USD');
