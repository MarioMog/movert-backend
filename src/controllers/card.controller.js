const { v4: uuidv4 } = require('uuid')

const { createCard, getCardByUserId, updateCard, getCardById } = require('../services/card.service')

module.exports.createCard = async (req, res) => {
  try {
    const { body } = req
    const idCard = await uuidv4().replace(/-/g, '').replace(/(.{2})/g, '$1:').substring(0, 23)
    const card = await createCard({ ...body, id_card: idCard })
    if (!card) {
      return res.status(401).json({
        error: 'cannot create card'
      })
    }
    return res.status(200).json({
      id_card: card.id_card
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server internal error', err: error })
  }
}

module.exports.associateCardToUser = async (req, res) => {
  try {
    const { body } = req
    const card = await getCardByUserId(body.id_user)
    if (card) {
      return res.status(401).json({
        error: 'user alredy has a card associated'
      })
    }
    if (body.user_type === 1) {
      if ('school' in body) body.expiration = Date.now()
      else {
        return res.status(400).json({ message: 'school cannot be undefined if user_type is 1' })
      }
    } else {
      body.expiration = null
      body.school = null
    }
    const [result] = await updateCard(body.id_user, body)
    res.status(200).json({
      affected_rows: result
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server internal error', err: error })
  }
}

module.exports.updateCard = async (req, res) => {
  try {
    const { body } = req
    const card = await getCardByUserId(body.id_user)
    if (!card) {
      return res.status(401).json({
        error: 'user dont have a card associated'
      })
    } else {
      if (body.user_type === 1) {
        if ('school' in body) {
          const date = new Date()
          date.setMonth(date.getMonth() + 6)
          body.expiration = date
        } else {
          return res.status(400).json({ message: 'school cannot be undefined if user_type is 1' })
        }
      } else {
        body.expiration = null
        body.school = null
      }
      const [result] = await updateCard(body.id_user, body)
      return res.status(200).json({
        affected_rows: result
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server internal error', err: error })
  }
}

module.exports.getCardById = async (req, res) => {
  try {
    const { idCard } = req.body
    const card = await getCardById(idCard)

    if (!card) {
      return res.status(401).json({
        error: 'invalid id_card'
      })
    }
    return res.status(200).json(card)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server internal error', err: error })
  }
}
