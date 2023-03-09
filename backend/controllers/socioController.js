
const socioRepository= require('../repositories/socioRepository')
const misreservas = require('../models/reserva');


// enviar correo
const nodemailer = require("nodemailer");
const enviarCorreo = require('../middlewares/mandarCorreo')

const reservarCancha= async (req, res) => {
    try {

        const { id_usuario, id_cancha, fecha, hora_inicio, hora_fin } = req.body;
        const reserva = await socioRepository.reservaCancha(id_usuario, id_cancha, fecha, hora_inicio, hora_fin);

        //mandar correo
        enviarCorreo(reserva.correo,'reserva solicitada', `se ha hecho una reserva en su cancha numero ${id_cancha} para la hora de ${hora_inicio} hasta las ${hora_fin}`)
        res.status(201).json({message:'se han reservado correctamente en los horarios solicitados'});
    } catch (error) {
        console.log(error)
        res.status(400).json({success:false, message:error.message})
    }
}

const VisualizarReservas= async (req, res) => {
    try {
        const { id_usuario } = req.params;
        const reservas = await misreservas.findAll(
            {
                where: {
                    id_usuario: id_usuario
                }
            }
        )
        res.status(201).json(reservas);
    } catch (error) {
        console.log(error)
        res.status(400).json({success:false, message:error.message})
    }
}



module.exports = {
    reservarCancha,
    VisualizarReservas
}