import mongoose from 'mongoose';

export interface FarmerSchema extends mongoose.Document {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const farmerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
      required: true,
    },
    lastName: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      index: true,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
      unique: true,
      required: true,
    },
    address: {
      type: String,
      trim: true,
      index: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    isAdmin: {
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

export default mongoose.model<FarmerSchema>('farmers', farmerSchema);
