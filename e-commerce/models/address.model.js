// models/Address.js
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./user.model');

class Address extends Model {};

Address.init(
  {
  address_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  street: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  postal_code: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  country: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  address_type: {
    type: DataTypes.ENUM('billing', 'shipping'),
    defaultValue: 'shipping'
  }
}, {
  sequelize,
  tableName: 'addresses',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
}
);
// Relatie: één gebruiker heeft meerdere adressen
Address.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Address, { foreignKey: 'user_id' });

module.exports = Address;
