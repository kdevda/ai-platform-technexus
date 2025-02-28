import mongoose, { Document, Schema } from 'mongoose';

export interface ILoan extends Document {
  user: mongoose.Types.ObjectId;
  amount: number;
  interestRate: number;
  term: number; // in months
  purpose: string;
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'closed';
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const loanSchema = new Schema<ILoan>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    interestRate: {
      type: Number,
      required: true,
    },
    term: {
      type: Number,
      required: true,
    },
    purpose: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'active', 'closed'],
      default: 'pending',
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Loan = mongoose.model<ILoan>('Loan', loanSchema);

export default Loan; 