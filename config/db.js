const Sequelize  = require('sequelize');

const db = new Sequelize('uptasknode', 'postgres', '0000', {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    timestamps: false
  },
});

module.exports = db;