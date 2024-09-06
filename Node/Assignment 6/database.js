const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('payment_db', 'root', '2004', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
