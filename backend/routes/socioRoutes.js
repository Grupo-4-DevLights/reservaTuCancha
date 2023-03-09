
const express = require('express');
const router = express.Router();
const {reservarCancha,VisualizarReservas } = require('../controllers/socioController');

router.post('/', reservarCancha);
router.get('/misreservas/:id_usuario', VisualizarReservas);




module.exports = router;