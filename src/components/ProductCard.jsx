import { Link } from 'react-router-dom';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { user } = useAuth();
  const { addToCart } = useCart();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }
    try {
      await addToCart(product._id, 1);
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  return (
    <Link to={`/products/${product._id}`} className="group">
      <div className="glass rounded-xl overflow-hidden hover:border-primary/50 transition duration-300 h-full flex flex-col">
        {/* Image */}
        <div className="relative overflow-hidden h-48">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-red-400 font-semibold">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col flex-1">
          <span className="text-xs text-primary mb-1">{product.category}</span>
          <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2 flex-1">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <FaStar className="text-yellow-400 text-xs" />
            <span className="text-gray-400 text-xs">{product.rating}</span>
          </div>

          {/* Price + Cart */}
          <div className="flex items-center justify-between mt-auto">
            <span className="text-white font-bold">₹{product.price.toLocaleString()}</span>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="bg-primary hover:bg-purple-700 disabled:opacity-50 text-white p-2 rounded-lg transition"
            >
              <FaShoppingCart className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;