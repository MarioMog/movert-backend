const { Sequelize } = require('sequelize')
const { DB_URI } = process.env

const sequelize = new Sequelize(DB_URI, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    application_name: 'movert_api'
  }
});

(async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
})()
console.log('DB Connected')

module.exports = sequelize
