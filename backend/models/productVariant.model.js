const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class ProductVariant extends Model {}
ProductVariant.init({
  variant_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  sku: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false
  },
  price_override: DataTypes.DECIMAL(10, 2),
  inventory_quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  attributes: DataTypes.JSON
}, {
  sequelize,
  modelName: 'ProductVariant',
  tableName: 'product_variants',
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at'
});

module.exports = ProductVariant;