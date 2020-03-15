import mongoose from 'mongoose';

export interface InvestmentSchema extends mongoose.Document {
  user: string;
  farm: string;
  units: number;
  amount: number;
  returns: number;
  investmentDate: Date;
  deletedAt: Date | null;
}

const investmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    farm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'farms',
    },
    units: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    returns: {
      type: Number,
    },
    investmentDate: {
      type: Date,
      default: Date.now,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<InvestmentSchema>(
  'investments',
  investmentSchema,
);
