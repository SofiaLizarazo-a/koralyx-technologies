
import { createContext, useState, useEffect } from 'react';

export const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);

  // Aplicar tamaño de letra a toda la página
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  // Activar o desactivar alto contraste
  useEffect(() => {
    document.body.classList.toggle('high-contrast', highContrast);

    return () => {
      document.body.classList.remove('high-contrast');
    };
  }, [highContrast]);

  // Aumentar tamaño de letra
  const increaseFont = () => {
    setFontSize((previous) =>
      previous < 24 ? previous + 2 : previous
    );
  };

  // Disminuir tamaño de letra
  const decreaseFont = () => {
    setFontSize((previous) =>
      previous > 12 ? previous - 2 : previous
    );
  };

  // Activar o desactivar contraste
  const toggleContrast = () => {
    setHighContrast((previous) => !previous);
  };

  // Restaurar configuración
  const resetAccessibility = () => {
    setFontSize(16);
    setHighContrast(false);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        highContrast,
        increaseFont,
        decreaseFont,
        toggleContrast,
        resetAccessibility
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};
