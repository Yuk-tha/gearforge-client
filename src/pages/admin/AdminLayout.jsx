import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGamepad, FaTachometerAlt, FaBox, FaShoppingBag, FaUsers, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const links = [
    { to: '/admin', label: 'Dashboard', icon: <FaTachometerAlt /> },
    { to: '/admin/products', label: 'Products', icon: <FaBox /> },
    { to: '/admin/orders', label: 'Orders', icon: <FaShoppingBag /> },
    { to: '/admin/users', label: 'Users', icon: <FaUsers /> },
  ];

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-border flex flex-col fixed h-full">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <FaGamepad className="text-primary text-xl" />
            <span className="text-white font-bold">
              Gear<span className="text-primary">Forge</span>
            </span>
          </Link>
          <p className="text-gray-500 text-xs mt-1">Admin Panel</p>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-4 space-y-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition ${
                location.pathname === link.to
                  ? 'bg-primary text-white'
                  : 'text-gray-400 hover:bg-surfaceLight hover:text-white'
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition w-full text-sm"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;