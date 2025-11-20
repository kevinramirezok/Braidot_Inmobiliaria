import express from 'express';
import cors from 'cors';
import properties from './properties.js';
import reservations from './reservations.js';

const app = express();
app.use(cors());
app.use(express.json());

// Propiedades
app.get('/api/properties', (req, res) => {
  res.json(properties);
});

// Reservas: obtener por propiedad
app.get('/api/reservations/:propertyId', (req, res) => {
  const propertyId = Number(req.params.propertyId);
  const result = reservations.filter(r => r.propertyId === propertyId);
  res.json(result);
});

// Crear nueva reserva
app.post('/api/reservations', (req, res) => {
  const { propertyId, startDate, endDate, client } = req.body;
  // Verificar disponibilidad (simplificado)
  const overlap = reservations.some(r => r.propertyId === propertyId && r.status !== 'cancelled' && (
    (startDate <= r.endDate && endDate >= r.startDate)
  ));
  if (overlap) {
    return res.status(409).json({ success: false, message: 'Fechas no disponibles' });
  }
  const newReservation = {
    id: reservations.length + 1,
    propertyId,
    startDate,
    endDate,
    client,
    status: 'pending',
    notes: '',
    createdAt: new Date().toISOString().slice(0,10)
  };
  reservations.push(newReservation);
  res.json({ success: true, reservation: newReservation });
});

// Actualizar estado de reserva (confirmar, rechazar, cancelar)
app.patch('/api/reservations/:id', (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;
  const reservation = reservations.find(r => r.id === id);
  if (!reservation) return res.status(404).json({ success: false, message: 'Reserva no encontrada' });
  reservation.status = status;
  res.json({ success: true, reservation });
});

// Bloquear días manualmente
app.post('/api/block-days', (req, res) => {
  const { propertyId, startDate, endDate, reason } = req.body;
  const newBlock = {
    id: reservations.length + 1,
    propertyId,
    startDate,
    endDate,
    client: null,
    status: 'blocked',
    notes: reason || 'Bloqueo manual',
    createdAt: new Date().toISOString().slice(0,10)
  };
  reservations.push(newBlock);
  res.json({ success: true, block: newBlock });
});

// Endpoint para autenticación admin (mock)
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@demo.com' && password === '123456') {
    res.json({ success: true, token: 'demo-token' });
  } else {
    res.status(401).json({ success: false, message: 'Credenciales inválidas' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend inmobiliaria escuchando en puerto ${PORT}`);
});
