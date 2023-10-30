"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Navbar_module_css_1 = __importDefault(require("../css/Navbar.module.css"));
require("../css/CartModal.css");
const react_redux_1 = require("react-redux");
const cartSlice_1 = require("../features/cartSlice");
function Home() {
    const [products, setProducts] = (0, react_1.useState)([]);
    const [quantities, setQuantities] = (0, react_1.useState)({});
    const dispatch = (0, react_redux_1.useDispatch)();
    const cart = (0, react_redux_1.useSelector)((state) => state.cart.items);
    const [isModalOpen, setIsModalOpen] = (0, react_1.useState)(false);
    //REMOVE
    //Console log state of cart
    (0, react_1.useEffect)(() => {
        console.log(cart);
    }, [cart]);
    // Fetch products from API
    (0, react_1.useEffect)(() => {
        fetch('http://localhost:7071/v1/items')
            .then(response => response.json())
            .then((data) => setProducts(data));
    }, []);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    const placeOrder = () => __awaiter(this, void 0, void 0, function* () {
        const total = cart.reduce((total, item) => total + item.item.price * item.quantity, 0);
        const id = "1"; // replace this with your own function to generate an order id
        // Convert cart object to an array of items
        const items = Object.values(cart);
        console.log(JSON.stringify({ id, items, total }));
        const response = yield fetch('http://localhost:7071/v1/orders', {
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
        const order = yield response.json();
        console.log('Order placed!', order);
    });
    return (<div>
      <nav className={Navbar_module_css_1.default.navbar}>
        <ul>
          <li><a href="/">Shop</a></li>
          <button onClick={toggleModal}>Cart</button>
          <li><a href="/orders">Orders</a></li>
        </ul>
      </nav>
      <div className={`modal ${isModalOpen ? 'open' : ''}`}>
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
      </div>
      <header style={{ textAlign: 'center', padding: '50px 0' }}>
        <h1>Welcome to Our Store</h1>
        <p>Explore our collection of products</p>
      </header>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
      {products.map(product => (<div key={product._id.toString()} style={{ margin: '20px', textAlign: 'center' }}>
          <img src={product.image} alt={product.name} style={{ width: '200px' }}/>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <input type="number" value={quantities[product._id] || 1} onChange={(e) => setQuantities(Object.assign(Object.assign({}, quantities), { [product._id]: Number(e.target.value) }))} min="1"/>
        <button onClick={() => dispatch((0, cartSlice_1.addToCart)({
                item: product,
                quantity: quantities[product._id] || 1,
            }))}>Add to Cart</button>
        </div>))}
      </div>
    </div>);
}
exports.default = Home;
