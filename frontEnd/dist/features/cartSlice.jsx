"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromCart = exports.updateQuantity = exports.addToCart = exports.cartSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    items: [],
};
exports.cartSlice = (0, toolkit_1.createSlice)({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // Check if item is already in cart
            const existingItem = state.items.find(item => item.item._id === action.payload.item._id);
            if (existingItem) {
                // If item exists, increment the quantity
                existingItem.quantity += action.payload.quantity;
            }
            else {
                // If item does not exist, add the new item to cart
                state.items.push(action.payload);
            }
        },
        updateQuantity: (state, action) => {
            // Find the item with the given ID and update its quantity
            const item = state.items.find(item => item.item._id === action.payload._id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        removeFromCart: (state, action) => {
            // Remove the item with the given ID from the cart
            state.items = state.items.filter(item => item.item._id !== action.payload);
        },
    },
});
_a = exports.cartSlice.actions, exports.addToCart = _a.addToCart, exports.updateQuantity = _a.updateQuantity, exports.removeFromCart = _a.removeFromCart;
exports.default = exports.cartSlice.reducer;
