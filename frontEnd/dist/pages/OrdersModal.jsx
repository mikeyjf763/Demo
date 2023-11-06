"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const OrdersModal = ({ orders, isOrdersModalOpen }) => {
    return (<div className={`modal ${isOrdersModalOpen ? 'open' : ''}`}>
      {orders.map((order) => (<div key={order.id}>
          <h3>Order ID: {order.id}</h3>
          <p>Total Price: {order.total}</p>
          {order.items.map((item) => (<div key={item._id}>
              <p>Quantity: {item.quantity}</p>
            </div>))}
        </div>))}
    </div>);
};
exports.default = OrdersModal;
