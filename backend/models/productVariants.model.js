// models/ProductVariant.js
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class ProductVariant extends Model {}

ProductVariant.init({
  variant_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  product_id: { // Add this field to match standard naming
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'products',
      key: 'product_id'
    }
  },
  sku: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  price_override: DataTypes.DECIMAL(10, 2),
  inventory_quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  size: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  weight: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'ProductVariant',
  tableName: 'product_variants',
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at'
});
ProductVariant.associate = (models) => {
  ProductVariant.hasMany(models.Inventory);
  ProductVariant.belongsTo(models.Product, { 
    foreignKey: 'product_id' // Use standard naming
  });
  ProductVariant.hasMany(models.ProductImage, { 
    as: 'VariantImages',
    foreignKey: 'variant_id'
  });
  // Add 'as' alias to match the query
  ProductVariant.hasMany(models.ProductAttribute, { 
    as: 'ProductAttributes',
    foreignKey: 'variant_id' 
  });
};
module.exports = ProductVariant;