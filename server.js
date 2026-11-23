
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// ==========================================
// DATOS TEMPORALES
// ==========================================

let developers = [
  { id: 1, name: 'Laura Sofía Angulo', role: 'Product Owner', phone: '3001112233' },
  { id: 2, name: 'Karen Tatiana Linares', role: 'Scrum Master', phone: '3002223344' },
  { id: 3, name: 'Ana Sofia Lizarazo', role: 'Dev Frontend', phone: '3003334455' },
  { id: 4, name: 'Brianna Serrato', role: 'Dev Backend', phone: '3004445566' },
];

let pqrs = [];

// ==========================================
// CRUD DE DESARROLLADORES
// ==========================================

// CONSULTAR TODOS
app.get('/api/developers', (req, res) => {
  res.json(developers);
});

// CONSULTAR UNO
app.get('/api/developers/:id', (req, res) => {
  const dev = developers.find(
    d => d.id === Number(req.params.id)
  );

  if (!dev) {
    return res.status(404).json({
      error: 'Desarrollador no encontrado'
    });
  }

  res.json(dev);
});

// REGISTRAR
app.post('/api/developers', (req, res) => {
  const { name, role, phone } = req.body;

  if (!name?.trim() || !role?.trim()) {
    return res.status(400).json({
      error: 'El nombre y el cargo son obligatorios'
    });
  }

  const dev = {
    id: Date.now(),
    name: name.trim(),
    role: role.trim(),
    phone: phone || ''
  };

  developers.push(dev);

  res.status(201).json(dev);
});

// ACTUALIZAR
app.put('/api/developers/:id', (req, res) => {
  const index = developers.findIndex(
    d => d.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      error: 'Desarrollador no encontrado'
    });
  }

  const { name, role, phone } = req.body;

  if (!name?.trim() || !role?.trim()) {
    return res.status(400).json({
      error: 'El nombre y el cargo son obligatorios'
    });
  }

  developers[index] = {
    ...developers[index],
    name: name.trim(),
    role: role.trim(),
    phone: phone || ''
  };

  res.json(developers[index]);
});

// ELIMINAR
app.delete('/api/developers/:id', (req, res) => {
  const index = developers.findIndex(
    d => d.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      error: 'Desarrollador no encontrado'
    });
  }

  developers.splice(index, 1);

  res.json({
    message: 'Desarrollador eliminado correctamente'
  });
});

// ==========================================
// CRUD DE PQR
// ==========================================

// CONSULTAR TODAS
app.get('/api/pqrs', (req, res) => {
  res.json(pqrs);
});

// CONSULTAR UNA
app.get('/api/pqrs/:id', (req, res) => {
  const pqr = pqrs.find(
    p => p.id === Number(req.params.id)
  );

  if (!pqr) {
    return res.status(404).json({
      error: 'PQR no encontrada'
    });
  }

  res.json(pqr);
});

// REGISTRAR
app.post('/api/pqrs', (req, res) => {
  const { nombre, email, telefono, mensaje } = req.body;

  if (
    !nombre?.trim() ||
    !email?.trim() ||
    !telefono?.trim() ||
    !mensaje?.trim()
  ) {
    return res.status(400).json({
      error: 'Todos los campos son obligatorios'
    });
  }

  const pqr = {
    id: Date.now(),
    nombre: nombre.trim(),
    email: email.trim(),
    telefono: telefono.trim(),
    mensaje: mensaje.trim(),
    fecha: new Date().toISOString()
  };

  pqrs.push(pqr);

  res.status(201).json(pqr);
});

// ACTUALIZAR
app.put('/api/pqrs/:id', (req, res) => {
  const index = pqrs.findIndex(
    p => p.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      error: 'PQR no encontrada'
    });
  }

  const { nombre, email, telefono, mensaje } = req.body;

  if (
    !nombre?.trim() ||
    !email?.trim() ||
    !telefono?.trim() ||
    !mensaje?.trim()
  ) {
    return res.status(400).json({
      error: 'Todos los campos son obligatorios'
    });
  }

  pqrs[index] = {
    ...pqrs[index],
    nombre: nombre.trim(),
    email: email.trim(),
    telefono: telefono.trim(),
    mensaje: mensaje.trim()
  };

  res.json(pqrs[index]);
});

// ELIMINAR
app.delete('/api/pqrs/:id', (req, res) => {
  const index = pqrs.findIndex(
    p => p.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      error: 'PQR no encontrada'
    });
  }

  pqrs.splice(index, 1);

  res.json({
    message: 'PQR eliminada correctamente'
  });
});

// ==========================================
// INICIAR SERVIDOR
// ==========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend Koralyx funcionando en puerto ${PORT}`);
});
