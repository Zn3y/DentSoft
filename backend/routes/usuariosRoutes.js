const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const autenticar = require('../middlewares/auth');

router.post('/register', usuariosController.registrarUsuario);
router.post('/login', usuariosController.loginUsuario);
router.get('/doctores', autenticar, usuariosController.obtenerDoctores);
router.get('/todos', autenticar, usuariosController.obtenerTodos);     
router.delete('/:id', autenticar, usuariosController.eliminarUsuario);
router.put('/:id', autenticar, usuariosController.actualizarUsuario);

module.exports = router;