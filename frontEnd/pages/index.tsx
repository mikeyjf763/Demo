import { useState, useEffect } from 'react';
import styles from '../css/Navbar.module.css';
import '../css/CartModal.css';
import { Schema } from 'mongoose';
import { Item } from '@/src/models/Item';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateQuantity, removeFromCart } from '../features/cartSlice';
import { RootState } from '../features/store';
import { OrderItem } from '../src/models/orderItem';



export default function Home() {
  const [products, setProducts] = useState<Item[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items as OrderItem[]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);

  type OrderType = {
    id: string;
    total: number;
    items: Array<{
      _id: string;
      name: string;
      quantity: number;
    }>;
  };

  // Fetch products from API
  useEffect(() => {
    fetch('http://localhost:7071/v1/items') 
      .then(response => response.json())
      .then((data: Item[]) => setProducts(data));
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleOrdersModal = () => {
    setIsOrdersModalOpen(!isOrdersModalOpen);
  };

  const [orders, setOrders] = useState<OrderType[]>([]);



  const placeOrder = async () => {
    const total = cart.reduce((total, item) => total + item.item.price * item.quantity, 0);
    const id = "1"; // replace this with func to generate an order id
  
    // Convert cart object to an array of items
    const items = Object.values(cart);
    console.log(JSON.stringify({ id, items, total }))

  
    const response = await fetch('http://localhost:7071/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, items, total })
    });
    console.log(response)
    if (!response.ok) {
      console.error('Error placing order:', response.statusText);
      return;
    }
    
    let order;
    if (response.status !== 204) { // Check if the response is not empty
      order = await response.json();
      console.log('ordered placed!', order)
    }
  }

  useEffect(() => {
  const fetchOrders = async () => {
    const response = await fetch('http://localhost:7071/v1/orders');
    if (!response.ok) {
      console.error('Error fetching orders:', response.statusText);
      return;
    }
    const orders = await response.json();
    setOrders(orders);
  };

  fetchOrders();
}, [placeOrder]);

  return (
    <div>
      <nav className={styles.navbar}>
        <ul>
          <li><a href="/">Shop</a></li>
          <button onClick={toggleModal}>Cart</button>
          <button onClick={toggleOrdersModal}>Orders</button>
        </ul>
      </nav>
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
      <header style={{ textAlign: 'center', padding: '50px 0' }}>
        <h1>Welcome to Our Store</h1>
        <p>Explore our collection of products</p>
      </header>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
      {products.map(product => (
        <div key={product._id.toString()} style={{ margin: '20px', textAlign: 'center' }}>
          <img src={product.image} alt={product.name} style={{ width: '200px' }} />
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <input 
            type="number" 
            value={quantities[product._id] || 1} 
            onChange={(e) => setQuantities({
              ...quantities,
              [product._id]: Number(e.target.value)
            })} 
            min="1" 
          />
        <button onClick={() => dispatch(addToCart({  
          item: product, 
          quantity: quantities[product._id] || 1,
        }))}>Add to Cart</button>
        </div>
))}
      </div>
    </div>
  );
}