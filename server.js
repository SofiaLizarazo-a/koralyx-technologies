// Backend Express. Ejecutar con: node server.cjs  (.cjs porque Vite usa "type": "module")
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const developers = [
  { id: 1, name: 'Laura Sofía Angulo', role: 'Product Owner', phone: '3001112233' },
  { id: 2, name: 'Karen Tatiana Linares', role: 'Scrum Master', phone: '3002223344' },
  { id: 3, name: 'Ana Sofia Lizarazo', role: 'Dev Frontend', phone: '3003334455' },
  { id: 4, name: 'Brianna Serrato', role: 'Dev Backend', phone: '3004445566' },
];
const pqrs = [];

app.get('/api/developers', (req, res) => res.json(developers));

app.post('/api/developers', (req, res) => {
  const { name, role, phone } = req.body;
  if (!name || !role) return res.status(400).json({ error: 'name y role son obligatorios' });
  const dev = { id: Date.now(), name, role, phone };
  developers.push(dev);
  res.status(201).json(dev);
});

app.get('/api/pqrs', (req, res) => res.json(pqrs));

app.post('/api/pqrs', (req, res) => {
  const { nombre, email, telefono, mensaje } = req.body;
  if (!nombre || !email || !telefono || !mensaje) return res.status(400).json({ error: 'Faltan campos' });
  const pqr = { id: Date.now(), nombre, email, telefono, mensaje, fecha: new Date().toISOString() };
  pqrs.push(pqr);
  res.status(201).json(pqr);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend Koralyx en http://localhost:${PORT}`));
