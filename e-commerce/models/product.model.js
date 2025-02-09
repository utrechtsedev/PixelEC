// models/Product.js
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');
const Category = require('./category.model');

class Product extends Model {};

Product.init(
  {
  product_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  price: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  sku: {
    type: DataTypes.STRING(100),
    unique: true
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  sequelize,
  tableName: 'products',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
}
);
// Relatie: één categorie kan meerdere producten hebben
Product.belongsTo(Category, { foreignKey: 'category_id' });
Category.hasMany(Product, { foreignKey: 'category_id' });

module.exports = Product;
