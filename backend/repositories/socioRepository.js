

const reserva = require('../models/reserva')
const cancha= require('../models/cancha')
const empresa= require('../models/empresa')
const usuario = require('../models/usuario')

//para hacer operaciones en sequelize
const {Op} =require('sequelize')



//reserva una cancha en un horario especifico

const reservaCancha = async (id_usuario, id_cancha, fecha, hora_inicio, hora_fin) => {

    if (!id_cancha || !fecha || !hora_inicio || !hora_fin) {
        throw new Error('Todos los campos son obligatorios');
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
    //const fechaMaximaPermitida = new Date(fechaActual.setMonth(fechaActual.getMonth() + 1));

    // obtener la fecha ingresada por el usuario

    // comparar las fechas
    //if (fechaIngresada.getTime() > fechaMaximaPermitida.getTime()) {
        //throw new Error("La fecha ingresada es mayor que la fecha máxima permitida que es un 1 mes");
    //} 

    // Crea una nueva instancia de la fecha actual
    let Fechas = new Date();

    // Obtiene la hora actual en UTC (hora local - desfase horario)
    const horaUTC = Fechas.getUTCHours();
    
    // Transforma la fecha a UTC-3
    Fechas.setUTCHours(horaUTC - 3);
    const fechaHoy = (Fechas.toISOString().slice(0, 10)) // Imprime la fecha en formato ISO 8601

    const findReserva = await reserva.update(
        {id_usuario,estado:"reservado"},
        {
        where: {
            id_cancha,
            fecha:fechaHoy,
            estado:'disponible',
            hora_inicio:{
                [Op.between]:[hora_inicio,hora_fin]
            }
        }
    });


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
        return {findReserva,correo};
    } catch (error) {
        console.log(error);
        return error;
    }

}

module.exports = {
    reservaCancha
}