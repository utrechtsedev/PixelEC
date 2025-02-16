const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Brand extends Model {}
Brand.init({
  brand_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false
  },
  logo_url: DataTypes.STRING(255),
  description: DataTypes.TEXT
}, {
  sequelize,
  modelName: 'Brand',
  tableName: 'brands',
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at'
});
Brand.associate = (models) => {

Brand.hasMany(models.Product, {foreignKey: 'brand_id'});
}

module.exports = Brand;