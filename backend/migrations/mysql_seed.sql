CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  category VARCHAR(100),
  short_desc VARCHAR(255),
  long_desc TEXT,
  price DECIMAL(10,2),
  image_url VARCHAR(300),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS enquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO products (name, category, short_desc, long_desc, price, image_url)
VALUES
('Wireless Headphones', 'Electronics', '20h battery life', 'High quality wireless headset.', 79.99, 'https://via.placeholder.com/400x300'),
('Smart Speaker', 'Electronics', 'Voice assistant', 'Compact smart speaker.', 49.99, 'https://via.placeholder.com/400x300'),
('Water Bottle', 'Accessories', 'Steel bottle', '24h cold water.', 19.99, 'https://via.placeholder.com/400x300');
