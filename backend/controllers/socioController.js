
const socioRepository= require('../repositories/socioRepository')


// enviar correo
const nodemailer = require("nodemailer");
const enviarCorreo = require('../middlewares/mandarCorreo')

const reservarCancha= async (req, res) => {
    try {

        const { id_usuario, id_cancha, fecha, hora_inicio, hora_fin } = req.body;
        const reserva = await socioRepository.reservaCancha(id_usuario, id_cancha, fecha, hora_inicio, hora_fin);

        //mandar correo
        enviarCorreo(reserva.correo,'reserva solicitada', 'se ha hecho una reserva en su cancha')
        res.status(201).json({reserva:reserva.nuevaReserva});
    } catch (error) {
        console.log(error)
        res.status(400).json({success:false, message:error.message})
    }
}

// disponibilidad

const disponibilidadCancha= async (req, res) => {
    try {

        const id_cancha  = (req.params).id;
        const disponibilidad = await socioRepository.disponibilidadCancha(id_cancha);
        
        res.status(200).json(disponibilidad);
    } catch (error) {
        console.log(error)
        res.status(400).json({success:false, message:error.message})
    }
}

module.exports = {
    reservarCancha,
    disponibilidadCancha
}