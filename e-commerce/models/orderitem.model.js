// models/OrderItem.js
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');
const Order = require('./order.model');
const Product = require('./product.model');

class OrderItem extends Model {};

OrderItem.init(
  {
  order_item_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  price_each: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'order_items',
  timestamps: false // Hier geen created_at/updated_at
});

// Relatie: één order kan meerdere order_items hebben
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });
Order.hasMany(OrderItem, { foreignKey: 'order_id' });

// Relatie: één product kan in meerdere order_items voorkomen
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });
Product.hasMany(OrderItem, { foreignKey: 'product_id' });

module.exports = OrderItem;
