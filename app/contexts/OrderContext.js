'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  // Load orders from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedOrders = localStorage.getItem('orders');
      if (savedOrders) {
        try {
          setOrders(JSON.parse(savedOrders));
        } catch (error) {
          // If parsing fails, start with empty orders
          setOrders([]);
          localStorage.setItem('orders', JSON.stringify([]));
        }
      }
    }
  }, []);

  // Save orders to localStorage whenever orders change
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const createOrder = (orderData) => {
    const newOrder = {
      id: Date.now(),
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setOrders((prevOrders) => [...prevOrders, newOrder]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const getOrderById = (orderId) => {
    return orders.find((order) => order.id === parseInt(orderId));
  };

  const getOrdersByUser = (userEmail) => {
    return orders.filter((order) => order.userEmail === userEmail);
  };

  const getTotalRevenue = () => {
    return orders
      .filter((order) => order.status === 'completed')
      .reduce((total, order) => total + order.total, 0);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        updateOrderStatus,
        getOrderById,
        getOrdersByUser,
        getTotalRevenue,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within OrderProvider');
  }
  return context;
};