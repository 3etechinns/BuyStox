const Sequelize = require('sequelize')
const db = require('../db')

const Transaction = db.define('transaction', {
  stock: {
    type: Sequelize.STRING,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
})

module.exports = Transaction
