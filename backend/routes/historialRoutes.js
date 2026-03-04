const express = require('express');
const router = express.Router();
const historialController = require('../controllers/historialController');
const autenticar = require('../middlewares/auth');

router.get('/:paciente_id', autenticar, historialController.obtenerHistorial);
router.post('/:paciente_id', autenticar, historialController.crearHistorial);
router.delete('/:id', autenticar, historialController.eliminarHistorial);
router.put('/registro/:id', autenticar, historialController.actualizarHistorial);


module.exports = router;