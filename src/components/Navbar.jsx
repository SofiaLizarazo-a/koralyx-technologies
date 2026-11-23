
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  FaShoppingCart,
  FaTextHeight,
  FaAdjust,
  FaSearchMinus,
  FaUserShield,
  FaBars,
  FaTimes,
  FaUndo
} from 'react-icons/fa';

import { AccessibilityContext } from '../context/AccessibilityContext';
import { CartContext } from '../context/CartContext';

import logo from '../assets/logo-koralyx.jpeg';

export default function Navbar() {
  const {
    increaseFont,
    decreaseFont,
    toggleContrast,
    resetAccessibility,
    highContrast
  } = useContext(AccessibilityContext);

  const { cart } = useContext(CartContext);

  const [open, setOpen] = useState(false);

  const totalItems = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const close = () => setOpen(false);

  return (
    <nav className="nav" aria-label="Navegación principal">

      <div className="nav-inner">

        <Link
          to="/"
          className="brand"
          onClick={close}
          aria-label="Koralyx Technologies, inicio"
        >
          <img src={logo} alt="Logo de Koralyx Technologies" />

          <span>
            <span className="brand-name">KORALYX</span>
            <span className="brand-sub">TECHNOLOGIES</span>
          </span>
        </Link>

        <ul className={`nav-links ${open ? 'open' : ''}`}>

          <li>
            <Link to="/" onClick={close}>
              Inicio
            </Link>
          </li>

          <li>
            <Link to="/#nosotras" onClick={close}>
              Nosotras
            </Link>
          </li>

          <li>
            <Link to="/#servicios" onClick={close}>
              Servicios
            </Link>
          </li>

          <li>
            <Link to="/#ubicacion" onClick={close}>
              Ubicación
            </Link>
          </li>

          <li>
            <Link to="/#pqr" onClick={close}>
              PQR
            </Link>
          </li>

          <li>
            <Link
              to="/admin"
              className="admin-link"
              onClick={close}
            >
              <FaUserShield aria-hidden="true" />
              Admin
            </Link>
          </li>

        </ul>

        <div className="nav-tools">

          {/* Herramientas de accesibilidad */}
          <div
            className="a11y"
            role="group"
            aria-label="Herramientas de accesibilidad"
          >

            <button
              type="button"
              className="icon-btn"
              onClick={decreaseFont}
              aria-label="Reducir tamaño de letra"
              title="Reducir letra"
            >
              <FaSearchMinus aria-hidden="true" />
            </button>

            <button
              type="button"
              className="icon-btn"
              onClick={increaseFont}
              aria-label="Aumentar tamaño de letra"
              title="Aumentar letra"
            >
              <FaTextHeight aria-hidden="true" />
            </button>

            <button
              type="button"
              className="icon-btn"
              onClick={toggleContrast}
              aria-label={
                highContrast
                  ? 'Desactivar alto contraste'
                  : 'Activar alto contraste'
              }
              aria-pressed={highContrast}
              title="Alto contraste"
            >
              <FaAdjust aria-hidden="true" />
            </button>

            <button
              type="button"
              className="icon-btn"
              onClick={resetAccessibility}
              aria-label="Restablecer accesibilidad"
              title="Restablecer configuración"
            >
              <FaUndo aria-hidden="true" />
            </button>

          </div>

          {/* Carrito */}
          <Link
            to="/checkout"
            className="cart-link"
            aria-label={`Carrito, ${totalItems} productos`}
          >
            <FaShoppingCart size={24} aria-hidden="true" />

            {totalItems > 0 && (
              <span className="badge" aria-live="polite">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Menú para dispositivos móviles */}
          <button
            type="button"
            className="icon-btn menu-toggle"
            onClick={() => setOpen((previous) => !previous)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="menu-principal"
          >
            {open
              ? <FaTimes size={22} aria-hidden="true" />
              : <FaBars size={22} aria-hidden="true" />
            }
          </button>

        </div>

      </div>
    </nav>
  );
}
