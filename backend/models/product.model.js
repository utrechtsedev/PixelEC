// models/Product.js
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');
const Category = require('./category.model');

class Product extends Model {}
Product.init({
  product_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  public_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: DataTypes.TEXT,
  base_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  sku: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('physical', 'digital', 'service'),
    defaultValue: 'physical'
  },
  visible: {
    type: DataTypes.ENUM('visible', 'invisible', 'unlisted'),
    defaultValue: 'visible'
  }
}, {
  sequelize,
  modelName: 'Product',
  tableName: 'products',
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at'
});


module.exports = Product;
