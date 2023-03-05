var express = require('express');
var router = express.Router();
var usuarioController = require('../controllers/usuarioController');


router.get('/', usuarioController.listarUsuarios);
router.post('/', usuarioController.crearUsuario);
router.get('/:id', usuarioController.mostrarUsuario);
router.put('/:id', usuarioController.actualizarUsuario);
router.delete('/:id', usuarioController.eliminarUsuario);

module.exports = router;