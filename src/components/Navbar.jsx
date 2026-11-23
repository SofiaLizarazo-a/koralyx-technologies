import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaTextHeight, FaAdjust, FaSearchMinus, FaUserShield, FaBars, FaTimes } from 'react-icons/fa';
import { AccessibilityContext } from '../context/AccessibilityContext';
import { CartContext } from '../context/CartContext';
import logo from '../assets/logo-koralyx.jpeg';

export default function Navbar() {
  const { increaseFont, decreaseFont, toggleContrast } = useContext(AccessibilityContext);
  const { cart } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const totalItems = cart.reduce((acc, i) => acc + i.quantity, 0);
  const close = () => setOpen(false);

  return (
    <nav className="nav" aria-label="Principal">
      <div className="nav-inner">
        <Link to="/" className="brand" onClick={close}>
          <img src={logo} alt="Logo de Koralyx" />
          <span>
            <span className="brand-name">KORALYX</span>
            <span className="brand-sub">TECHNOLOGIES</span>
          </span>
        </Link>

        <ul className={`nav-links ${open ? 'open' : ''}`}>
          <li><Link to="/" onClick={close}>Inicio</Link></li>
          <li><Link to="/#nosotras" onClick={close}>Nosotras</Link></li>
          <li><Link to="/#servicios" onClick={close}>Servicios</Link></li>
          <li><Link to="/#ubicacion" onClick={close}>Ubicación</Link></li>
          <li><Link to="/#pqr" onClick={close}>PQR</Link></li>
          <li><Link to="/admin" className="admin-link" onClick={close}><FaUserShield aria-hidden="true" /> Admin</Link></li>
        </ul>

        <div className="nav-tools">
          <div className="a11y" role="group" aria-label="Accesibilidad">
            <button className="icon-btn" onClick={decreaseFont} aria-label="Reducir tamaño de letra" title="Letra más pequeña"><FaSearchMinus size={16} /></button>
            <button className="icon-btn" onClick={increaseFont} aria-label="Aumentar tamaño de letra" title="Letra más grande"><FaTextHeight size={16} /></button>
            <button className="icon-btn" onClick={toggleContrast} aria-label="Activar o desactivar alto contraste" title="Alto contraste"><FaAdjust size={16} /></button>
          </div>
          <Link to="/checkout" className="cart-link" aria-label={`Carrito, ${totalItems} productos`}>
            <FaShoppingCart size={24} aria-hidden="true" />
            {totalItems > 0 && <span className="badge">{totalItems}</span>}
          </Link>
          <button className="icon-btn menu-toggle" onClick={() => setOpen(o => !o)} aria-label="Abrir menú" aria-expanded={open}>
            {open ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
