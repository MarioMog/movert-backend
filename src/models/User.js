const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const User = sequelize.define('User', {
  id_user: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
{
  tableName: 'User',
  timestamps: true,
  createdAt: true,
  updatedAt: false
}
)

module.exports = User
