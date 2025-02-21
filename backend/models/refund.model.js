const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');



class Refund extends Model {}

Refund.init({
    refund_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    currency: DataTypes.STRING(3),
    status: {
      type: DataTypes.ENUM('requested', 'approved', 'processed', 'rejected'),
      defaultValue: 'requested'
    },
    reason: DataTypes.TEXT,
    restock_items: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    refund_method: DataTypes.ENUM('original', 'credit', 'other')
  }, {
    sequelize,
    modelName: 'Refund',
    tableName: 'refunds',
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  });
  
  Refund.associate = (models) => {

  Refund.belongsTo(models.Order);
  Refund.belongsTo(models.Payment);
  Refund.belongsTo(models.User, { as: 'Processor', foreignKey: 'processed_by' });
  Refund.hasMany(models.RefundItem);
  }
  module.exports = Refund;