const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

require('dotenv').config()
const { JWT_SECRETU } = process.env

const { getUserById, loginUser } = require('../services/user.service')

module.exports.loginUser = async (req, res) => {
  try {
    const { body } = req
    const { email, password } = body

    const employee = await loginUser(email, password)
    const passwordCorrect = employee === null
      ? false
      : await bcrypt.compare(password, employee.password)

    if (!(employee && passwordCorrect)) {
      res.status(401).json({
        error: 'invalid id or password'
      })
    }
    const token = jwt.sign(
      {
        data: {
          email: employee.email,
          id_employee: employee.id_employee
        }
      },
      JWT_SECRETU,
      { expiresIn: '1h' }
    )
    res.status(200).json({
      name: employee.name,
      id_employee: employee.id_employee,
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server internal error', err: error })
  }
}

module.exports.getUserById = async (req, res) => {
  try {
    const { idUser } = req.body

    const user = await getUserById(idUser)

    if (!user) {
      res.status(401).json({
        error: 'invalid id'
      })
    }
    res.status(200).json({
      email: user.email,
      name: user.name
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server internal error', err: error })
  }
}
