const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Inventory extends Model {}
Inventory.init({
  inventory_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  stock_quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  low_stock_threshold: {
    type: DataTypes.INTEGER,
    defaultValue: 10
  },
  last_restocked: DataTypes.DATE
}, {
  sequelize,
  modelName: 'Inventory',
  tableName: 'inventory',
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at'
});

module.exports = Inventory; 