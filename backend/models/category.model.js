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

module.exports = Category;
