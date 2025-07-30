import express from 'express';
import cors from 'cors';
import handler from './api/send-reserva.js';

const app = express();
app.use(cors());
app.use(express.json());
app.post('/api/send-reserva', handler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
