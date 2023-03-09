const Cancha = require('../models/cancha');
const reserva = require('../models/reserva');

// Método para listar todas las canchas
const listarCanchas = async (req, res) => {
  try {
    const canchas = await Cancha.findAll();
    res.json(canchas);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

// Método para crear una nueva cancha
const crearCancha = async (req, res) => {
  const { nombre, tipo, precio } = req.body;

  if (!(nombre && tipo && precio)) {
    res.status(400).send('faltan completar todos los campos(nombre,tipo,precio)')
  }

  try {
    const cancha = await Cancha.create({
      nombre,
      tipo,
      precio,
    });
    res.json(cancha);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

// Método para mostrar una cancha específica
const mostrarCancha = async (req, res) => {
  const { id } = req.params;
  try {
    const cancha = await Cancha.findByPk(id);
    if (cancha) {
      res.json(cancha);
    } else {
      res.status(404).send('No se encontró la cancha');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

// Método para actualizar una cancha existente
const actualizarCancha = async (req, res) => {
  const { id } = req.params;
  const { nombre, tipo, precio } = req.body;
  try {
    const cancha = await Cancha.findByPk(id);
    if (cancha) {
      cancha.nombre = nombre;
      cancha.tipo = tipo;
      cancha.precio = precio;
      await cancha.save();
      res.json(cancha);
    } else {
      res.status(404).send('No se encontró la cancha');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

// Método para eliminar una cancha existente
const eliminarCancha = async (req, res) => {
  const { id } = req.params;

  try {
    const cancha = await Cancha.findByPk(id);
    if (cancha) {
      await cancha.destroy();
      res.json({ mensaje: 'Cancha eliminada correctamente' });
    } else {
      res.status(404).send('No se encontró la cancha');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};


//visualizar la disponibilidad de la cancha
const disponibilidadCancha = async (req,res) => {
  const {id} = req.params

  console.log(id)
  if (!id) {
    throw new Error('El id no existe');
  }

// Crea una nueva instancia de la fecha actual
let Fechas = new Date();
// Obtiene la hora actual en UTC (hora local - desfase horario)
const horaUTC = Fechas.getUTCHours();
// Transforma la fecha a UTC-3
Fechas.setUTCHours(horaUTC - 3);
const fechaHoy = (Fechas.toISOString().slice(0, 10)) // Imprime la fecha en formato ISO 8601

  try {
    const disponibilidad = await reserva.findAll({
      where: {
        id_cancha:id,
        fecha:fechaHoy,
        estado: 'disponible'
      },
      order: [['hora_inicio', 'ASC']],
      order: [['hora_fin', 'ASC']]
    });

    res.status(200).json(disponibilidad);


  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
}

module.exports = {
  listarCanchas,
  crearCancha,
  mostrarCancha,
  actualizarCancha,
  eliminarCancha,
  disponibilidadCancha
};
