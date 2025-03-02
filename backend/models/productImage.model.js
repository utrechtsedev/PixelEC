const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');
class ProductImage extends Model {}
ProductImage.init({
  image_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  product_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'products',
      key: 'product_id'
    }
  },
  variant_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'product_variants',
      key: 'variant_id'
    }
  },
  url: {
    type: DataTypes.STRING(512),
    allowNull: false
  },
  alt_text: DataTypes.STRING(255),
  is_primary: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  sort_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  sequelize,
  modelName: 'ProductImage',
  tableName: 'product_images',
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at'
});
ProductImage.associate = (models) => {
  // Een ProductImage kan bij een Product horen
  ProductImage.belongsTo(models.Product, {
    foreignKey: 'product_id',
    as: 'Product'
  });
  
  // Een ProductImage kan bij een ProductVariant horen
  ProductImage.belongsTo(models.ProductVariant, {
    foreignKey: 'variant_id',
    as: 'ProductVariant'
  });
}
module.exports = ProductImage;