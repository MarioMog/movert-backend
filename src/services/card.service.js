const Card = require('../models/Card')

module.exports.getCardById = async (id) => {
  try {
    return await Card.findByPk(id)
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports.getCardByUserId = async (idUser) => {
  try {
    return await Card.findOne({
      where: {
        id_user: idUser
      }
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports.createCard = async (body) => {
  try {
    return await Card.create(body)
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports.updateCard = async (id, body) => {
  try {
    return await Card.update(body, {
      where: {
        id_card: body.id_card
      }
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}
