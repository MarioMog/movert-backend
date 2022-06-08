const jwt = require('jsonwebtoken')

require('dotenv').config()
const { JWT_SECRETU, JWT_SECRETE } = process.env

module.exports.isAuthorized = (req, res, next) => {
  const { app } = req.body
  try {
    const { authorization } = req.headers
    const [bearer, token] = authorization.split(' ')
    const key = app === 'movert-employee' ? JWT_SECRETE : JWT_SECRETU
    jwt.verify(token, key)
    next()
  } catch (error) {
    res.status(401).json({ error: 'token/app missing or invalid' })
  }
}
