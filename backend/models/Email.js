const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

/**
 * Email model for storing all emails sent through the platform
 */
const Email = sequelize.define('Email', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  from: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  to: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  cc: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: {
        args: true,
        msg: "Invalid email format in CC field"
      }
    }
  },
  bcc: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: {
        args: true,
        msg: "Invalid email format in BCC field"
      }
    }
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('draft', 'sent', 'failed'),
    defaultValue: 'draft'
  },
  sentAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  connectionId: {
    type: DataTypes.UUID,
    allowNull: true
  },
  connectionType: {
    type: DataTypes.STRING,
    allowNull: true
  },
  attachments: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  metadata: {
    type: DataTypes.JSONB,
    defaultValue: {}
  }
}, {
  timestamps: true,
  indexes: [
    { fields: ['from'] },
    { fields: ['to'] },
    { fields: ['status'] },
    { fields: ['connectionId', 'connectionType'] },
    { fields: ['senderId'] }
  ]
});

// Define relationships
Email.belongsTo(User, { as: 'sender', foreignKey: 'senderId' });

// Hook to automatically set sentAt when status changes to 'sent'
Email.beforeUpdate(async (email) => {
  if (email.changed('status') && email.status === 'sent') {
    email.sentAt = new Date();
  }
});

module.exports = Email; 