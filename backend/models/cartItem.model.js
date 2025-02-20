const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class CartItem extends Model{};

CartItem.init({
        id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
        },
        product_id: {
        type: DataTypes.UUID,
        allowNull: false
        },
        variant_id: {
        type: DataTypes.UUID,
        allowNull: true
        },
        quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        validate: {
            min: 1
        }
    }
},
{
    sequelize,
    modelName: 'CartItem',
    tableName: 'cart_items',
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
})

CartItem.associate = (models) => {
    CartItem.belongsTo(models.Cart, { foreignKey: 'cart_id' });
    CartItem.belongsTo(models.Product, { foreignKey: 'product_id' });
    CartItem.belongsTo(models.ProductVariant, { foreignKey: 'variant_id' });
};

module.exports = CartItem;