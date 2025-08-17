import express from 'express';
import cors from 'cors';
import handler from './api/send-reserva.js';

const app = express();
app.use(cors());
app.use(express.json());
// En cPanel, si la Application URL es /api, la ruta efectiva será /api/send-reserva
app.post('/send-reserva', handler);
// Health check sencillo
app.get('/healthz', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
