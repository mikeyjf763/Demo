import mongoose, { Schema, Document } from 'mongoose';
import { Item } from './Item';

export interface CartDocument extends Document {
  id: string;
  items: Item[];
  total: number;
}

const CartSchema: Schema = new Schema({
  id: { type: String, required: true },
  items: [{ 
    item: { type: Schema.Types.ObjectId, ref: 'Item' },
    quantity: { type: Number, required: true }
  }],
  total: { type: Number, required: true },
});

export const OrderModel = mongoose.model<CartDocument>('Cart', CartSchema);