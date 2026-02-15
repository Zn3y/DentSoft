const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const autenticar = require('../middlewares/auth');

router.get('/', autenticar, dashboardController.obtenerEstadisticas);
router.get('/graficos', autenticar, dashboardController.estadisticasGraficos)


module.exports = router;
