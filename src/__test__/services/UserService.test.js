/* eslint-disable no-undef */
const { getUserById, createUser, updateUser, loginUser } = require('../../services/user.service')
const bcrypt = require('bcrypt')
describe('UserServices', () => {
  test('1.1)Create user', async () => {
    const password = await bcrypt.hash('123456', 10)
    const body = {
      name: 'Juan',
      lastName: 'Escutia',
      email: 'juan@hotmail.com',
      password
    }
    const result = await createUser(body)
    expect(result.name).toBe(body.name)
  })
  test('1.2)Get user by id', async () => {
    const result = await getUserById(1)
    expect(result.name).toBe('Juan')
  })
  test('1.3)Update user', async () => {
    const body = {
      name: 'Juan',
      last_name: 'Escutia2',
      email: 'otro@hotmail.com'
    }
    const result = await updateUser(1, body)
    expect(result.length).toBe(1)
  })
  test('1.4)Login user', async () => {
    const email = 'otro@hotmail.com'
    const result = await loginUser(email)
    const passwordCorrect = result === null
      ? false
      : await bcrypt.compare('123456', result.dataValues.password)

    expect(passwordCorrect).toBe(true)
  })
})
