import { FaTrash, FaArrowRight, FaShoppingCart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const CartPage = () => {
  const { cart, updateCartItem, removeFromCart } = useCart();
  const navigate = useNavigate();

  const items = cart?.items || [];
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleUpdate = async (itemId, quantity) => {
    if (quantity < 1) return;
    try {
      await updateCartItem(itemId, quantity);
    } catch {
      toast.error('Failed to update cart');
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await removeFromCart(itemId);
      toast.success('Item removed');
    } catch {
      toast.error('Failed to remove item');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-dark flex flex-col items-center justify-center gap-4">
        <FaShoppingCart className="text-6xl text-gray-600" />
        <h2 className="text-2xl font-bold text-white">Your cart is empty</h2>
        <p className="text-gray-400">Add some gaming gear to get started!</p>
        <Link to="/products" className="bg-primary hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-dark min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">
          Your <span className="text-primary">Cart</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item._id} className="glass rounded-xl p-4 flex gap-4 items-center">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-sm">{item.product.name}</h3>
                  <p className="text-primary font-bold mt-1">₹{item.product.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdate(item._id, item.quantity - 1)}
                    className="w-8 h-8 bg-surfaceLight border border-border rounded-lg text-white hover:border-primary transition"
                  >
                    -
                  </button>
                  <span className="text-white w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => handleUpdate(item._id, item.quantity + 1)}
                    className="w-8 h-8 bg-surfaceLight border border-border rounded-lg text-white hover:border-primary transition"
                  >
                    +
                  </button>
                </div>
                <p className="text-white font-bold w-24 text-right">
                  ₹{(item.product.price * item.quantity).toLocaleString()}
                </p>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-red-400 hover:text-red-300 transition ml-2"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="glass rounded-xl p-6 h-fit">
            <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Subtotal ({items.length} items)</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Shipping</span>
                <span className="text-green-400">Free</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between text-white font-bold">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-primary hover:bg-purple-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
            >
              Proceed to Checkout <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;