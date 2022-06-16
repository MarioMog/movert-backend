require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { JWT_SECRETU } = process.env

const { SendMail } = require('../middlewares/emailSender')
const { getUserById, loginUser, createUser } = require('../services/user.service')

module.exports.loginUser = async (req, res) => {
  try {
    const { body } = req
    const { email, password } = body

    const employee = await loginUser(email, password)
    const passwordCorrect = employee === null
      ? false
      : await bcrypt.compare(password, employee.password)

    if (!(employee && passwordCorrect)) {
      return res.status(401).json({
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
    return res.status(200).json({
      name: employee.name,
      id_employee: employee.id_employee,
      token
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Server internal error', err: error })
  }
}

module.exports.registerUser = async (req, res) => {
  try {
    const { body } = req
    const password = 'password' in body ? body.password : Math.random().toString(33).slice(2)
    const user = await createUser({ ...body, password: await bcrypt.hash(password, 10) })

    if (!user) {
      return res.status(401).json({
        error: 'User cannot be created'
      })
    }
    if (!('password' in body)) {
      const { response, rejected } = await SendMail({
        username: body.name,
        email: body.email,
        password: Math.random().toString(33).slice(2)
      })
      if (rejected.length > 0) {
        const responseA = response.split(' ')[0]
        return res.status(424).json({
          message: 'Email sent could not be performed',
          error: response.slice(responseA.length + 1)
        })
      }
    }
    return res.status(200).json({
      email: user.email,
      name: user.name
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Server internal error', err: error })
  }
}

module.exports.getUserById = async (req, res) => {
  try {
    const { idUser } = req.body

    const user = await getUserById(idUser)

    if (!user) {
      return res.status(401).json({
        error: 'invalid id'
      })
    }
    return res.status(200).json({
      email: user.email,
      name: user.name
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Server internal error', err: error })
  }
}
