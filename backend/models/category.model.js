// models/Category.js
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Category extends Model {};
class CategoryImage extends Model {}

CategoryImage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'category_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    imageUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: 'CategoryImage',
    tableName: 'category_images',
    timestamps: true, // Enables automatic timestamps (createdAt, updatedAt)
    underscored: true, // Uses snake_case column names
  }
);

Category.init(
  {
  category_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  parent_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  front_image_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'category_images',
      key: 'id'
    }
  },
}, {
  sequelize,
  tableName: 'categories',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  paranoid: true
});


Category.belongsTo(Category, {
  as: 'ParentCategory',
  foreignKey: 'parent_id'
});
Category.hasMany(Category, {
  as: 'SubCategories',
  foreignKey: 'parent_id'
});

Category.hasMany(CategoryImage, { foreignKey: 'category_id' });
CategoryImage.belongsTo(Category, { foreignKey: 'category_id' });


module.exports = Category, CategoryImage;
