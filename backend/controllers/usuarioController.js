const Usuario = require('../models/usuario');

// Método para crear un nuevo usuario
const crearUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Hubo un error al crear el usuario' });
  }
};

// Método para listar todos los usuarios
const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Hubo un error al obtener los usuarios' });
  }
};

// Método para actualizar un usuario existente
const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const [numFilas, [usuario]] = await Usuario.update(req.body, {
      where: { id_usuario: id },
      returning: true
    });
    if (numFilas === 0) {
      return res.status(404).json({ mensaje: 'No se encontró el usuario' });
    }
    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Hubo un error al actualizar el usuario' });
  }
};

// Método para obtener un usuario en particular
const mostrarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'No se encontró el usuario' });
    }
    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Hubo un error al obtener el usuario' });
  }
};

// Método para eliminar un usuario existente
const eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const numFilas = await Usuario.destroy({ where: { id_usuario: id } });
    if (numFilas === 0) {
      return res.status(404).json({ mensaje: 'No se encontró el usuario' });
    }
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Hubo un error al eliminar el usuario' });
  }
};

module.exports = {
  crearUsuario,
  listarUsuarios,
  actualizarUsuario,
  mostrarUsuario,
  eliminarUsuario
};
