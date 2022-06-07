const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const Employee = sequelize.define('Employee', {
  id_employee: {
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
  },
  rfc: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
{
  tableName: 'Employee',
  timestamps: true,
  createdAt: true,
  updatedAt: false
}
)

module.exports = Employee
