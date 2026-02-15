const express = require('express');
const router = express.Router();
const citasController = require('../controllers/citasController');
const autenticar = require('../middlewares/auth');

router.get('/', autenticar, citasController.obtenerCitas);
router.post('/', autenticar, citasController.crearCita);
router.put('/:id', autenticar, citasController.actualizarCita);
router.delete('/:id', autenticar, citasController.eliminarCita);

module.exports = router;
