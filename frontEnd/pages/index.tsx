import { useState, useEffect } from 'react';
import styles from '../css/Navbar.module.css';
import '../css/CartModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateQuantity, removeFromCart } from '../features/cartSlice';
import { RootState } from '../features/store';
import CartModal from './CartModal';
import OrdersModal from './OrdersModal';

interface Item {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface OrderItem {
  item: Item;
  quantity: number;
}


export default function Home() {
  const [products, setProducts] = useState<Item[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items as OrderItem[]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
  const [orders, setOrders] = useState<OrderType[]>([]);

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

  function generateID() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  const placeOrder = async () => {
    const total = cart.reduce((total, item) => total + item.item.price * item.quantity, 0);
    const id = generateID(); // replace this with func to generate an order id

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
      <CartModal cart={cart} isModalOpen={isModalOpen} placeOrder={placeOrder} />
      <OrdersModal orders={orders} isOrdersModalOpen={isOrdersModalOpen} />
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