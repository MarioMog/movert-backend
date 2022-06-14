const router = require('express').Router()
const { loginEmployee } = require('../controllers/employee.controller')
const { getUserById, registerUser } = require('../controllers/user.controller')
const { createCard, associateCardToUser, getCardById, updateCard } = require('../controllers/card.controller')
const { isAuthorized } = require('../middlewares/isAuthorized')

// Endpoints for EmployeeController
router.post('/login', loginEmployee)

// Endpoints for UserController
router.put('/user', isAuthorized, registerUser)
router.post('/user', isAuthorized, getUserById)

// Endpoints for CardController
router.put('/card', isAuthorized, createCard)
router.post('/card', getCardById)
router.post('/card/user', isAuthorized, associateCardToUser)
router.post('/card/update', isAuthorized, updateCard)

module.exports = router
