const express = require('express');
const router = express.Router();
const pacientesController = require('../controllers/pacientesController');
const autenticar = require('../middlewares/auth');

router.get('/', autenticar, pacientesController.obtenerPacientes);
router.post('/', autenticar, pacientesController.crearPaciente);
router.put('/:id', autenticar, pacientesController.actualizarPaciente);
router.delete('/:id', autenticar, pacientesController.eliminarPaciente);

module.exports = router;
