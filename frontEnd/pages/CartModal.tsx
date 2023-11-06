import React from 'react';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../features/cartSlice';
import { OrderItem } from '../src/models/orderItem';

interface CartModalProps {
  cart: OrderItem[];
  isModalOpen: boolean;
  placeOrder: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ cart, isModalOpen, placeOrder }) => {
  const dispatch = useDispatch();

  return (
    <div className={`modal ${isModalOpen ? 'open' : ''}`}>
      {cart.map((item) => (
        <div key={item.item._id}>
          <h3>{item.item.name}</h3>
          <p>Quanity: 
            <input 
              type="number" 
              value={item.quantity} 
              onChange={(e) => {
                if (typeof item.item._id === 'string'){
                  dispatch(updateQuantity({
                    _id: item.item._id,
                    quantity: Number(e.target.value)
                  }))
                }
              }}
              min="1" 
            />
          </p>
          <p>Price: ${item.item.price * item.quantity}</p>
          <button onClick={() => {
            if (typeof item.item._id === 'string'){
              dispatch(removeFromCart(item.item._id))
            }
          }}>Remove</button>
        </div>
      ))}
      <h2>Total: {cart.reduce((total, item) => total + item.item.price * item.quantity, 0)}</h2>
      <button style={{ position: 'absolute', right: '10px', bottom: '10px' }} onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
};

export default CartModal;