import React, { createContext, useState } from 'react';
import * as db from './db';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  React.useEffect(() => {
    const initialize = async () => {
      await db.initDB();
      fetchProducts();
      fetchCartItems();
    };
    initialize();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const fetchCartItems = async () => {
    const items = await db.getCartItems();
    console.log('Fetched cart items:', items);
    
    const productDict = {};
    products.forEach(product => {
      productDict[product.id] = product;
    });
  
    setCartItems(
      items.map(item => ({
        ...item,
        product: productDict[item.product_id],
        quantity: item.quantity
      }))
    );
  };

  const addToCart = async (productId) => {
    await db.addToCart(productId);
    fetchCartItems();
  };

  const removeFromCart = async (productId) => {
    await db.removeFromCart(productId);
    fetchCartItems();
  };

  return (
    <StoreContext.Provider value={{
      products,
      cartItems,
      fetchProducts,
      fetchCartItems,
      addToCart,
      removeFromCart
    }}>
      {children}
    </StoreContext.Provider>
  );
};