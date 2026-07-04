import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

const BASE_URL = 'https://gearforge-server-production.up.railway.app/api';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const { user } = useAuth();

  const getHeaders = () => ({
    headers: { Authorization: `Bearer ${user?.token}` },
  });

  const fetchCart = async () => {
    if (!user) {
      setCart(null);
      setCartCount(0);
      return;
    }
    try {
      const { data } = await axios.get(`${BASE_URL}/cart`, getHeaders());
      setCart(data);
      setCartCount(data.items?.length || 0);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    const { data } = await axios.post(
      `${BASE_URL}/cart`,
      { productId, quantity },
      getHeaders()
    );
    setCart(data);
    setCartCount(data.items?.length || 0);
  };

  const updateCartItem = async (itemId, quantity) => {
    const { data } = await axios.put(
      `${BASE_URL}/cart/${itemId}`,
      { quantity },
      getHeaders()
    );
    setCart(data);
    setCartCount(data.items?.length || 0);
  };

  const removeFromCart = async (itemId) => {
    const { data } = await axios.delete(
      `${BASE_URL}/cart/${itemId}`,
      getHeaders()
    );
    setCart(data);
    setCartCount(data.items?.length || 0);
  };

  const clearCart = () => {
    setCart(null);
    setCartCount(0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      cartCount,
      fetchCart,
      addToCart,
      updateCartItem,
      removeFromCart,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);