const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Payment = sequelize.define('Payment', {
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  payment_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  payment_method: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  invoice_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  transaction_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  card_type: {
    type: DataTypes.STRING,
  },
  card_number: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: false,
  tableName: 'Payments',
});

module.exports = Payment;
