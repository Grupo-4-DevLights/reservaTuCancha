
const express = require('express');
const router = express.Router();
const {reservarCancha,VisualizarReservas,eliminarReserva,visualizarReservaFecha } = require('../controllers/socioController');

router.post('/', reservarCancha);
router.get('/misreservas/:id_usuario',VisualizarReservas)
router.put('/misreservas/eliminar/:id_usuario/:id_cancha/:id_reserva',eliminarReserva)
router.get('/misreservas/:id_cancha/:fecha',visualizarReservaFecha)






module.exports = router;