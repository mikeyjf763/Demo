"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app/store.ts
const toolkit_1 = require("@reduxjs/toolkit");
const cartSlice_1 = __importDefault(require("../features/cartSlice"));
const store = (0, toolkit_1.configureStore)({
    reducer: {
        cart: cartSlice_1.default,
    },
});
exports.default = store;
