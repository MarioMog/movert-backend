const { Sequelize } = require('sequelize')
require('dotenv').config()
const { DB_URI } = process.env

const sequelize = new Sequelize(DB_URI, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    application_name: 'movert_api'
  }
})

console.log('DB Connected')

module.exports = sequelize
