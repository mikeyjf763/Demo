import mongoose, { Schema } from 'mongoose';


export interface Item {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
  }


const ItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

export const ItemModel = mongoose.model('Item', ItemSchema);

