# ShopHub - Full-Stack E-Commerce Application

A modern, fully responsive e-commerce platform built with **Next.js 16**, **React 19**, and **Tailwind CSS**. Features JWT-based authentication with role-based access control (User & Admin), complete product management, shopping cart, and checkout functionality.

## 🚀 Features

### Authentication & Authorization
- ✅ User Registration with validation
- ✅ User Login with role selection (User/Admin)
- ✅ JWT token-based authentication
- ✅ Role-based access control (RBAC)
- ✅ Protected routes
- ✅ Persistent login (localStorage)

### User Features
- 🛍️ Browse product catalog with search
- 🏷️ Filter products by category
- ⭐ View product ratings and reviews
- 🛒 Add/remove items from cart
- 📦 Manage cart quantity
- 💳 Checkout with order summary
- 📱 Fully responsive design

### Admin Features
- ➕ Add new products
- ✏️ Edit existing products
- 🗑️ Delete products
- 📊 View inventory statistics
- 👁️ Monitor product stock levels
- 💰 Track total inventory value

## 🛠️ Tech Stack

- **Framework:** Next.js 16.2.1 (App Router)
- **UI Library:** React 19.2.4
- **Styling:** Tailwind CSS 4
- **Authentication:** Mock JWT (ready for real backend integration)
- **State Management:** React Context API
- **Storage:** localStorage for persistence
- **Code Quality:** ESLint

## 📁 Project Structure

```
app/
├── contexts/
│   ├── AuthContext.js          # Authentication state & logic
│   ├── CartContext.js          # Shopping cart state
│   └── ProductContext.js       # Product management state
├── components/
│   ├── Navbar.js              # Navigation bar
│   ├── ProtectedRoute.js       # Route protection wrapper
│   ├── ProductCard.js          # Product display component
│   ├── LoginForm.js            # Login form component
│   └── RegisterForm.js         # Registration form component
├── lib/
│   ├── mockData.js             # Mock products & users
│   └── authHelpers.js          # JWT & validation helpers
├── login/
│   └── page.js                 # Login page
├── register/
│   └── page.js                 # Registration page
├── products/
│   └── page.js                 # User product listing
├── cart/
│   └── page.js                 # Shopping cart page
├── checkout/
│   └── page.js                 # Checkout page
├── admin/
│   ├── products/
│   │   └── page.js            # Product management dashboard
│   ├── add-product/
│   │   └── page.js            # Add new product form
│   └── edit-product/[id]/
│       └── page.js            # Edit product form
├── layout.js                   # Root layout with providers
├── page.js                     # Home/landing page
└── globals.css                 # Global styles
```

## 🔐 Demo Credentials

### User Account
- **Email:** user@example.com
- **Password:** user123
- **Access:** View products, add to cart, checkout

### Admin Account
- **Email:** admin@example.com
- **Password:** admin123
- **Access:** Full product management

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

## 📖 User Flows

### Customer Journey
1. **Home Page** → View features and get started
2. **Register** → Create new account
3. **Login** → Access user dashboard
4. **Browse Products** → Search and filter
5. **Add to Cart** → Select products
6. **Checkout** → Enter shipping & payment info
7. **Order Confirmation** → Order placed successfully

### Admin Journey
1. **Login** → Select "Admin" role
2. **Dashboard** → View inventory stats
3. **Manage Products** → Add/Edit/Delete
4. **Monitor Stock** → Track inventory levels
5. **View Metrics** → Total value and count

## 🔄 Authentication Flow

```
1. User registers/logs in
2. Credentials validated
3. Mock JWT token generated (payload: email, role, iat)
4. Token stored in localStorage
5. Protected routes check authentication
6. User info extracted from token
7. Access granted based on role
```

## 🎨 Responsive Design

- Mobile-first approach with Tailwind CSS
- Grid layouts for products
- Responsive navigation
- Touch-friendly buttons
- Optimized for all screen sizes

## 📦 Key Components

### AuthContext
- `login()` - User authentication
- `register()` - Account creation
- `logout()` - Clear session
- `isAuthenticated` - Check auth status
- `isAdmin` / `isUser` - Role checking

### CartContext
- `addToCart()` - Add products
- `removeFromCart()` - Remove items
- `updateQuantity()` - Change quantity
- `clearCart()` - Empty cart
- `getTotalPrice()` - Calculate total
- `getTotalItems()` - Count items

### ProductContext
- `addProduct()` - Create product
- `updateProduct()` - Edit product
- `deleteProduct()` - Remove product
- `searchProducts()` - Search functionality
- `filterByCategory()` - Category filtering
- `getProductById()` - Get product details

## 🔄 Ready for Backend Integration

The application is structured to easily connect to a real backend API:

1. **AuthContext** - Replace mock JWT with real backend calls
2. **ProductContext** - Fetch from real API endpoints
3. **API Helper** - Add API service layer in `lib/`
4. **Database** - Connect MongoDB, PostgreSQL, etc.

## 🎯 Product Features

Each product includes:
- Name & Description
- Price
- Category (Electronics, Accessories, Office)
- Stock quantity
- Image URL
- Rating (1-5 stars)
- Review count

## 💳 Payment Processing

Mock checkout with fields for:
- Full Name
- Email Address
- Street Address
- City & Zip Code
- Card Number
- Expiry Date
- CVV

*Ready to integrate with Stripe, PayPal, or other payment gateways*

## 📊 Admin Statistics

Dashboard displays:
- Total number of products
- Total stock quantity
- Total inventory value
- Product actions (Edit/Delete)

## 🌐 Routing

| Route | Access | Purpose |
|-------|--------|---------|
| `/` | Public | Home page |
| `/login` | Public | User login |
| `/register` | Public | User registration |
| `/products` | User | Browse products |
| `/cart` | User | Shopping cart |
| `/checkout` | User | Order checkout |
| `/admin/products` | Admin | Manage products |
| `/admin/add-product` | Admin | Add new product |
| `/admin/edit-product/:id` | Admin | Edit product |

## 🔒 Security Features

- Client-side JWT validation
- Protected routes with role checking
- Input validation on forms
- localStorage encryption ready
- CORS-friendly structure

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Performance Optimizations

- Next.js App Router for faster navigation
- Image optimization ready (via placeholder URLs)
- CSS-in-classes with Tailwind
- Efficient state management
- Minimal re-renders with React Context

## 📝 Future Enhancements

- [ ] Real backend API integration
- [ ] Database persistence
- [ ] Email notifications
- [ ] Order history & tracking
- [ ] User wishlist
- [ ] Product reviews & ratings from users
- [ ] Advanced search filters
- [ ] Payment gateway integration
- [ ] Inventory management API
- [ ] Admin analytics dashboard

## ⚡ Quick Commands

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Lint
npm run lint
```

---

**Built with ❤️ using Next.js & React**
