// models/OrderAddress.js
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class OrderAddress extends Model {};

OrderAddress.init(
  {
  order_address_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  order_id: {
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
  tableName: 'order_addresses',
  timestamps: false
}
);

module.exports = OrderAddress;
