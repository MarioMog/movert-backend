const User = require('../models/User')

module.exports.getUserById = async (id) => {
  try {
    return await User.findByPk(id)
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports.createUser = async (body) => {
  try {
    return await User.create(body)
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports.updateUser = async (id, body) => {
  try {
    return await User.update(body, {
      where: {
        id_user: id
      }
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports.loginUser = async (email) => {
  try {
    return await User.findOne({
      where: {
        email
      }
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}
