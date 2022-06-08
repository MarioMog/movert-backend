const router = require('express').Router()
const { loginEmployee } = require('../controllers/employee.controller')
const { getUserById } = require('../controllers/user.controller')
const { isAuthorized } = require('../middlewares/isAuthorized')

router.post('/login', loginEmployee)
router.post('/user', isAuthorized, getUserById)

module.exports = router
