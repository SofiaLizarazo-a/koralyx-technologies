// ✏️ EDITA AQUÍ los datos reales de Koralyx. Todo el sitio (mapa, chatbot, equipo) lee este archivo.

export const empresa = {
  nombre: 'Koralyx Technologies',
  universidad: 'Universidad Libre',
  semestre: 'sexto semestre',
};

export const ubicacion = {
  lugar: 'Universidad Libre, Sede El Bosque',
  direccion: 'Carrera 70 #53-40, Bogotá', // ← verifica que sea la dirección exacta
  horario: 'Lunes a viernes, 8:00 a. m. a 6:00 p. m.',
  busqueda: 'Universidad Libre Sede El Bosque Popular, Carrera 70 #53-40, Bogotá', // lo que Google Maps va a buscar
};
export const mapaEmbed = `https://www.google.com/maps?q=${encodeURIComponent(ubicacion.busqueda)}&output=embed`;
export const mapaRuta = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ubicacion.busqueda)}`;

export const contacto = { whatsapp: '573001234567' }; // ← pon el WhatsApp real (57 + número)

export const servicios = [
  { id: 1, name: 'Página Web Básica', price: 500000, desc: 'Diseño web responsivo con 4 secciones.' },
  { id: 2, name: 'Aplicación Web Full Stack', price: 2500000, desc: 'Desarrollo frontend y backend con base de datos.' },
  { id: 3, name: 'Mantenimiento Web', price: 200000, desc: 'Actualización y soporte técnico mensual.' },
];

export const equipo = [
  { id: 1, name: 'Laura Sofía Angulo', role: 'Product Owner', phone: '3001112233', bio: 'Define qué construimos y en qué orden.' },
  { id: 2, name: 'Karen Tatiana Linares', role: 'Scrum Master', phone: '3002223344', bio: 'Cuida el ritmo y la comunicación del equipo.' },
  { id: 3, name: 'Ana Sofia Lizarazo', role: 'Dev Frontend', phone: '3003334455', bio: 'Construye todo lo que ves en pantalla.' },
  { id: 4, name: 'Brianna Serrato', role: 'Dev Backend', phone: '3004445566', bio: 'Maneja la API y los datos que hay detrás.' },
];