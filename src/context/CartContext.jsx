
import { createContext, useState, useRef, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState('');
  const timer = useRef(null);

  // Mostrar notificaciones
  const notify = (msg) => {
    setToast(msg);

    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      setToast('');
    }, 2500);
  };

  // Agregar productos
  const addToCart = (product) => {
    if (!product || product.id == null || !product.name) {
      notify('No se pudo agregar el producto');
      return;
    }

    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);

      return found
        ? prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prev, { ...product, quantity: 1 }];
    });

    notify(`${product.name} se agregó al carrito`);
  };

  // Eliminar un producto
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    notify('Producto eliminado del carrito');
  };

  // Cambiar la cantidad de un producto
  const updateQuantity = (id, quantity) => {
    const nuevaCantidad = Number(quantity);

    if (!Number.isInteger(nuevaCantidad)) return;

    if (nuevaCantidad <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: nuevaCantidad }
          : item
      )
    );
  };

  // Vaciar carrito
  const clearCart = () => {
    setCart([]);
    notify('El carrito se ha vaciado');
  };

  // Calcular subtotal de cada producto
  const getSubtotal = (product) => {
    return Number(product.price || 0) * product.quantity;
  };

  // Calcular total de la compra
  const total = cart.reduce(
    (sum, item) => sum + getSubtotal(item),
    0
  );

  // Cantidad total de unidades
  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // Limpiar temporizador al desmontar el componente
  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        toast,
        total,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getSubtotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
