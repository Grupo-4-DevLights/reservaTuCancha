const Cancha = require('../models/cancha');

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

module.exports = {
  listarCanchas,
  crearCancha,
  mostrarCancha,
  actualizarCancha,
  eliminarCancha,
};
