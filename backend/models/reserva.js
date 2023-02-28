const Sequelize = require('sequelize');
const sequelize = require('../database/connection');
const Cancha = require ('./cancha');
const Usuario = require ('./usuario');

const Reserva = sequelize.define('Reserva', {
  id_reserva: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fecha: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  hora_inicio: {
    type: Sequelize.TIME,
    allowNull: false
  },
  hora_fin: {
    type: Sequelize.TIME,
    allowNull: false
  },
  id_cancha: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Cancha,
      key: 'id_cancha'
    }
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

module.exports = Reserva;
