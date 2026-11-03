# KLU Fresh — Online Grocery Store (React + Vite)

A modern, fast, and responsive online grocery shopping platform built for KL University campus and Vijayawada delivery, migrated from vanilla HTML/CSS/JavaScript to **React + Vite**.

---

## 1. Features

### Storefront / User Module
- **Fresh Catalog**: 38 products across 7 categories (*Fruits, Vegetables, Dairy, Snacks, Staples, Personal Care, Protein*).
- **Interactive Search & Filtering**: Real-time keyword search across names and categories, category selector, and multiple sorting criteria (Featured, Price: Low → High, Price: High → Low, Rating, Discount).
- **Cart & Wishlist System**: Slide-in drawers with real-time quantity adjustments, stock availability enforcement, coupon code application (`KLU10` for 10% discount), and persistent storage.
- **Checkout & Real-time Order Tracking**: Seamless checkout modal with multi-field validation, choice of 4 delivery slots, payment method selection, and a visual 4-step live order status stepper (*Placed → Processing → Out for Delivery → Delivered*).
- **Authentication**: LocalStorage-driven customer sign-up and sign-in with full client-side validation and password obfuscation.

### Admin Module (`/admin/*`)
- **Route Guard Protection**: Protected admin workspace accessible only to verified administrators (`admin@klufresh.com` and `admin123@klufresh.in`).
- **Dashboard Overview**: Real-time business metrics including Total Revenue (excluding cancelled orders), Total Orders count, Active/Pending order indicators, Catalog product count, Low stock alerts, and Registered customers count.
- **Product Catalog Management**: Comprehensive catalog table with live keyword filtering, instant `+5` stock increment buttons, edit modal, and safe deletion with confirmation.
- **Fulfillment & Customer Orders**: Live order inspection, customer details, delivery address, ordered items breakdown, and real-time status update dropdowns that immediately reflect in the customer's tracker.
- **Registered Customers**: Read-only directory of all user accounts registered in the store with their registration date and total orders placed.

---

## 2. Technology Stack

- **Framework / Bundler**: React 18, Vite 5
- **Routing**: React Router DOM (v6) with SPA routing
- **State Management**: React Context API (`AuthContext`, `StoreContext`, `CartContext`, `ToastContext`)
- **Styling**: Pure CSS (`src/styles/style.css`), preserving 100% of the original design tokens, color palette (#1B4332 deep green, #52B788, #D8F3DC, #FF9F1C accent orange), responsive breakpoints, and animations.
- **Storage**: Browser LocalStorage for complete client-side persistence without external server dependencies.

---

## 3. Project Structure

```
Online Grocery Store(F)/
├── .gitignore
├── index.html
├── package.json
├── README.md
├── vercel.json
├── vite.config.js
├── legacy/                   # Complete backup of original HTML/JS files
│   ├── admin.html
│   ├── admin.js
│   ├── auth.js
│   ├── index.html
│   ├── navigation.js
│   ├── script.js
│   ├── style.css
│   └── user.js
├── public/
│   └── Images/               # 38 high-quality grocery product images
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── admin/
    │   ├── AdminDashboard.jsx
    │   ├── AdminLayout.jsx
    │   ├── AdminOrders.jsx
    │   ├── AdminProducts.jsx
    │   ├── AdminUsers.jsx
    │   └── ProductFormModal.jsx
    ├── components/
    │   ├── AboutSection.jsx
    │   ├── AdminRoute.jsx
    │   ├── AuthModal.jsx
    │   ├── CartDrawer.jsx
    │   ├── CheckoutModal.jsx
    │   ├── Footer.jsx
    │   ├── Hero.jsx
    │   ├── Navbar.jsx
    │   ├── OrderSuccessModal.jsx
    │   ├── OrdersModal.jsx
    │   ├── ProductCard.jsx
    │   ├── ProductFilters.jsx
    │   ├── ProductGrid.jsx
    │   ├── ProtectedRoute.jsx
    │   └── WishlistDrawer.jsx
    ├── context/
    │   ├── AuthContext.jsx
    │   ├── CartContext.jsx
    │   ├── StoreContext.jsx
    │   └── ToastContext.jsx
    ├── hooks/
    │   └── useLocalStorage.js
    ├── pages/
    │   └── Home.jsx
    ├── styles/
    │   └── style.css
    └── utils/
        ├── authStorage.js
        ├── constants.js
        ├── defaultProducts.js
        └── formatters.js
```

---

## 4. How to Run Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Installation & Execution
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## 5. Demo Credentials

### Administrator Accounts
1. **Primary Admin**:
   - Email: `admin@klufresh.com`
   - Password: `admin123`
2. **Secondary Admin**:
   - Email: `admin123@klufresh.in`
   - Password: `admin11`

### Customer Accounts
- You can create a new customer account using the **Create customer account** form in the Login modal, or use the pre-seeded account:
  - Email: `rahul@example.com`

---

## 6. LocalStorage Keys

The application persists all runtime state under the exact same keys as the legacy platform:
- `grocery_users`: Array of registered customer account objects.
- `grocery_current_user`: Active session user object (`{ id, name, email, role }`).
- `klu_admin_authenticated`: Set to `"true"` when an administrator is authenticated.
- `grocery_products`: Active catalog products list.
- `grocery_cart`: Customer cart items array (`[{ id, qty }]`).
- `grocery_wishlist`: Customer wishlist array (`[id, ...]`).
- `grocery_orders`: Array of all customer orders.

---

## 7. Routes

| Route | Description | Access |
|---|---|---|
| `/` | Main Storefront (Hero, Catalog, Filters, About, Footer) | Public |
| `/login` | Storefront with Login modal open | Public |
| `/signup` | Storefront with Signup modal open | Public |
| `/admin` | Redirects to `/admin/dashboard` | Admin Only |
| `/admin/dashboard` | Overview metrics, fulfillment overview & recent orders | Admin Only |
| `/admin/products` | Catalog inventory management, stock controls, Add/Edit | Admin Only |
| `/admin/orders` | Customer fulfillment, status management | Admin Only |
| `/admin/users` | Directory of registered customer accounts | Admin Only |

---

## 8. Vercel Deployment Guide

To deploy this project on Vercel:
1. **Framework Preset**: Vite
2. **Build Command**: `npm run build`
3. **Output Directory**: `dist`
4. **Environment Variables**: None required.
5. **SPA Rewrites**: Handled automatically by the included `vercel.json`:
   ```json
   {
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```

---

## 9. Security Limitations

As per the university project specifications, this system runs entirely client-side using browser LocalStorage without a dedicated backend server:
- Passwords are obfuscated using a demo client-side hash algorithm.
- Administrator accounts are verified in client JavaScript and LocalStorage.
- Anyone with access to browser Developer Tools can inspect or modify LocalStorage.
- This configuration satisfies university course review criteria for frontend architecture, but in a production environment should be backed by a secure backend API with encrypted database storage, HTTP-only JWT cookies, and server-side RBAC.
