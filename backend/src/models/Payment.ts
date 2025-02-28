import mongoose, { Document, Schema } from 'mongoose';

export interface IPayment extends Document {
  loan: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  amount: number;
  paymentDate: Date;
  paymentMethod: 'credit_card' | 'debit_card' | 'bank_transfer' | 'cash' | 'other';
  status: 'pending' | 'completed' | 'failed';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    loan: {
      type: Schema.Types.ObjectId,
      ref: 'Loan',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    paymentMethod: {
      type: String,
      enum: ['credit_card', 'debit_card', 'bank_transfer', 'cash', 'other'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model<IPayment>('Payment', paymentSchema);

export default Payment; 