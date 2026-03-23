'use client';

import { useState } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import ProductCard from '../../components/ProductCard';
import { useProducts } from '../../contexts/ProductContext';
import { useRouter } from 'next/navigation';

export default function AdminProductsPage() {
  const { products, deleteProduct, searchProducts, filterByCategory, getCategories } = useProducts();
  const router = useRouter();
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = getCategories();

  const getFilteredProducts = () => {
    let result = products;

    if (searchQuery.trim()) {
      result = searchProducts(searchQuery);
    }

    if (selectedCategory) {
      result = result.filter((product) => product.category === selectedCategory);
    }

    return result;
  };

  const filteredProducts = getFilteredProducts();

  const handleEdit = (productId) => {
    router.push(`/admin/edit-product/${productId}`);
  };

  const handleDelete = (productId) => {
    deleteProduct(productId);
    setDeleteConfirm(null);
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <h1 className="text-4xl font-bold">Manage Products</h1>
            <button
              onClick={() => router.push('/admin/add-product')}
              className="bg-green-600 text-white px-6 py-3 rounded font-semibold hover:bg-green-700 transition"
            >
              + Add New Product
            </button>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow p-4 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Search Products</label>
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, description, category..."
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Category Filter</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end gap-2">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('');
                  }}
                  className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-gray-600 text-sm">Total Products</p>
              <p className="text-4xl font-bold text-blue-600">{products.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-gray-600 text-sm">Total Stock</p>
              <p className="text-4xl font-bold text-green-600">
                {products.reduce((sum, p) => sum + p.stock, 0)}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-gray-600 text-sm">Total Value</p>
              <p className="text-4xl font-bold text-purple-600">
                ${products.reduce((sum, p) => sum + p.price * p.stock, 0).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isAdmin={true}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <p className="text-2xl font-semibold text-gray-800 mb-4">No products yet</p>
              <p className="text-gray-600 mb-6">Add your first product to get started!</p>
              <button
                onClick={() => router.push('/admin/add-product')}
                className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700 transition"
              >
                Add First Product
              </button>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
