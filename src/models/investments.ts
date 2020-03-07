import mongoose from 'mongoose';

export interface InvestmentSchema extends mongoose.Document {
  user: string;
  farm: string;
  units: number;
  amount: number;
  returns: number;
  duration: string;
  investmentDate: Date;
}

const investmentSchema = new mongoose.Schema({
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
  duration: {
    type: String,
  },
  investmentDate: {
    type: mongoose.Schema.Types.Date,
    default: Date.now,
  },
});

export default mongoose.model<InvestmentSchema>(
  'investments',
  investmentSchema,
);
