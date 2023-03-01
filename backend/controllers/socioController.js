
const socioRepository= require('../repositories/socioRepository')


//resevar Cancha

const reservarCancha= async (req, res) => {
    try {

        const { id_usuario, id_cancha, fecha, hora_inicio, hora_fin } = req.body;
        const reserva = await socioRepository.reservaCancha(id_usuario, id_cancha, fecha, hora_inicio, hora_fin);
        res.status(201).json({
            data: reserva
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({success:false, message:error.message})
    }
}

module.exports = {
    reservarCancha
}
