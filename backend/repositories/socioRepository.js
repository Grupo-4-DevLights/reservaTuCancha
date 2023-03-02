

const reserva = require('../models/reserva')
const cancha= require('../models/cancha')
const empresa= require('../models/empresa')
const usuario = require('../models/usuario')

//reserva una cancha en un horario especifico

const reservaCancha = async (id_usuario, id_cancha, fecha, hora_inicio, hora_fin) => {

    if (!id_usuario || !id_cancha || !fecha || !hora_inicio || !hora_fin) {
        throw new Error('Todos los campos son obligatorios');
    }

    //expresión regular para validar un horario con minutos de 00 o 30
    const regex = /^(0?[0-9]|1[0-9]|2[0-3]):(00|30)$/; // expresión regular

    if (regex.test(hora_inicio) === false || regex.test(hora_fin) === false) {
        throw new Error('Solo se permiten horarios de 0-23 hora y 00 o 30 minutos');
    }



    //validar que la hora de inicio sea menor a la hora de fin
    if (hora_inicio >= hora_fin) {
        throw new Error('La hora de inicio debe ser menor a la hora de fin');
    }

    //validar que la fecha sea mayor a la fecha actual
    const fechaIngresada = new Date(fecha)
    const fechaActual = new Date()

    if (fechaActual.getTime() > fechaIngresada.getTime()) {
        throw new Error('La fecha de reserva debe ser mayor o igual a la fecha actual');
    }

    // sumar un mes a la fecha actual
    const fechaMaximaPermitida = new Date(fechaActual.setMonth(fechaActual.getMonth() + 1));

    // obtener la fecha ingresada por el usuario

    // comparar las fechas
    if (fechaIngresada.getTime() > fechaMaximaPermitida.getTime()) {
        throw new Error("La fecha ingresada es mayor que la fecha máxima permitida que es un 1 mes");
    } 

     //validar que la cancha no este reservada en el horario ingresado
     const findReserva = await reserva.findOne({
        where: {
            id_cancha,
            fecha,
            hora_inicio,
            hora_fin,
            estado:'reservado'
        }
    });

    if (findReserva) {
        throw new Error('La cancha ya se encuentra reservada en el horario ingresado');
    }

    //buscar la empresa del usuario que se le va a asignar la reseva
    const usuarioPropietario = await cancha.findByPk(id_cancha, {
        include: {
            model: empresa,
            attributes: ['id_usuario']
        }  
    })
    .then(data=>{return data.Empresa.id_usuario})

    //buscar el correo del usuario propietario de la cancha
    const correo = await usuario.findByPk(usuarioPropietario, {
    })
    .then(data=>{return data.email})

    try {
        const nuevaReserva = await reserva.create({ id_usuario, id_cancha, fecha, hora_inicio, hora_fin });
        return {nuevaReserva, correo};

    } catch (error) {
        console.log(error);
        return error;
    }

}

module.exports = {
    reservaCancha
}