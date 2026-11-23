import { Link } from 'react-router-dom';
import { ubicacion, mapaEmbed, contacto } from '../config';
import { FaInstagram, FaFacebook, FaWhatsapp, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-col">
          <h3>KORALYX TECHNOLOGIES</h3>
          <p>Desarrollo de software y prestación de servicios tecnológicos.</p>
          <div className="social">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebook /></a>
            <a href={`https://wa.me/${contacto.whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Ubicación</h4>
          <p style={{ marginBottom: 10 }}>{ubicacion.lugar}<br />{ubicacion.direccion}</p>
          <iframe title={`Mapa de ${ubicacion.lugar}`} loading="lazy" allowFullScreen
            src={mapaEmbed} />
        </div>
        <div className="footer-col">
          <h4>Enlaces legales</h4>
          <ul>
            <li><Link to="/#privacidad">Política de tratamiento de datos</Link></li>
            <li><Link to="/#pqr">Atención al cliente (PQR)</Link></li>
          </ul>
        </div>
      </div>
      <p className="copy">© 2026 Koralyx Technologies S.A.S. Todos los derechos reservados.</p>
    </footer>
  );
}
