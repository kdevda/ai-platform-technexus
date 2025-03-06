import mongoose, { Document, Schema } from 'mongoose';

export interface IIntegration extends Document {
  name: string;
  provider: string;
  type: string;
  apiKey: string;
  apiEndpoint?: string;
  organizationId?: string;
  isActive: boolean;
  metadata?: Record<string, any>;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const integrationSchema = new Schema<IIntegration>(
  {
    name: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    apiKey: {
      type: String,
      required: true,
    },
    apiEndpoint: {
      type: String,
    },
    organizationId: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    metadata: {
      type: Schema.Types.Mixed,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Integration = mongoose.model<IIntegration>('Integration', integrationSchema);

export default Integration; 