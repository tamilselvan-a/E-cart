'use client';

import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { getTotalItems } = useCart();
  const router = useRouter();
  const cartCount = getTotalItems();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            🛍️ ShopHub
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link
                  href="/products"
                  className="hover:text-blue-300 transition"
                >
                  Products
                </Link>

                {user?.role === 'admin' && (
                  <>
                    <Link
                      href="/admin/products"
                      className="hover:text-blue-300 transition"
                    >
                      Manage Products
                    </Link>
                    <Link
                      href="/admin/add-product"
                      className="bg-green-600 px-3 py-1 rounded hover:bg-green-700 transition"
                    >
                      Add Product
                    </Link>
                  </>
                )}

                {user?.role === 'user' && (
                  <Link href="/cart" className="relative hover:text-blue-300 transition">
                    🛒 Cart
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                )}

                <div className="flex items-center gap-4">
                  <span className="text-sm">({user?.email})</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
