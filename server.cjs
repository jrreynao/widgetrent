'use strict';

const express = require('express');
const cors = require('cors');
// Cargar módulos ESM desde CJS sin async/await usando esm
let handler;
try {
  const esm = require('esm')(module);
  const mod = esm('./send-reserva.js');
  handler = (mod && (mod.default || mod.handler || mod));
} catch (e) {
  console.error('Error cargando send-reserva.js con esm:', e);
  handler = (req, res) => res.status(500).json({ error: 'Handler no disponible' });
}

const app = express();
app.use(cors());
app.use(express.json());

// Raíz de estado
app.get('/', (req, res) => {
  res.json({ ok: true, service: 'widgetrent-api' });
});

// Rutas API (ambas variantes para evitar conflictos con estáticos)
app.post('/send-reserva', handler);
app.post('/backend/send-reserva', handler);

// GET dry-run rápido
app.get('/send-reserva', (req, res) => {
  const q = req.query || {};
  if (q.dryRun === '1' || q.dryRun === 'true') {
    return res.json({ ok: true, mode: 'dry-run', method: 'GET' });
  }
  res.status(405).json({ error: 'Use POST' });
});

// Health checks
app.get('/healthz', (req, res) => res.json({ ok: true }));
app.get('/backend/healthz', (req, res) => res.json({ ok: true }));

// Manejo básico de errores
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('Express error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Exportar app para LiteSpeed/Passenger
module.exports = app;

// Si se ejecuta directamente (no bajo Passenger), levantar servidor
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
}
