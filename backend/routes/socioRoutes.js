
const express = require('express');
const router = express.Router();
const {reservarCancha,VisualizarReservas,eliminarReserva } = require('../controllers/socioController');

router.post('/', reservarCancha);
router.get('/misreservas/:id_usuario',VisualizarReservas)
router.put('/misreservas/eliminar/:id_usuario/:id_reserva',eliminarReserva)





module.exports = router;