const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');


class OrderItem extends Model {}
OrderItem.init({
  order_item_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1 }
  },
  price_at_purchase: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  attributes: DataTypes.JSON
}, {
  sequelize,
  modelName: 'OrderItem',
  tableName: 'order_items',
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at'
});
OrderItem.associate = (models) => {

OrderItem.belongsTo(models.Order);
OrderItem.belongsTo(models.ProductVariant);
}
module.exports = OrderItem;
