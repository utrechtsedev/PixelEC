const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');


class Warehouse extends Model {}
Warehouse.init({
  warehouse_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Warehouse',
  tableName: 'warehouses',
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at'
});
Warehouse.associate = (models) => {

Warehouse.belongsTo(models.Address);
Warehouse.hasMany(models.Inventory);
}
module.exports = Warehouse;