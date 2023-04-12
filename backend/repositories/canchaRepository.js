const cancha = require("../models/cancha");

//listar todas las canchas
const listarCanchas = async (req, res) => {
  try {
    const canchas = await cancha.findAll();
    return canchas;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//crear una cancha

const crearCancha = async (nombre, tipo, precio, id_empresa) => {
  if (!(nombre && tipo && precio && id_empresa)) {
    throw new Error(
      "faltan completar todos los campos(nombre,tipo,precio,id_empresa)"
    );
  }

  try {
    const nuevaCancha = await cancha.create({
      nombre,
      tipo,
      precio,
      id_empresa,
    });

    return nuevaCancha;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//mostrar una cancha

const mostrarCancha = async (id_cancha) => {
  //mostrarme todas las canchas de un id
  const buscarCanchar = await cancha.findByPk(id_cancha);
  
  if (!buscarCanchar) {
    throw new Error("no se encontro la cancha");
  }
  try {
    
    return buscarCanchar;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//actualizar cancha

const actualizarCancha = async (id_cancha, nombre, tipo, precio) => {
  const buscarCanchar = await cancha.findByPk(id_cancha);

  if (!buscarCanchar) {
    throw new Error("no se encontro la cancha");
  }

  try {
    const canchaBuscada = await cancha.findByPk(id_cancha);

    await canchaBuscada.update({
      nombre,
      tipo,
      precio,
    });

    return canchaBuscada;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//eliminar una cancha

const eliminarCancha = async (id_cancha) => {
    const buscarCanchar = await cancha.findByPk(id_cancha);

    if (!buscarCanchar) {
        throw new Error("no se encontro la cancha a eliminar");
    }

    try {
        const canchaEliminada= await buscarCanchar.destroy()
        return canchaEliminada
    } catch (error) {
        console.log(error);
        return error
    }
}


module.exports = {
  listarCanchas,
  crearCancha,
  mostrarCancha,
  actualizarCancha,
  eliminarCancha,
};
