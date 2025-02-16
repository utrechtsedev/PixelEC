const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Attribute extends Model {}
Attribute.init({
  attribute_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('string', 'number', 'boolean', 'options'),
    defaultValue: 'string'
  }
}, {
  sequelize,
  modelName: 'Attribute',
  tableName: 'attributes',
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at'
});
Attribute.associate = (models) => {

Attribute.belongsToMany(models.Product, { through: models.ProductAttribute });
}

module.exports = Attribute;