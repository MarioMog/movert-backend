require('dotenv').config()
const sequelize = require('./db')
const app = require('./app')

app.listen(app.get('port'), () => console.log(`Listening port: ${app.get('port')}`))
