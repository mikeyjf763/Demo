import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderItem } from '../src/models//orderItem';

interface CartState {
  items: OrderItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<OrderItem>) => {
      // Check if item is already in cart
      const existingItem = state.items.find(item => item.item._id === action.payload.item._id);

      if (existingItem) {
        // If item exists, increment the quantity
        existingItem.quantity += action.payload.quantity;
      } else {
        // If item does not exist, add the new item to cart
        state.items.push(action.payload);
      }
    },
    updateQuantity: (state, action: PayloadAction<{ _id: string, quantity: number }>) => {
      // Find the item with the given ID and update its quantity
      const item = state.items.find(item => item.item._id === action.payload._id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      // Remove the item with the given ID from the cart
      state.items = state.items.filter(item => item.item._id !== action.payload);
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;