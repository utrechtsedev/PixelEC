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
  transaction_id: {
    type: DataTypes.STRING(255)
  },
  metadata: {
    type: DataTypes.JSON
  },
  refunded_amount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  available_for_refund: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
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