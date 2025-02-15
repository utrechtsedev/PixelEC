const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class ProductAttribute extends Model {}
ProductAttribute.init({
  value: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'ProductAttribute',
  tableName: 'product_attributes',
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at'
});

module.exports = ProductAttribute;  