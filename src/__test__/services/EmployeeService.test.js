/* eslint-disable no-undef */
const { getEmployeeById, createEmployee, updateEmployee, loginEmployee } = require('../../services/employee.service')
const bcrypt = require('bcrypt')

describe('EmployeeServices', () => {
  test('1.1)Create employee', async () => {
    const body = {
      name: 'Mario',
      last_name: 'Guerrero',
      password: await bcrypt.hash('123456', 10),
      email: 'truly@email.com',
      rfc: 'AAAAAAAAAAAAA'
    }
    const result = await createEmployee(body)
    expect(result.name).toBe(body.name)
  })
  test('1.2)Get employee by id', async () => {
    const result = await getEmployeeById(1)
    expect(result.name).toBe('Mario')
  })
  test('1.3)Update employee', async () => {
    const body = {
      last_name: 'Morales',
      email: 'truly@email.com',
      rfc: 'QEGF123400432'
    }
    const result = await updateEmployee(1, body)
    expect(result.length).toBe(1)
  })
  test('1.4)Login employee', async () => {
    const id = 1
    const result = await loginEmployee(id)
    const passwordCorrect = result === null
      ? false
      : await bcrypt.compare('123456', result.dataValues.password)

    expect(passwordCorrect).toBe(true)
  })
})
