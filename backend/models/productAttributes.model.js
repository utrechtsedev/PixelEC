// models/ProductAttribute.js
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class ProductAttribute extends Model {}

ProductAttribute.init({
  attribute_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  variant_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'product_variants',
      key: 'variant_id'
    }
  },
  key: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  value: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  display_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  is_filterable: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  attribute_type: {
    type: DataTypes.ENUM('specification', 'feature', 'custom', 'attribute'),
    defaultValue: 'feature'
  }
}, {
  sequelize,
  modelName: 'ProductAttribute',
  tableName: 'product_attributes',
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  indexes: [
    {
      fields: ['variant_id']
    },
    {
      fields: ['variant_id', 'key'],
      unique: true
    },
    {
      fields: ['is_filterable']
    },
  ]
});

ProductAttribute.associate = (models) => {
  ProductAttribute.belongsTo(models.ProductVariant, { 
    foreignKey: 'variant_id',
    onDelete: 'CASCADE'
  });
};

module.exports = ProductAttribute;