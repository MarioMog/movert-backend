const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

require('dotenv').config()
const { JWT_SECRETE } = process.env

const { loginEmployee } = require('../services/employee.service')

module.exports.loginEmployee = async (req, res) => {
  try {
    const { body } = req
    const { idEmployee, password } = body

    const employee = await loginEmployee(idEmployee)
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
      JWT_SECRETE,
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
