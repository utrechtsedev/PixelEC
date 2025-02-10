// models/Category.js
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Category extends Model {};

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
  }
}, {
  sequelize,
  tableName: 'categories',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
}
);

// Zelfrelatie: een categorie kan subcategorieën hebben
Category.belongsTo(Category, {
  as: 'ParentCategory',
  foreignKey: 'parent_id'
});
Category.hasMany(Category, {
  as: 'SubCategories',
  foreignKey: 'parent_id'
});

module.exports = Category;
