import { useState } from 'react';
import { empresa, equipo } from '../config';

const tabs = [
  { id: 'quienes', label: 'Quiénes somos', text: `Somos un equipo de mujeres, estudiantes de ${empresa.semestre} de la ${empresa.universidad}. Convertimos un proyecto académico en una propuesta real de soluciones digitales: trabajamos por roles y por entregas cortas, como lo hacen los equipos de software de verdad.` },
  { id: 'mision', label: 'Misión', text: 'Brindar asesoría y desarrollar soluciones digitales personalizadas para personas, emprendimientos y empresas que buscan fortalecer su presencia en internet.' },
  { id: 'vision', label: 'Visión', text: 'Para el año 2030, ser reconocida por ofrecer soluciones digitales innovadoras y de calidad, destacándose por el desarrollo de plataformas web integrales.' },
  { id: 'objetivos', label: 'Objetivos', text: 'Desarrollar e implementar soluciones digitales integrales que permitan optimizar procesos mediante el uso de tecnologías frontend, backend y bases de datos.' },
  { id: 'valores', label: 'Valores', text: 'Compromiso con cada entrega, creatividad para resolver, trabajo en equipo y una comunicación clara con quien confía en nosotras.' },
];

export default function About() {
  const [active, setActive] = useState('quienes');
  const current = tabs.find(t => t.id === active);

  return (
    <section id="nosotras" className="section about">
      <h2 className="section-title">Nosotras</h2>
      <p className="section-sub">Estudiantes de la {empresa.universidad}, desarrollando tecnología con propósito.</p>

      <div className="tabs" role="tablist" aria-label="Información de Koralyx">
        {tabs.map(t => (
          <button key={t.id} role="tab" id={`tab-${t.id}`} aria-selected={active === t.id} aria-controls="tab-panel"
            className={`tab ${active === t.id ? 'on' : ''}`} onClick={() => setActive(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      <p className="tab-panel" id="tab-panel" role="tabpanel" aria-labelledby={`tab-${active}`}>{current.text}</p>

      <h3 className="team-title">El equipo</h3>
      <div className="team">
        {equipo.map(m => (
          <article key={m.id} className="member">
            <div className="avatar" aria-hidden="true">{m.name.charAt(0)}</div>
            <h4>{m.name}</h4>
            <p className="role">{m.role}</p>
            <p className="bio">{m.bio}</p>
          </article>
        ))}
      </div>
    </section>
  );
}