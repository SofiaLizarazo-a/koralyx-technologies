import { FaMapMarkerAlt, FaClock, FaDirections } from 'react-icons/fa';
import { ubicacion, mapaEmbed, mapaRuta } from '../config';

export default function Location() {
  return (
    <section id="ubicacion" className="section">
      <h2 className="section-title">Encuéntranos</h2>
      <p className="section-sub">Nos reunimos en {ubicacion.lugar}.</p>
      <div className="loc">
        <div className="loc-info">
          <p><FaMapMarkerAlt aria-hidden="true" /> <span><b>{ubicacion.lugar}</b><br />{ubicacion.direccion}</span></p>
          <p><FaClock aria-hidden="true" /> <span>{ubicacion.horario}</span></p>
          <a className="btn-gradient" href={mapaRuta} target="_blank" rel="noreferrer"><FaDirections aria-hidden="true" /> Cómo llegar</a>
        </div>
        <iframe className="loc-map" title={`Mapa de ${ubicacion.lugar}`} src={mapaEmbed} loading="lazy" allowFullScreen />
      </div>
    </section>
  );
}