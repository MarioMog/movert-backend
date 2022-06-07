const { DataTypes } = require('sequelize')
const sequelize = require('../db')
const User = require('./User')

const Card = sequelize.define('Card', {
  id_card: {
    primaryKey: true,
    type: DataTypes.STRING
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_type: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  balance: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  expiration: {
    type: DataTypes.DATE,
    allowNull: true
  },
  school: {
    type: DataTypes.STRING,
    allowNull: true
  }
},
{
  tableName: 'Card',
  timestamps: true,
  createdAt: true,
  updatedAt: false
}
)

User.hasOne(Card, {
  foreignKey: {
    name: 'id_user'
  }
})

module.exports = Card
