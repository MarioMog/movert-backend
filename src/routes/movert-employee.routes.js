const router = require('express').Router()
const { loginEmployee } = require('../controllers/employee.controller')
const { getUserById } = require('../controllers/user.controller')
const { createCard, associateCardToUser, getCardById } = require('../controllers/card.controller')
const { isAuthorized } = require('../middlewares/isAuthorized')

router.post('/login', loginEmployee)
router.post('/user', isAuthorized, getUserById)
router.put('/card', isAuthorized, createCard)
router.post('/card', getCardById)
router.post('/card/user', isAuthorized, associateCardToUser)

module.exports = router
