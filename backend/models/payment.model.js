const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Payment extends Model {}
Payment.init({
  payment_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING(3),
    allowNull: false
  },
  payment_method: DataTypes.STRING(50),
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed', 'refunded'),
    defaultValue: 'pending'
  },
  transaction_id: DataTypes.STRING(255),
  metadata: DataTypes.JSON
}, {
  sequelize,
  modelName: 'Payment',
  tableName: 'payments',
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at'
});

module.exports = Payment;  