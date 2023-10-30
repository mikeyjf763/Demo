import { OrderItem } from './orderItem';

export interface Cart {
  id: string;
  items: OrderItem[];
  total: number;
}