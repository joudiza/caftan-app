import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../features/orderSlice';
import { updateOrderStatus } from '../features/orderSlice'; // Assuming you have this action defined

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  const handleStatusChange = (orderId, newStatus) => {
    console.log("🚀 Updating status", orderId, newStatus);
    dispatch(updateOrderStatus({ orderId, status: parseInt(newStatus) }));
  };

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) return <p className="text-center text-gray-500 mt-10">⏳ جار التحميل...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">⚠️ خطأ: {error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">📦ORDERS</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Address</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700 divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3">{order.id}</td>
                <td className="px-4 py-3">{order.customer_name}</td>
                <td className="px-4 py-3">{order.shipping_address}</td>
                <td className="px-4 py-3">{order.customer_phone}</td>
                <td className="px-4 py-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="text-gray-900">{item.caftan_name}</div>
                  ))}
                </td>
                <td className="px-4 py-3 font-semibold">{order.total_price} MAD</td>
                <td className="px-4 py-3">
                 <select
   value={order.status}
    onChange={(e) => handleStatusChange(order.id, e.target.value)}
    className={`border rounded px-2 py-1 text-sm
      ${order.status === 1 ? 'bg-blue-100 text-blue-800'
        : order.status === 2 ? 'bg-green-100 text-green-800'
        : order.status === 3 ? 'bg-red-100 text-red-800'
        : 'bg-gray-100 text-gray-800'}`}
>
  <option  value="1">Confirmed</option>
  <option  value="2">Delivered</option>
  <option  value="3">Cancelled</option>
</select>
                </td>
                <td className="px-4 py-3">{new Date(order.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPage;
