import { useState, useEffect } from 'react';

const images = [
  'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent(c => (c + 1) % images.length), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero" aria-label="Presentación">
      {images.map((src, i) => (
        <img key={src} src={src} alt="" className={`hero-img ${i === current ? 'active' : ''}`} />
      ))}
      <div className="hero-overlay">
        <div className="hero-card">
          <h1 className="hero-title">Transformación digital <span>a tu medida</span></h1>
          <p className="hero-sub">Soluciones web y software innovadoras para potenciar tu empresa.</p>
          <a href="#servicios" className="btn-gradient">Descubre nuestros servicios</a>
        </div>
      </div>
      <div className="hero-dots">
        {images.map((_, i) => (
          <button key={i} className={i === current ? 'on' : ''} onClick={() => setCurrent(i)} aria-label={`Ver imagen ${i + 1}`} />
        ))}
      </div>
    </section>
  );
}
