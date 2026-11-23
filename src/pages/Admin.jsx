import { useState, useEffect } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

import { equipo as respaldo } from '../config';

export default function Admin() {
  const [devs, setDevs] = useState(respaldo);
  const [fuente, setFuente] = useState('datos locales');

  useEffect(() => {
    fetch(`${API}/api/developers`)
      .then(r => (r.ok ? r.json() : Promise.reject()))
      .then(data => { setDevs(data); setFuente('API Express'); })
      .catch(() => setFuente('datos locales (el backend está apagado)'));
  }, []);

  return (
    <section className="section" style={{ maxWidth: 1000, margin: '0 auto' }}>
      <h2 className="section-title">Panel administrativo</h2>
      <p className="section-sub" style={{ marginBottom: 8 }}>Equipo de desarrollo Koralyx</p>
      <p className="source">Fuente: {fuente}</p>
      <div className="dev-grid">
        {devs.map(d => (
          <article key={d.id} className="dev-card">
            <div className="avatar" aria-hidden="true">{d.name.charAt(0)}</div>
            <h4>{d.name}</h4>
            <p className="role">{d.role}</p>
            <p className="phone">📞 {d.phone}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
