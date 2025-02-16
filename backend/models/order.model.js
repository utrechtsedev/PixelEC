// models/Order.js
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');


class Order extends Model {}
Order.init({
  order_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
    defaultValue: 'pending'
  },
  currency_code: {
    type: DataTypes.STRING(3),
    defaultValue: 'USD'
  },
  guest_checkout_data: DataTypes.JSON
}, {
  sequelize,
  modelName: 'Order',
  tableName: 'orders',
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at'
});
Order.associate = (models) => {

Order.belongsTo(models.User);
Order.hasOne(models.Payment);
Order.hasMany(models.OrderItem);
}
module.exports = Order;
