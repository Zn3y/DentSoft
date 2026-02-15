const express = require('express');
const cors = require('cors');
const db = require('./config/database');

const pacientesRoutes = require('./routes/pacientesRoutes');
const citasRoutes = require('./routes/citasRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes'); // 👈 ESTA LÍNEA

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('CRM Odontológico funcionando 🚀');
});

app.use('/pacientes', pacientesRoutes);
app.use('/citas', citasRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/dashboard', dashboardRoutes); // 👈 Y ESTA

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
