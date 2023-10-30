import { Key, ReactNode } from 'react';
import { Item } from './Item';

export interface OrderItem {
  item: Item;
  quantity: number;
}