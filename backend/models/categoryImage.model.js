const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');
class CategoryImage extends Model {}


CategoryImage.init({
  image_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  category_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'categories',
      key: 'category_id'
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
  modelName: 'CategoryImage',
  tableName: 'category_images',
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at'
});


CategoryImage.associate = (models) => {
  // Een CategoryImage kan bij een category horen
  CategoryImage.belongsTo(models.Category, {
    foreignKey: 'category_id',
    as: 'Category'
  });
}


module.exports = CategoryImage;