import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { empresa, ubicacion, contacto, servicios, equipo } from '../config';

const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const cop = (n) => `$${n.toLocaleString('es-CO')} COP`;

const chips = ['Servicios', 'Precios', 'Equipo', 'Ubicación', 'WhatsApp', 'PQR'];

// Cada intención: palabras clave → respuesta (puede incluir un enlace a una sección)
const intents = [
  { k: ['hola', 'buenas', 'hey', 'buenos dias', 'buenas tardes'], r: (n) => ({ text: `¡Hola${n ? `, ${n}` : ''}! 💜 Puedo contarte de nuestros servicios, precios, el equipo o cómo llegar.` }) },
  { k: ['precio', 'costo', 'cuanto', 'valor', 'cotiz'], r: () => ({ text: servicios.map(s => `• ${s.name}: ${cop(s.price)}`).join('\n'), link: { to: '/#servicios', label: 'Ver servicios' } }) },
  { k: ['servicio', 'ofrecen', 'hacen', 'que hacen', 'pagina web', 'app'], r: () => ({ text: `Ofrecemos ${servicios.map(s => s.name.toLowerCase()).join(', ')}.`, link: { to: '/#servicios', label: 'Ver servicios' } }) },
  { k: ['equipo', 'quienes', 'integrantes', 'nosotras', 'chicas', 'quien'], r: () => ({ text: `Somos ${equipo.length} estudiantes de ${empresa.semestre} de la ${empresa.universidad}: ${equipo.map(m => `${m.name.split(' ')[0]} (${m.role})`).join(', ')}.`, link: { to: '/#nosotras', label: 'Conocer al equipo' } }) },
  { k: ['ubicacion', 'donde', 'direccion', 'llegar', 'mapa', 'sede'], r: () => ({ text: `Estamos en ${ubicacion.lugar}, ${ubicacion.direccion}.`, link: { to: '/#ubicacion', label: 'Ver el mapa' } }) },
  { k: ['horario', 'hora', 'atienden', 'abierto'], r: () => ({ text: `Atendemos ${ubicacion.horario.toLowerCase()}.` }) },
  { k: ['whatsapp', 'contacto', 'telefono', 'celular', 'llamar', 'escribir'], r: () => ({ text: 'Escríbenos por WhatsApp y te respondemos lo antes posible.', ext: { href: `https://wa.me/${contacto.whatsapp}`, label: 'Abrir WhatsApp' } }) },
  { k: ['pqr', 'queja', 'reclamo', 'peticion', 'problema'], r: () => ({ text: 'Lamento el inconveniente. Cuéntanos qué pasó en el formulario de PQR y te respondemos por correo.', link: { to: '/#pqr', label: 'Ir al formulario' } }) },
  { k: ['carrito', 'pagar', 'pago', 'comprar'], r: () => ({ text: 'Agrega un servicio al carrito y págalo desde la pasarela (es de prueba, no se cobra).', link: { to: '/checkout', label: 'Ir al carrito' } }) },
  { k: ['letra', 'contraste', 'accesib'], r: () => ({ text: 'Arriba, junto al carrito, hay 3 botones: letra más pequeña, más grande y alto contraste.' }) },
  { k: ['gracias', 'genial', 'perfecto'], r: (n) => ({ text: `¡Con gusto${n ? `, ${n}` : ''}! Aquí sigo si necesitas algo más. ✨` }) },
  { k: ['adios', 'chao', 'hasta luego'], r: (n) => ({ text: `¡Hasta pronto${n ? `, ${n}` : ''}! Que te vaya superbién. 💜` }) },
];

const answer = (text, nombre) => {
  const t = norm(text);
  const hit = intents.find(i => i.k.some(w => t.includes(w)));
  return hit ? hit.r(nombre) : { text: `Mmm, eso aún no lo sé${nombre ? `, ${nombre}` : ''}. Prueba con uno de los botones o escribe "servicios", "precios" o "equipo".` };
};

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [esperaNombre, setEsperaNombre] = useState(true);
  const [escribiendo, setEscribiendo] = useState(false);
  const [messages, setMessages] = useState([{ sender: 'bot', text: `¡Hola! Soy Kora 🌸, la asistente de ${empresa.nombre}. ¿Cómo te llamas?` }]);
  const [input, setInput] = useState('');
  const logRef = useRef();

  useEffect(() => { logRef.current?.scrollTo({ top: logRef.current.scrollHeight }); }, [messages, escribiendo, open]);

  const botSays = (msg) => {
    setEscribiendo(true);
    setTimeout(() => { setEscribiendo(false); setMessages(m => [...m, { sender: 'bot', ...msg }]); }, 700);
  };

  const send = (raw) => {
    const text = raw.trim();
    if (!text) return;
    setMessages(m => [...m, { sender: 'user', text }]);
    setInput('');
    if (esperaNombre) {
      const n = text.replace(/^(me llamo|soy|mi nombre es)\s+/i, '').split(' ')[0];
      const limpio = n.charAt(0).toUpperCase() + n.slice(1);
      setNombre(limpio);
      setEsperaNombre(false);
      botSays({ text: `¡Mucho gusto, ${limpio}! 💜 ¿En qué te ayudo hoy?` });
    } else botSays(answer(text, nombre));
  };

  return (
    <div className="chat">
      <button className="chat-fab" onClick={() => setOpen(o => !o)} aria-label={open ? 'Cerrar chat' : 'Abrir chat con Kora'} aria-expanded={open}>🌸</button>
      {open && (
        <div className="chat-box" role="dialog" aria-label="Asistente virtual Kora">
          <div className="chat-head">Kora · Asistente de Koralyx<small>{escribiendo ? 'escribiendo…' : 'en línea'}</small></div>
          <div className="chat-log" ref={logRef} aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.sender}`}>
                <span style={{ whiteSpace: 'pre-line' }}>{m.text}</span>
                {m.link && <Link className="msg-link" to={m.link.to} onClick={() => setOpen(false)}>{m.link.label}</Link>}
                {m.ext && <a className="msg-link" href={m.ext.href} target="_blank" rel="noreferrer">{m.ext.label}</a>}
              </div>
            ))}
            {escribiendo && <div className="msg bot typing" aria-hidden="true"><i /><i /><i /></div>}
          </div>
          {!esperaNombre && (
            <div className="chips">{chips.map(c => <button key={c} onClick={() => send(c)}>{c}</button>)}</div>
          )}
          <form className="chat-form" onSubmit={(e) => { e.preventDefault(); send(input); }}>
            <input value={input} onChange={e => setInput(e.target.value)} placeholder={esperaNombre ? 'Escribe tu nombre' : 'Escribe tu mensaje'} aria-label="Mensaje" />
            <button type="submit">Enviar</button>
          </form>
        </div>
      )}
    </div>
  );
}
