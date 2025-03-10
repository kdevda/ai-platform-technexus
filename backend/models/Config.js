const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

/**
 * Config model for storing application configuration settings
 * Used for API keys, feature flags, and other configurable settings
 */
const Config = sequelize.define('Config', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  key: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: 'Configuration key (e.g., RESEND_API_KEY)'
  },
  value: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Configuration value'
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Human-readable description of this configuration setting'
  },
  isSecret: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Whether this value should be treated as a secret (for UI display purposes)'
  },
  isEncrypted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Whether this value is stored encrypted in the database'
  }
}, {
  timestamps: true,
  indexes: [
    { unique: true, fields: ['key'] }
  ]
});

module.exports = Config; 