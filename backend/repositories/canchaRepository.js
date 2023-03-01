// logica de negocio para el modelo cancha

//importamos el modelo
const cancha = require('../models/cancha')


const crearCancha = async ( nombre, tipo, precio, empresa_id) => {
    
    try {
        const cancha = await cancha.create({ nombre, tipo, precio });
        return cancha;
    } catch (error) {
        console.log(error);
        return error;
    }
}