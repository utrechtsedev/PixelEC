const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Cart extends Model{};

Cart.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    session_id: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Cart',
    tableName: 'carts',
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  }
);

Cart.associate = (models) => {
    Cart.belongsTo(models.User, { foreignKey: 'user_id' });
    Cart.hasMany(models.CartItem, { foreignKey: 'cart_id' });
  };

module.exports = Cart;