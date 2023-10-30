import mongoose, { Schema } from 'mongoose';

const ItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

export const ItemModel = mongoose.model('Item', ItemSchema);