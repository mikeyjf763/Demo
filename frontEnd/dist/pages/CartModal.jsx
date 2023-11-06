"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const cartSlice_1 = require("../features/cartSlice");
const CartModal = ({ cart, isModalOpen, placeOrder }) => {
    const dispatch = (0, react_redux_1.useDispatch)();
    return (<div className={`modal ${isModalOpen ? 'open' : ''}`}>
      {cart.map((item) => (<div key={item.item._id}>
          <h3>{item.item.name}</h3>
          <p>Quanity: 
            <input type="number" value={item.quantity} onChange={(e) => {
                if (typeof item.item._id === 'string') {
                    dispatch((0, cartSlice_1.updateQuantity)({
                        _id: item.item._id,
                        quantity: Number(e.target.value)
                    }));
                }
            }} min="1"/>
          </p>
          <p>Price: ${item.item.price * item.quantity}</p>
          <button onClick={() => {
                if (typeof item.item._id === 'string') {
                    dispatch((0, cartSlice_1.removeFromCart)(item.item._id));
                }
            }}>Remove</button>
        </div>))}
      <h2>Total: {cart.reduce((total, item) => total + item.item.price * item.quantity, 0)}</h2>
      <button style={{ position: 'absolute', right: '10px', bottom: '10px' }} onClick={placeOrder}>
        Place Order
      </button>
    </div>);
};
exports.default = CartModal;
