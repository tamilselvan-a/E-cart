'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

export default function ProductCard({ product, isAdmin = false, onEdit, onDelete }) {
  const { isAuthenticated, user } = useAuth();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    alert('Product added to cart!');
  };

  const handleEdit = () => {
    onEdit(product.id);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this product?')) {
      onDelete(product.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      {/* Product Image */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="w-full h-full object-cover hover:scale-105 transition"
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-sm">
          {product.category}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-yellow-400">⭐ {product.rating}</span>
          <span className="text-gray-500 text-sm">({product.reviews} reviews)</span>
        </div>

        {/* Stock Status */}
        <div className="mb-3">
          <span className={`text-sm font-semibold ${product.stock > 5 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>

        {/* Price */}
        <div className="text-2xl font-bold text-blue-600 mb-4">
          ${product.price.toFixed(2)}
        </div>

        {/* Admin Actions */}
        {isAdmin && (
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        )}

        {/* User Actions */}
        {!isAdmin && isAuthenticated && user?.role === 'user' && (
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {product.stock > 0 ? '🛒 Add to Cart' : 'Out of Stock'}
          </button>
        )}

        {!isAuthenticated && (
          <Link
            href="/login"
            className="w-full block text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Login to Buy
          </Link>
        )}
      </div>
    </div>
  );
}
