const express = require('express');
const cors = require('cors');
const db = require('./config/database');

const pacientesRoutes = require('./routes/pacientesRoutes');
const citasRoutes = require('./routes/citasRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const historialRoutes = require('./routes/historialRoutes');

const app = express();
const PORT = process.env.PORT || 3000; // ← fix crítico

app.use(cors({
  origin: process.env.FRONTEND_URL || '*'
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('CRM Odontológico funcionando 🚀');
});

app.use('/pacientes', pacientesRoutes);
app.use('/citas', citasRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/dashboard', dashboardRoutes); 
app.use('/historial', historialRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

