const { sequelize } = require('../config/db');

const User = require('./user.model');
const Address = require('./address.model');
const { Category, CategoryImage } = require('./category.model');
const { Product, ProductImage} = require('./product.model');
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
  CategoryImage,
  Product,
  ProductImage,
  Order,
  OrderItem,
  OrderAddress
};