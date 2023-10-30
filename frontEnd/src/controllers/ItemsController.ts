import { Route, Get, Path, Post, Body } from 'tsoa';
import { ItemModel as ItemMongooseModel } from '../models/itemSchema';
import { Item } from '../models/Item';

@Route('items')
export class ItemsController {
  @Get()
public async getProducts(): Promise<Item[]> {
  const documents = await ItemMongooseModel.find();

  if (!documents) {
    throw new Error('No products found');
  }

  const items: Item[] = documents.map(doc => ({
    _id: doc._id.toString(),
    name: doc.name,
    description: doc.description,
    price: doc.price,
    image: doc.image
  }));

  return items;
}

@Get('{id}')
  public async getProduct(@Path() id: string): Promise<Item | null> {
    const document = await ItemMongooseModel.findById(id);

    if (!document) {
      throw new Error('No product found');
    }

    const item: Item = {
      _id: document._id.toString(),
      name: document.name,
      description: document.description,
      price: document.price,
      image: document.image
    };

    return item;
  }

@Post()
public async addProduct(@Body() newItem: Item): Promise<void> {
  const item = new ItemMongooseModel(newItem);
  try {
    await item.save();
  } catch (error) {
    console.error(error);
    throw new Error('Error saving item');
  }
}
}