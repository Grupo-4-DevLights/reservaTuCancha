const Sequelize = require('sequelize');
const sequelize = require('../database/connection');
const Usuario = require ('./usuario');

const Empresa = sequelize.define('Empresa', {
  id_empresa: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: Sequelize.STRING,
    allowNull: false
  },
  direccion: {
    type: Sequelize.STRING,
    allowNull: false
  },
  telefono: {
    type: Sequelize.STRING,
    allowNull: false
  },
  link_pago: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imagen: {
    type: Sequelize.STRING,
    allowNull: true
  },
  id_usuario: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'id_usuario'
    }
  }
  },
  {
    timestamps: false
});
  
  
//   

module.exports = Empresa;