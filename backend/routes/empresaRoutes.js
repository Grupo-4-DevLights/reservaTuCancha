const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresaController');

router.get('/', empresaController.listarEmpresas);
router.post('/', empresaController.crearEmpresa);
router.get('/:id', empresaController.mostrarEmpresa);
router.put('/:id', empresaController.actualizarEmpresa);
router.delete('/:id', empresaController.eliminarEmpresa);

module.exports = router;
