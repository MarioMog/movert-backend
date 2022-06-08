const Employee = require('../models/Employee')

module.exports.getEmployeeById = async (id) => {
  try {
    return await Employee.findByPk(id)
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports.createEmployee = async (body) => {
  try {
    return await Employee.create(body)
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports.updateEmployee = async (id, body) => {
  try {
    const { name, lastName, email, password, rfc } = body
    return await Employee.update({
      name,
      last_name: lastName,
      password,
      email,
      rfc
    }, {
      where: {
        id_employee: id
      }
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports.loginEmployee = async (idEmployee) => {
  try {
    return await Employee.findOne({
      where: {
        id_employee: idEmployee
      }
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}
