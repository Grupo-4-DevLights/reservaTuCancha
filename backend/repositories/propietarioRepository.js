const usuario= require('../models/usuario');
const reserva= require('../models/reserva');
const cancha= require('../models/cancha');
const empresa= require('../models/empresa');


// visualizar solo las reservas en estado pendiente que hicieron en su cancha
const listarReservasPendientes = async (id) => {
    const buscarCancha = await cancha.findByPk(id);

    if(!buscarCancha){
        throw new Error('no se encontro la cancha');
    }


    const reservas = await reserva.findAll({
        where: {
            id_cancha: id,
            estado: 'reservado'
        }
    });

    return reservas;
}

//cambiar la reserva a confirmado
const confirmarReserva = async (id) => {
    
    const buscarReserva = await reserva.findByPk(id);
    if (!buscarReserva) {
        throw new Error('no se encontro la reserva');
    }
    try {
        const reservaConfirmada = await buscarReserva.update({
            estado: 'confirmado'
        });
        return reservaConfirmada;
    } catch (error) {
        console.log(error);
        return error;
    }
}

//cambiar la reserva a cancelado
const cancelarReserva = async (id) => {
    const buscarReserva = await reserva.findByPk(id);
    if (!buscarReserva) {
        throw new Error('no se encontro la reserva');
    }
    try {
        const reservaCancelada = await buscarReserva.update({
            estado: 'cancelado'
        });
        return reservaCancelada;
    } catch (error) {
        console.log(error);
        return error;
    }
}

//visualizar las reservas confirmadas
const listarReservasConfirmadas = async (id) => {
    const buscarCancha = await cancha.findByPk(id);

    if(!buscarCancha){
        throw new Error('no se encontro la cancha');
    }

    const reservas = await reserva.findAll({
        where: {
            id_cancha: id,
            estado: 'confirmado'
        }
    });
    return reservas;
}


module.exports={
    listarReservasPendientes,
    confirmarReserva,
    cancelarReserva,
    listarReservasConfirmadas
}

