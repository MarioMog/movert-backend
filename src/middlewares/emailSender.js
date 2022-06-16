module.exports.SendMail = async (mailComplement) => {
  const { createTransport } = require('nodemailer')
  const { ES_EMAIL, ES_PASSWORD } = process.env

  const transporter = createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: ES_EMAIL,
      pass: ES_PASSWORD
    }
  })
  const mailOptions = {
    from: ES_EMAIL,
    to: mailComplement.email,
    subject: 'New Acount MovertApp',
    html: `<h1>Welcome to MovertApp</h1>
    <br>Hello ${mailComplement.username}, your account has been generated with the password: ${mailComplement.password}.</>`
  }
  const response = await transporter.sendMail(mailOptions)
  return response
}
