'use client';

import { useState } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useOrders } from '../../contexts/OrderContext';
import { useRouter } from 'next/navigation';

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useOrders();
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter((order) => order.status === filterStatus);

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Manage Orders</h1>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-gray-600 text-sm">Total Orders</p>
              <p className="text-4xl font-bold text-blue-600">{orders.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-gray-600 text-sm">Pending Orders</p>
              <p className="text-4xl font-bold text-yellow-600">
                {orders.filter((o) => o.status === 'pending').length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-gray-600 text-sm">Completed Orders</p>
              <p className="text-4xl font-bold text-green-600">
                {orders.filter((o) => o.status === 'delivered').length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-gray-600 text-sm">Total Revenue</p>
              <p className="text-4xl font-bold text-purple-600">
                ${orders
                  .filter((o) => o.status === 'delivered')
                  .reduce((sum, o) => sum + o.total, 0)
                  .toFixed(2)}
              </p>
            </div>
          </div>

          {/* Filter */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="all"
                  checked={filterStatus === 'all'}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="mr-2"
                />
                All Orders
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="pending"
                  checked={filterStatus === 'pending'}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="mr-2"
                />
                Pending
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="processing"
                  checked={filterStatus === 'processing'}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="mr-2"
                />
                Processing
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="shipped"
                  checked={filterStatus === 'shipped'}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="mr-2"
                />
                Shipped
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="delivered"
                  checked={filterStatus === 'delivered'}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="mr-2"
                />
                Delivered
              </label>
            </div>
          </div>

          {/* Orders List */}
          {filteredOrders.length > 0 ? (
            <div className="space-y-6">
              {filteredOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                      <p className="text-gray-600">{order.userName} ({order.userEmail})</p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-600">${order.total.toFixed(2)}</p>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`px-3 py-1 rounded text-sm font-semibold ${getStatusColor(order.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Items:</h4>
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="border-t pt-4 mt-4">
                    <h4 className="font-semibold mb-2">Shipping Address:</h4>
                    <p className="text-gray-600">
                      {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.zipCode}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <p className="text-2xl font-semibold text-gray-800 mb-4">No orders found</p>
              <p className="text-gray-600">Orders will appear here once customers make purchases.</p>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}