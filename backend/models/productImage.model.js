const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class ProductImage extends Model {}
ProductImage.init({
  image_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
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

module.exports = ProductImage;