import React from 'react';

interface OrderType {
  id: string;
  total: number;
  items: Array<{
    _id: string;
    name: string;
    quantity: number;
  }>;
}

interface OrdersModalProps {
  orders: OrderType[];
  isOrdersModalOpen: boolean;
}

const OrdersModal: React.FC<OrdersModalProps> = ({ orders, isOrdersModalOpen }) => {
  return (
    <div className={`modal ${isOrdersModalOpen ? 'open' : ''}`}>
      {orders.map((order) => (
        <div key={order.id}>
          <h3>Order ID: {order.id}</h3>
          <p>Total Price: {order.total}</p>
          {order.items.map((item) => (
            <div key={item._id}>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default OrdersModal;