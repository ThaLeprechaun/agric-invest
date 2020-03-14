import mongoose from 'mongoose';

export interface FarmSchema extends mongoose.Document {
  farmName: string;
  user: string;
  farmCategory: string;
  farmProduce: string;
  farmLocation: string;
  unitPrice: number;
  produceRate: number;
  unitsAvailable: number;
  duration: string;
  isVerified: Boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const farmSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    farmName: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
      unique: true,
      required: true,
    },
    farmCategory: {
      type: String,
      enum: ['livestock', 'plants', 'fruits', 'grains', 'others'],
    },
    farmProduce: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
      required: true,
    },
    farmLocation: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    produceRate: {
      type: Number,
      required: true,
    },
    unitsAvailable: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
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

export default mongoose.model<FarmSchema>('farms', farmSchema);
