import { useState, useEffect } from 'react';
import { orderAPI } from '../services/api';
import toast from 'react-hot-toast';

const statusColors = {
  Pending: 'text-yellow-400 bg-yellow-400/10',
  Processing: 'text-blue-400 bg-blue-400/10',
  Shipped: 'text-purple-400 bg-purple-400/10',
  Delivered: 'text-green-400 bg-green-400/10',
};

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await orderAPI.getMyOrders();
        setOrders(data);
      } catch {
        toast.error('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-dark min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">
          My <span className="text-primary">Orders</span>
        </h1>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">No orders yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="glass rounded-xl p-6">
                <div className="flex flex-wrap justify-between gap-4 mb-4">
                  <div>
                    <p className="text-gray-400 text-xs">Order ID</p>
                    <p className="text-white text-sm font-mono">{order._id}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Date</p>
                    <p className="text-white text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Total</p>
                    <p className="text-white font-bold">₹{order.totalAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.orderStatus]}`}>
                      {order.orderStatus}
                    </span>
                  </div>
                </div>
                <div className="border-t border-border pt-4 flex gap-3 flex-wrap">
                  {order.products.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg" />
                      <div>
                        <p className="text-white text-xs line-clamp-1">{item.name}</p>
                        <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;