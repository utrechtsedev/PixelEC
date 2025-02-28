// models/User.js
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');



class User extends Model {}
User.init({
  user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  first_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false,
    validate: { isEmail: true }
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  phone_number: DataTypes.STRING(20),
  avatar_url: DataTypes.STRING(255),
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    defaultValue: 'user',
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at'
});
User.associate = (models) => {

User.hasMany(models.Order);
User.hasMany(models.Address);
User.hasMany(models.AuditLog);
}
module.exports = User;