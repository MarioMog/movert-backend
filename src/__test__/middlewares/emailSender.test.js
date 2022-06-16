/* eslint-disable no-undef */
const { SendMail } = require('../../middlewares/emailSender')

describe('SendMail', () => {
  test('1)Sending', async () => {
    const res = await SendMail({
      email: 'mamg3108@gmail.com',
      password: Math.random().toString(33).slice(2)
    })
    expect(res).toMatch('Email sent')
  })
})
