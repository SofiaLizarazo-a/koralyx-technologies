import { createContext, useState, useEffect } from 'react';

export const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);

  // El tamaño se cambia en la raíz para que todo (rem incluido) escale
  useEffect(() => { document.documentElement.style.fontSize = `${fontSize}px`; }, [fontSize]);
  useEffect(() => { document.body.classList.toggle('high-contrast', highContrast); }, [highContrast]);

  const increaseFont = () => setFontSize(p => (p < 24 ? p + 2 : p));
  const decreaseFont = () => setFontSize(p => (p > 12 ? p - 2 : p));
  const toggleContrast = () => setHighContrast(h => !h);

  return (
    <AccessibilityContext.Provider value={{ fontSize, highContrast, increaseFont, decreaseFont, toggleContrast }}>
      {children}
    </AccessibilityContext.Provider>
  );
};
