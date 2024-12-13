import * as SQLite from 'expo-sqlite';

let db;

export const initDB = async () => {
  db = await SQLite.openDatabaseAsync('cart.db');
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS cart (
      id INTEGER PRIMARY KEY,
      product_id INTEGER UNIQUE,
      quantity INTEGER
    );
  `);
  console.log('Database initialized');
};

export const addToCart = async (productId) => {
  await initDB();
  const result = await db.runAsync(
    'INSERT OR REPLACE INTO cart (product_id, quantity) VALUES (?, ?) ON CONFLICT(product_id) DO UPDATE SET quantity = quantity + 1',
    productId,
    1
  );
  console.log('Added/Updated product to cart:', result);
};

export const getCartItems = async () => {
  await initDB();
  const result = await db.getAllAsync('SELECT * FROM cart');
  console.log('Fetched cart items:', result);
  return result;
};

export const removeFromCart = async (productId) => {
  await initDB();
  const result = await db.runAsync('DELETE FROM cart WHERE product_id = ?', productId);
  console.log('Removed product from cart:', result);
};

export const clearCart = async () => {
  await initDB();
  const result = await db.runAsync('DELETE FROM cart');
  console.log('Cleared cart:', result);
};