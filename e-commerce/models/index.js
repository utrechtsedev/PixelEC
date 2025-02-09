const { sequelize } = require('../config/db');

const User = require('./user.model');
const Address = require('./address.model');
const Category = require('./category.model');
const Product = require('./product.model');
const Order = require('./order.model');
const OrderItem = require('./orderitem.model');
const OrderAddress = require('./orderaddress.model');

// ASSOCIATIES hier (of in de static associate() van elk model):
// User.hasMany(Address, { foreignKey: 'user_id' });
// Address.belongsTo(User, { foreignKey: 'user_id' });
// ... etc.

// Exporteer de modellen + sequelize
module.exports = {
  sequelize,
  User,
  Address,
  Category,
  Product,
  Order,
  OrderItem,
  OrderAddress
};