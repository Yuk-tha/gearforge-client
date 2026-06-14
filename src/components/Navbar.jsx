import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaGamepad, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <FaGamepad className="text-primary text-2xl" />
          <span className="text-xl font-bold text-white">
            Gear<span className="text-primary">Forge</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-300 hover:text-primary transition">Home</Link>
          <Link to="/products" className="text-gray-300 hover:text-primary transition">Products</Link>
          {user && (
            <Link to="/orders" className="text-gray-300 hover:text-primary transition">My Orders</Link>
          )}
          {user?.role === 'admin' && (
            <Link to="/admin" className="text-neon hover:text-primary transition">Admin</Link>
          )}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
          {/* Cart */}
          {user && (
            <Link to="/cart" className="relative text-gray-300 hover:text-primary transition">
              <FaShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          {/* Auth Buttons */}
          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/profile" className="flex items-center gap-1 text-gray-300 hover:text-primary transition">
                <FaUser className="text-sm" />
                <span className="text-sm">{user.name}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-primary hover:bg-purple-700 text-white text-sm px-4 py-1.5 rounded-lg transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-gray-300 hover:text-primary text-sm transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-primary hover:bg-purple-700 text-white text-sm px-4 py-1.5 rounded-lg transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface border-t border-border px-4 py-4 flex flex-col gap-4">
          <Link to="/" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-primary">Home</Link>
          <Link to="/products" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-primary">Products</Link>
          {user && (
            <>
              <Link to="/cart" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-primary">Cart ({cartCount})</Link>
              <Link to="/orders" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-primary">My Orders</Link>
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-primary">Profile</Link>
            </>
          )}
          {user?.role === 'admin' && (
            <Link to="/admin" onClick={() => setMenuOpen(false)} className="text-neon">Admin Dashboard</Link>
          )}
          {user ? (
            <button onClick={handleLogout} className="text-left text-red-400 hover:text-red-300">Logout</button>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-primary">Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-primary">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;