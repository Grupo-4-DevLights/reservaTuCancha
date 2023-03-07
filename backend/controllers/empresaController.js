const Empresa = require('../models/empresa');

// Listar todas las empresas
const listarEmpresas = async (req, res) => {
  try {
    const empresas = await Empresa.findAll();
    res.status(200).json(empresas);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error en el servidor');
  }
};


// Crear una nueva empresa
const crearEmpresa = async (req, res) => {
  const { nombre, direccion, telefono,imagen,id_usuario } = req.body;

  if(!(nombre && direccion && telefono && imagen && id_usuario)){
    return res.status(400).send('deben estar todos los datos(nombre,direccion,telefono,imagen)');
  }

  //verificar is existe el usuario registrado
  const buscarUsuario= await Empresa.findOne({
    where:{
      id_usuario
    }
  })

  if(buscarUsuario){
    return res.status(400).send('el usuario ya tiene una empresa registrada');
  }

  try {
    const nuevaEmpresa = await Empresa.create({
      nombre,
      direccion,
      telefono,
      imagen,
      id_usuario
    });

    res.status(201).json(nuevaEmpresa);

  } catch (error) {
    console.log(error);
    res.status(500).send('Error en el servidor');
  }
};


// Mostrar una empresa por su ID
const mostrarEmpresa = async (req, res) => {
  const { id } = req.params;
  try {
    const empresa = await Empresa.findByPk(id);
    if (!empresa) {
      return res.status(404).send('Empresa no encontrada');
    }
    res.status(200).json(empresa);
  } catch (error) {
    res.status(500).send('Error en el servidor:',error);
  }
};

// Actualizar una empresa por su ID
const actualizarEmpresa = async (req, res) => {
  const { id } = req.params;
  const { nombre, direccion, telefono } = req.body;

  const empresa = await Empresa.findByPk(id);
  if (!empresa) {
    return res.status(404).send('No se puede actualizar la empresa porque no existe');
  }


  try {
    
    empresa.nombre = nombre;
    empresa.direccion = direccion;
    empresa.telefono = telefono;
    await empresa.save();
    res.status(200).json(empresa);

  } catch (error) {
    console.log(error);
    res.status(500).send('Error en el servidor');
  }
};

// Eliminar una empresa por su ID
const eliminarEmpresa = async (req, res) => {
  const { id } = req.params;
  

  const empresa = await Empresa.findByPk(id);
  if (!empresa) {
    return res.status(404).send('no puede eliminar la empresa porque no existe');
  }


  try {
    await empresa.destroy();
    res.status(200).send('Empresa eliminada');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error en el servidor');
  }
};

module.exports = {
  listarEmpresas,
  crearEmpresa,
  mostrarEmpresa,
  actualizarEmpresa,
  eliminarEmpresa,
};
