
'use client';

import Link from 'next/link';
import { useAuth } from './contexts/AuthContext';

export default function HomePage() {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-blue-600">ShopHub</span>
        </h1>
        <p className="text-2xl text-gray-600 mb-8">
          Your one-stop shop for premium electronics and accessories
        </p>

        {!isAuthenticated ? (
          <div className="flex justify-center gap-4">
            <Link
              href="/login"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="flex justify-center gap-4">
            {isAdmin ? (
              <>
                <Link
                  href="/admin/products"
                  className="bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-700 transition"
                >
                  Manage Products
                </Link>
                <Link
                  href="/admin/add-product"
                  className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition"
                >
                  Add Product
                </Link>
              </>
            ) : (
              <Link
                href="/products"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
              >
                Shop Now
              </Link>
            )}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">Why Choose ShopHub?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold mb-4">Fast & Reliable</h3>
            <p className="text-gray-600">
              Quick delivery and reliable service for all your purchases
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition">
            <div className="text-5xl mb-4">🛡️</div>
            <h3 className="text-2xl font-bold mb-4">Secure Payment</h3>
            <p className="text-gray-600">
              Your payment information is always safe and encrypted
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition">
            <div className="text-5xl mb-4">⭐</div>
            <h3 className="text-2xl font-bold mb-4">Premium Quality</h3>
            <p className="text-gray-600">
              All products are carefully curated for quality and value
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-5xl font-bold text-blue-600 mb-2">10K+</p>
            <p className="text-gray-600">Products</p>
          </div>
          <div>
            <p className="text-5xl font-bold text-green-600 mb-2">50K+</p>
            <p className="text-gray-600">Customers</p>
          </div>
          <div>
            <p className="text-5xl font-bold text-purple-600 mb-2">100%</p>
            <p className="text-gray-600">Satisfaction</p>
          </div>
          <div>
            <p className="text-5xl font-bold text-pink-600 mb-2">24/7</p>
            <p className="text-gray-600">Support</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Shop?</h2>
            <p className="text-xl mb-8">Join thousands of satisfied customers today</p>
            <Link
              href="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition"
            >
              Get Started Now
            </Link>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 text-center">
        <p>&copy; 2024 ShopHub. All rights reserved.</p>
      </footer>
    </div>
  );
}
