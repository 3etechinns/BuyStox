const Sequelize = require('sequelize')
const db = require('../db')

const Portfolio = db.define('portfolio', {
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
  },
  total: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
})

module.exports = Portfolio
