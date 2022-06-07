const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const LogUser = sequelize.define('LogUser', {
  id_log: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  action: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
},
{
  tableName: 'LogUser',
  timestamps: true,
  createdAt: true,
  updatedAt: false
}
)

module.exports = LogUser
