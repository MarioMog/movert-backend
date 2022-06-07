const cors = require('cors')
const express = require('express')

const app = express()

app.set('port', process.env.PORT || 5000) // process.env.PORT get hosting port

app.use(express.json()) // allow json
app.use(express.urlencoded({ extended: true })) // allow forms
app.use(cors()) // require to allow acces from other ports

// routes
app.use('/health', (req, res) => {
  res.status(200).json({ message: 'Hello world!!' })
})

module.exports = app // export aplication
