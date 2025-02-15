const { sequelize } = require('../config/db');

// Import models from individual files
const Address = require('./address.model');
const Attribute = require('./attribute.model');
const AuditLog = require('./auditLog.model');
const Brand = require('./brand.model');
const Category = require('./category.model');
const Inventory = require('./inventory.model');
const Order = require('./order.model');
const OrderAddress = require('./orderaddress.model');
const OrderItem = require('./orderitem.model');
const Payment = require('./payment.model');
const Product = require('./product.model');
const ProductAttribute = require('./productAttribute.model');
const productAttribute = require('./productAttribute.model');
const ProductImage = require('./productImage.model');
const ProductVariant = require('./productVariant.model');
const Refund = require('./refund.model');
const RefundItem = require('./refundItem.model');
const User = require('./user.model');
const Warehouse = require('./warehouse.model');


// Define relationships
Product.belongsTo(Brand);
Brand.hasMany(Product);

ProductVariant.belongsTo(Product);
Product.hasMany(ProductVariant);

Category.belongsTo(Category, { as: 'Parent', foreignKey: 'parent_category_id' });
Category.hasMany(Category, { as: 'Children', foreignKey: 'parent_category_id' });

Product.belongsToMany(Category, { through: 'product_categories' });
Category.belongsToMany(Product, { through: 'product_categories' });

Order.belongsTo(User);
User.hasMany(Order);

OrderItem.belongsTo(Order);
Order.hasMany(OrderItem);

OrderItem.belongsTo(ProductVariant);
ProductVariant.hasMany(OrderItem);

Payment.belongsTo(Order);
Order.hasOne(Payment);

Address.belongsTo(User);
User.hasMany(Address);

Warehouse.belongsTo(Address);
Address.hasMany(Warehouse);

Inventory.belongsTo(ProductVariant);
ProductVariant.hasMany(Inventory);

Inventory.belongsTo(Warehouse);
Warehouse.hasMany(Inventory);

Product.belongsToMany(Attribute, { through: ProductAttribute });
Attribute.belongsToMany(Product, { through: ProductAttribute });

AuditLog.belongsTo(User);
User.hasMany(AuditLog);

ProductImage.belongsTo(Product);
Product.hasMany(ProductImage);

ProductImage.belongsTo(ProductVariant);
ProductVariant.hasMany(ProductImage);

Refund.belongsTo(Order);
Refund.belongsTo(Payment);
Refund.belongsTo(User, { as: 'Processor', foreignKey: 'processed_by' });
Refund.hasMany(RefundItem);

RefundItem.belongsTo(Refund);
RefundItem.belongsTo(OrderItem);

// Export models
module.exports = {
  sequelize,
  Address,
  Attribute,
  AuditLog,
  Brand,
  Category,
  Inventory,
  Order,
  OrderAddress,
  OrderItem,
  Payment,
  Product,
  productAttribute,
  ProductImage,
  ProductVariant,
  User,
  Warehouse
};