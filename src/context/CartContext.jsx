import { createContext, useState, useRef } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState('');
  const timer = useRef();

  const notify = (msg) => {
    setToast(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(''), 2500);
  };

  const addToCart = (product) => {
    setCart(prev => {
      const found = prev.find(i => i.id === product.id);
      return found
        ? prev.map(i => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i))
        : [...prev, { ...product, quantity: 1 }];
    });
    notify(`${product.name} se agregó al carrito`);
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart, toast }}>
      {children}
    </CartContext.Provider>
  );
};
