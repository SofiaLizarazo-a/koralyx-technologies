import { useState, useContext } from 'react';
import HeroSlider from '../components/HeroSlider';
import About from "../components/AboutAccordion";
import Location from '../components/Location';
import { servicios as services } from '../config';
import { CartContext } from '../context/CartContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const empty = { nombre: '', email: '', telefono: '', mensaje: '' };

export default function Home() {
  const { addToCart } = useContext(CartContext);
  const [pqr, setPqr] = useState(empty);
  const [errores, setErrores] = useState({});
  const [exito, setExito] = useState(false);

  const set = (campo) => (e) => setPqr({ ...pqr, [campo]: e.target.value });

  const enviar = async (e) => {
    e.preventDefault();
    const err = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(pqr.email)) err.email = 'Escribe un correo válido, por ejemplo nombre@correo.com';
    if (!/^3[0-9]{9}$/.test(pqr.telefono)) err.telefono = 'El celular debe empezar con 3 y tener 10 dígitos';
    if (pqr.mensaje.trim().length < 10) err.mensaje = 'El mensaje debe tener al menos 10 caracteres';
    setErrores(err);
    setExito(false);
    if (Object.keys(err).length) return;

    // Se envía al backend si está encendido; si no, el formulario igual funciona
    try {
      await fetch(`${API}/api/pqrs`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(pqr) });
    } catch { /* backend apagado */ }
    setExito(true);
    setPqr(empty);
  };

  return (
    <>
      <HeroSlider />
      <About />

      <section id="servicios" className="section section-white">
        <h2 className="section-title">Nuestros <span>servicios</span></h2>
        <p className="section-sub">Soluciones digitales diseñadas para hacer crecer tu negocio.</p>
        <div className="cards">
          {services.map(s => (
            <article key={s.id} className="card">
              <div className="card-bar" />
              <h3>{s.name}</h3>
              <p>{s.desc}</p>
              <p className="price">${s.price.toLocaleString('es-CO')} COP</p>
              <button className="btn-gradient btn-block" onClick={() => addToCart(s)}>Agregar al carrito</button>
            </article>
          ))}
        </div>
      </section>

      <Location />

      <section id="pqr" className="section narrow" style={{ maxWidth: 600 }}>
        <h2 className="section-title">Peticiones, quejas y reclamos</h2>
        <p className="section-sub">Cuéntanos qué pasó y te respondemos por correo.</p>
        {exito && <p className="success" role="status">¡Solicitud enviada! Te escribiremos pronto.</p>}
        <form className="form" onSubmit={enviar} noValidate>
          <div className="field">
            <label htmlFor="nombre">Nombre completo</label>
            <input id="nombre" required value={pqr.nombre} onChange={set('nombre')} />
          </div>
          <div className="field">
            <label htmlFor="email">Correo electrónico</label>
            <input id="email" type="email" required value={pqr.email} onChange={set('email')} aria-invalid={!!errores.email} />
            {errores.email && <span className="error">{errores.email}</span>}
          </div>
          <div className="field">
            <label htmlFor="tel">Celular</label>
            <input id="tel" inputMode="numeric" placeholder="3001234567" required value={pqr.telefono} onChange={set('telefono')} aria-invalid={!!errores.telefono} />
            {errores.telefono && <span className="error">{errores.telefono}</span>}
          </div>
          <div className="field">
            <label htmlFor="msg">Mensaje</label>
            <textarea id="msg" required value={pqr.mensaje} onChange={set('mensaje')} aria-invalid={!!errores.mensaje} />
            {errores.mensaje && <span className="error">{errores.mensaje}</span>}
          </div>
          <button type="submit" className="btn-gradient btn-block">Enviar PQR</button>
        </form>
      </section>

      <section id="privacidad" className="section narrow" style={{ paddingTop: 0 }}>
        <h3 style={{ marginBottom: 8 }}>Política de tratamiento de datos</h3>
        <p style={{ color: 'var(--muted)' }}>
          Los datos que nos compartes en el formulario PQR se usan solo para responder tu solicitud, conforme a la Ley 1581 de 2012.
          Puedes pedir en cualquier momento que los actualicemos o eliminemos.
        </p>
      </section>
    </>
  );
}
