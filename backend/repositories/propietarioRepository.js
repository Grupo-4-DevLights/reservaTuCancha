const usuario= require('../models/usuario');
const reserva= require('../models/reserva');
const cancha= require('../models/cancha');
const empresa= require('../models/empresa');


// visualizar solo las reservas en estado pendiente que hicieron en su cancha
const listarReservasPendientes = async (id_propietario) => {

    //encontrar la empresa con el id_propietario
    const idEmpresa = await empresa.findOne({
        where: {
            id_usuario: id_propietario
        }
    }).then(
        data => {
            console.log(data.id_empresa)
            return data.id_empresa;
        }
    )


    const reservas = await cancha.findAll({
        where: {
            id_empresa: idEmpresa,
        },
        include:[{
            model: reserva,
            where: {
                estado: 'reservado'
            }
        }]
    });

    return reservas;
}

//cambiar la reserva a confirmado
const confirmarReserva = async (id) => {
    

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


    const reservas = await reserva.findAll({
        where: {
            id_cancha: id,
            estado: 'confirmado'
        }
    });
    return reservas;
}

//visualizar empresa del usuario
const listarEmpresaPropietario = async (id_usuario) => {
    const mostrarEmpresa = await empresa.findOne({
        where: {
            id_usuario: id_usuario
        }
    });
    return mostrarEmpresa;
}


//visualizar reservas pendientes

//visualizar reservas pendientes por fecha
const verReservasPendienteFecha = async (id_cancha,fecha) => {

    try {
      const reservadas =await reserva.findAll({
        where: {
          id_cancha: id_cancha,
          fecha: fecha,
          estado: "reservado",
        },
        order: [["horario", "ASC"]],
      })
    
      return reservadas;
    } catch (error) {
      console.log(error);
      return error;
    }
  };


module.exports={
    listarReservasPendientes,
    confirmarReserva,
    cancelarReserva,
    listarReservasConfirmadas,
    listarEmpresaPropietario,
    verReservasPendienteFecha
}

