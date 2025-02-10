// models/User.js
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class User extends Model {};

User.init(
  {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  phone_number: {
    type: DataTypes.STRING(20)
  },
  role: {
    type: DataTypes.ENUM('customer', 'admin'),
    defaultValue: 'customer'
  }
}, {
  sequelize,
  tableName: 'users',
  timestamps: true,         // Zorgt voor createdAt en updatedAt kolommen
  createdAt: 'created_at',  // Map "createdAt" naar "created_at"
  updatedAt: 'updated_at'   // Map "updatedAt" naar "updated_at"
});

module.exports = User;