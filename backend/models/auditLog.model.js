const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class AuditLog extends Model {}
AuditLog.init({
  log_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  action_type: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  table_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  record_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  old_values: DataTypes.JSON,
  new_values: DataTypes.JSON
}, {
  sequelize,
  modelName: 'AuditLog',
  tableName: 'audit_logs',
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at'
});

module.exports = AuditLog;