const express = require('express');
const router = express.Router();
const canchaController = require('../controllers/canchaController');

router.get('/', canchaController.listarCanchas);
router.post('/', canchaController.crearCancha);
router.get('/:id', canchaController.mostrarCancha);
router.put('/:id', canchaController.actualizarCancha);
router.delete('/:id', canchaController.eliminarCancha);

//verificar canchas disponibles
router.get('/disponibles/:id', canchaController.disponibilidadCancha);

module.exports = router;
