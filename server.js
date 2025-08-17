import express from 'express';
import cors from 'cors';
import handler from './api/send-reserva.js';

const app = express();
app.use(cors());
app.use(express.json());
// Raíz del app (útil cuando la Application URL es /api)
app.get('/', (req, res) => {
  res.json({ ok: true, service: 'widgetrent-api' });
});
// En cPanel: si la Application URL es /api, la ruta efectiva será /api/send-reserva.
// También exponemos /backend/* para evitar conflictos con carpetas estáticas /api en public_html.
app.post('/send-reserva', handler);
app.post('/backend/send-reserva', handler);
// Permitir prueba rápida vía GET con dryRun=1
app.get('/send-reserva', (req, res) => {
  const q = req.query || {};
  if (q.dryRun === '1' || q.dryRun === 'true') {
    return res.json({ ok: true, mode: 'dry-run', method: 'GET' });
  }
  res.status(405).json({ error: 'Use POST' });
});
// Health check sencillo
app.get('/healthz', (req, res) => res.json({ ok: true }));
app.get('/backend/healthz', (req, res) => res.json({ ok: true }));

// Manejo básico de errores para registrar fallos
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('Express error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
