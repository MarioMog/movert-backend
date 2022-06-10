/* eslint-disable no-undef */
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')

const sequelize = require('../../db')
const { createCard } = require('../../services/card.service')

describe('CardServices', () => {
  afterAll(() => {
    sequelize.close()
  })
  test('1.1)Create card', async () => {
    const idCard = await uuidv4().replace(/-/g, '').replace(/(.{2})/g, '$1:').substring(0, 23)
    const body = {
      id_card: idCard,
      id_user: 1,
      user_type: 0,
      balance: 20
    }
    const result = await createCard(body)
    expect(result.id_user).toBe(1)
  })
})
