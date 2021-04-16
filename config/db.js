const Sequelize = require('sequelize');
const sequelize = new Sequelize('uptasknode', 'postgres', '0000', {
  host: 'localhost',
  dialect: 'postgres',
  port: '5432',
  operatorsAliases: false,
  define: {
      timestamps: false
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});