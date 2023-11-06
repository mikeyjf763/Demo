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
const CartModal_1 = __importDefault(require("./CartModal"));
const OrdersModal_1 = __importDefault(require("./OrdersModal"));
function Home() {
    const [products, setProducts] = (0, react_1.useState)([]);
    const [quantities, setQuantities] = (0, react_1.useState)({});
    const dispatch = (0, react_redux_1.useDispatch)();
    const cart = (0, react_redux_1.useSelector)((state) => state.cart.items);
    const [isModalOpen, setIsModalOpen] = (0, react_1.useState)(false);
    const [isOrdersModalOpen, setIsOrdersModalOpen] = (0, react_1.useState)(false);
    const [orders, setOrders] = (0, react_1.useState)([]);
    // Fetch products from API
    (0, react_1.useEffect)(() => {
        fetch('http://localhost:7071/v1/items')
            .then(response => response.json())
            .then((data) => setProducts(data));
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
    const placeOrder = () => __awaiter(this, void 0, void 0, function* () {
        const total = cart.reduce((total, item) => total + item.item.price * item.quantity, 0);
        const id = generateID(); // replace this with func to generate an order id
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
        let order;
        if (response.status !== 204) { // Check if the response is not empty
            order = yield response.json();
            console.log('ordered placed!', order);
        }
    });
    (0, react_1.useEffect)(() => {
        const fetchOrders = () => __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch('http://localhost:7071/v1/orders');
            if (!response.ok) {
                console.error('Error fetching orders:', response.statusText);
                return;
            }
            const orders = yield response.json();
            setOrders(orders);
        });
        fetchOrders();
    }, [placeOrder]);
    return (<div>
      <nav className={Navbar_module_css_1.default.navbar}>
        <ul>
          <li><a href="/">Shop</a></li>
          <button onClick={toggleModal}>Cart</button>
          <button onClick={toggleOrdersModal}>Orders</button>
        </ul>
      </nav>
      <CartModal_1.default cart={cart} isModalOpen={isModalOpen} placeOrder={placeOrder}/>
      <OrdersModal_1.default orders={orders} isOrdersModalOpen={isOrdersModalOpen}/>
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
