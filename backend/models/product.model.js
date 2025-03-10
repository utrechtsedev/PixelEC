// models/Product.js
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');
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
  category_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'categories',
      key: 'category_id'
    }
  },
  brand_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'brands',
      key: 'brand_id'
    }
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
Product.associate = (models) => {
  Product.belongsTo(models.Brand, {foreignKey: 'brand_id'});
  // Add an alias to match what you're using in the query
  Product.hasMany(models.ProductVariant, { 
    as: 'ProductVariants',
    foreignKey: 'product_id' // Use standard naming convention
  });
  Product.hasMany(models.ProductImage, {
    as: 'ProductImages',
    foreignKey: 'product_id'
  });
  Product.belongsTo(models.Category, {as: 'Category', foreignKey: 'category_id'});
}
module.exports = Product;