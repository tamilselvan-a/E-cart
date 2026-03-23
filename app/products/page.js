'use client';

import { useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../contexts/ProductContext';

export default function ProductsPage() {
  const { products, searchProducts, filterByCategory, getCategories } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const categories = getCategories();

  let filteredProducts = products;

  if (searchQuery) {
    filteredProducts = searchProducts(searchQuery);
  }

  if (selectedCategory) {
    filteredProducts = filterByCategory(selectedCategory);
  }

  if (searchQuery && selectedCategory) {
    const searched = searchProducts(searchQuery);
    filteredProducts = searched.filter((p) => p.category === selectedCategory);
  }

  return (
    <ProtectedRoute requiredRole="user">
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Page Title */}
          <h1 className="text-4xl font-bold mb-8">Our Products</h1>

          {/* Filters Section */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium mb-2">Search Products</label>
                <input
                  type="text"
                  placeholder="Search by name, description, etc..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
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
            </div>

            {/* Results Count */}
            <p className="text-sm text-gray-600 mt-4">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500">No products found</p>
              <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
