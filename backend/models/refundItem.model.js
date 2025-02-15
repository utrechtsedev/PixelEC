const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class RefundItem extends Model {}

RefundItem.init({
    refund_item_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      validate: { min: 1 }
    }
  }, {
    sequelize,
    modelName: 'RefundItem',
    tableName: 'refund_items',
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  });

  module.exports = RefundItem;