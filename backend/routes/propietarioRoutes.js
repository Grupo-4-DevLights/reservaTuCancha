const express = require('express');
const router = express.Router();


const {listarReservasPendientes,listarReservasConfirmadas,confirmarReserva,cancelarReserva} = require('../controllers/propietarioController');


router.get('/reservasPendientes/:id_propietario',listarReservasPendientes);
router.get('/reservasConfirmadas/:id',listarReservasConfirmadas);
router.put('/confirmarReserva/:id',confirmarReserva);
router.put('/cancelarReserva/:id',cancelarReserva);

module.exports = router;


