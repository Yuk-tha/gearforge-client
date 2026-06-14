import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import ProfilePage from './pages/ProfilePage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import ProtectedRoute from './routes/ProtectedRoute';
import AIAssistant from './components/AIAssistant';

const AdminRoute = ({ children }) => (
  <ProtectedRoute adminOnly>
    <AdminLayout>{children}</AdminLayout>
  </ProtectedRoute>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#1A1A1A',
                color: '#fff',
                border: '1px solid #2A2A2A',
              },
            }}
          />
          <Routes>
            {/* Public routes with Navbar */}
            <Route path="/" element={<><Navbar /><HomePage /></>} />
            <Route path="/login" element={<><Navbar /><LoginPage /></>} />
            <Route path="/register" element={<><Navbar /><RegisterPage /></>} />
            <Route path="/products" element={<><Navbar /><ProductsPage /></>} />
            <Route path="/products/:id" element={<><Navbar /><ProductDetailPage /></>} />
            <Route path="/cart" element={<><Navbar /><ProtectedRoute><CartPage /></ProtectedRoute></>} />
            <Route path="/checkout" element={<><Navbar /><ProtectedRoute><CheckoutPage /></ProtectedRoute></>} />
            <Route path="/orders" element={<><Navbar /><ProtectedRoute><OrdersPage /></ProtectedRoute></>} />
            <Route path="/profile" element={<><Navbar /><ProtectedRoute><ProfilePage /></ProtectedRoute></>} />

            {/* Admin routes - No Navbar, has Sidebar */}
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
            <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
            <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
          </Routes>
          <AIAssistant />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;