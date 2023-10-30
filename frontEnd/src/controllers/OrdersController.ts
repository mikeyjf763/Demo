import { Route, Get, Post, Body, Path } from 'tsoa';
import { Cart } from '../models/order';
import { OrderModel as OrderMongooseModel } from '../models/orderSchema';
import{ OrderItem }from '../models/orderItem';


@Route('orders')
export class OrdersController {
  @Get()
  public async getOrders(): Promise<Cart[]> {
    const documents = await OrderMongooseModel.find();

    if (!documents) {
      throw new Error('No orders found');
    }

    const orders: Cart[] = documents.map(doc => ({
        id: doc.id,
        items: doc.items.map((item: any): OrderItem => ({
          item: item.item,
          quantity: item.quantity,
        })),
        total: doc.total,
      }));

    return orders;
  }

  @Get('{orderId}')
public async getOrderById(orderId: string): Promise<Cart> {
  const document = await OrderMongooseModel.findById(orderId);

  if (!document) {
    throw new Error('Order not found');
  }

  const order: Cart = {
    id: document.id,
    items: document.items.map((item: any): OrderItem => ({
      item: item.item,
      quantity: item.quantity,
    })),
    total: document.total,
  };

  return order;
}

  @Post()
  public async createOrder(@Body() newOrder: Cart): Promise<void> {
    const order = new OrderMongooseModel(newOrder);
    await order.save();
    console.log("order placed!,", order)
  }
}