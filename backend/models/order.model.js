// models/Order.js
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./user.model');

class Order extends Model {};

Order.init(
  {
  order_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  total_amount: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'paid', 'shipped', 'delivered', 'cancelled'),
    defaultValue: 'pending'
  },
  payment_method: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  payment_status: {
    type: DataTypes.ENUM('paid', 'unpaid', 'refunded'),
    defaultValue: 'unpaid'
  }

},
 {
  sequelize,
  tableName: 'orders',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
}
);

// Relatie: één gebruiker kan meerdere orders hebben
Order.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Order, { foreignKey: 'user_id' });

module.exports = Order;
