'use client';

import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { validateEmail, validatePassword } from '../lib/authHelpers';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      setLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      // Mock authentication - in production, call your backend API
      const result = login(email, password, role);

      if (result.success) {
        // Redirect based on role
        setTimeout(() => {
          if (role === 'admin') {
            router.push('/admin/products');
          } else {
            router.push('/products');
          }
        }, 500);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Role Selection */}
      <div>
        <label className="block text-sm font-medium mb-2">Login As</label>
        <div className="flex gap-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              value="user"
              checked={role === 'user'}
              onChange={(e) => setRole(e.target.value)}
              className="mr-2"
            />
            <span>User</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              value="admin"
              checked={role === 'admin'}
              onChange={(e) => setRole(e.target.value)}
              className="mr-2"
            />
            <span>Admin</span>
          </label>
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition disabled:bg-gray-400"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>

      {/* Links */}
      <div className="text-center text-sm">
        <p>
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>

      {/* Demo Credentials */}
      <div className="bg-blue-50 border border-blue-200 p-3 rounded text-sm">
        <p className="font-semibold mb-2">Demo Credentials:</p>
        <p><strong>User:</strong> user@example.com / user123</p>
        <p><strong>Admin:</strong> admin@example.com / admin123</p>
      </div>
    </form>
  );
}
