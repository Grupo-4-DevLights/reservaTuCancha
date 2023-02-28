const Sequelize = require('sequelize');
const sequelize = require('../database/connection');
const Empresa = require ('./empresa');

const Cancha = sequelize.define('Cancha', {
  id_cancha: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tipo: {
    type: Sequelize.ENUM('futbol', 'tennis', 'basquetbol', 'voley', 'padel', 'hockey'),
    allowNull: false
  },
  precio: {
    type: Sequelize.DECIMAL(10,2),
    allowNull: false
  },
  id_empresa: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Empresa,
      key: 'id_empresa'
    }
  }
  }, {
  timestamps: false
});

module.exports = Cancha;
