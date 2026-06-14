import { useState, useEffect } from 'react';
import { orderAPI } from '../../services/api';
import toast from 'react-hot-toast';

const statusColors = {
  Pending: 'text-yellow-400 bg-yellow-400/10',
  Processing: 'text-blue-400 bg-blue-400/10',
  Shipped: 'text-purple-400 bg-purple-400/10',
  Delivered: 'text-green-400 bg-green-400/10',
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await orderAPI.getAll();
      setOrders(data);
    } catch {
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      await orderAPI.updateStatus(orderId, { orderStatus: status });
      toast.success('Status updated!');
      fetchOrders();
    } catch {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-8">
        Manage <span className="text-primary">Orders</span>
      </h1>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 glass rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="glass rounded-xl p-5">
              <div className="flex flex-wrap justify-between gap-4 mb-3">
                <div>
                  <p className="text-gray-400 text-xs">Order ID</p>
                  <p className="text-white font-mono text-sm">{order._id.slice(-12)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Customer</p>
                  <p className="text-white text-sm">{order.user?.name || 'N/A'}</p>
                  <p className="text-gray-500 text-xs">{order.user?.email}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Total</p>
                  <p className="text-white font-bold">₹{order.totalAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Date</p>
                  <p className="text-white text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Status</p>
                  <select
                    value={order.orderStatus}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="bg-surfaceLight border border-border rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:border-primary"
                  >
                    {['Pending', 'Processing', 'Shipped', 'Delivered'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="border-t border-border pt-3 flex gap-3 flex-wrap">
                {order.products.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <img src={item.image} alt={item.name} className="w-8 h-8 object-cover rounded" />
                    <span className="text-gray-400 text-xs">{item.name} x{item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;