import LoginForm from '../components/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">ShopHub</h1>
          <p className="text-gray-600">Welcome back! Please login to your account</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <LoginForm />
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>
            Unauthorized access attempt will be logged.{' '}
            <Link href="/" className="text-blue-600 hover:underline">
              Go to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
