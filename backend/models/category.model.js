// models/Category.js
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');


class Category extends Model {}
Category.init({
  category_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  public_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true
  },
  slug: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false
  },
  description: DataTypes.TEXT,
  image_url: DataTypes.STRING(255),
  visible: {
    type: DataTypes.ENUM('visible', 'invisible', 'unlisted'),
    defaultValue: 'visible'
  },
  parent_id: {
    type: DataTypes.UUID,
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 'Category',
  tableName: 'categories',
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at'
});
Category.associate = (models) => {
  Category.belongsTo(models.Category, { as: 'Parent', foreignKey: 'parent_id' });
  Category.hasMany(models.Category, { as: 'Children', foreignKey: 'parent_id' });
  Category.hasMany(models.Product, {   as: 'Products', foreignKey: 'category_id'});
  Category.hasMany(models.CategoryImage, {
    as: 'CategoryImages',
    foreignKey: 'category_id'
  });
};



module.exports = Category;
