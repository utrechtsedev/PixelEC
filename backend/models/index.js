const { sequelize } = require('../config/db');

// Import models from individual files
const Brand = require('./brand.model');
const Category = require('./category.model');
const User = require('./user.model');
const Address = require('./address.model');
const Product = require('./product.model');
const ProductVariant = require('./productVariant.model');
const Order = require('./order.model');
const OrderItem = require('./orderItem.model');
const Payment = require('./payment.model');
const Refund = require('./refund.model');
const RefundItem = require('./refundItem.model');
const Inventory = require('./inventory.model');
const ProductImage = require('./productImage.model');
const AuditLog = require('./auditLog.model');
const OrderAddress = require('./orderAddress.model');
const Cart = require('./cart.model');
const CartItem = require('./cartItem.model')
const StorefrontSettings  = require('./storefrontSettings.model')

const models = {
  StorefrontSettings,
  Brand,
  User,
  Address,
  Category,
  Product, 
  ProductVariant,
  ProductImage,
  Inventory,
  OrderAddress,
  Order,
  OrderItem,
  Payment,
  Refund,
  RefundItem,
  AuditLog,
  Cart,
  CartItem,
};

Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models); // Pass models to associate function
  }
});



// Export models
module.exports = {models, sequelize};