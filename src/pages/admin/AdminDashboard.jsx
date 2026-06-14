import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBox, FaShoppingBag, FaUsers, FaRupeeSign } from 'react-icons/fa';
import { orderAPI, productAPI } from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [ordersRes, productsRes] = await Promise.all([
          orderAPI.getAll(),
          productAPI.getAll({ limit: 100 }),
        ]);
        const orders = ordersRes.data;
        const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
        setStats({
          totalProducts: productsRes.data.total,
          totalOrders: orders.length,
          totalRevenue,
          totalUsers: new Set(orders.map(o => o.user?._id)).size,
        });
        setRecentOrders(orders.slice(0, 5));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statusColors = {
    Pending: 'text-yellow-400 bg-yellow-400/10',
    Processing: 'text-blue-400 bg-blue-400/10',
    Shipped: 'text-purple-400 bg-purple-400/10',
    Delivered: 'text-green-400 bg-green-400/10',
  };

  const statCards = [
    { label: 'Total Products', value: stats.totalProducts, icon: <FaBox />, color: 'text-primary' },
    { label: 'Total Orders', value: stats.totalOrders, icon: <FaShoppingBag />, color: 'text-neon' },
    { label: 'Total Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, icon: <FaRupeeSign />, color: 'text-green-400' },
    { label: 'Total Users', value: stats.totalUsers, icon: <FaUsers />, color: 'text-yellow-400' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-8">
        Admin <span className="text-primary">Dashboard</span>
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statCards.map((card, i) => (
          <div key={i} className="glass rounded-xl p-6">
            <div className={`text-3xl mb-3 ${card.color}`}>{card.icon}</div>
            <p className="text-gray-400 text-sm">{card.label}</p>
            <p className="text-white text-2xl font-bold mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="glass rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Recent Orders</h2>
          <Link to="/admin/orders" className="text-primary text-sm hover:underline">View All</Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-surfaceLight rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 border-b border-border">
                  <th className="text-left py-3">Order ID</th>
                  <th className="text-left py-3">Customer</th>
                  <th className="text-left py-3">Amount</th>
                  <th className="text-left py-3">Status</th>
                  <th className="text-left py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order._id} className="border-b border-border/50 hover:bg-surfaceLight transition">
                    <td className="py-3 text-gray-400 font-mono text-xs">{order._id.slice(-8)}</td>
                    <td className="py-3 text-white">{order.user?.name || 'N/A'}</td>
                    <td className="py-3 text-white font-bold">₹{order.totalAmount.toLocaleString()}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${statusColors[order.orderStatus]}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="py-3 text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;