export const STORAGE_KEYS = {
  USERS: 'grocery_users',
  CURRENT_USER: 'grocery_current_user',
  ADMIN_AUTH: 'klu_admin_authenticated',
  PRODUCTS: 'grocery_products',
  CART: 'grocery_cart',
  WISHLIST: 'grocery_wishlist',
  ORDERS: 'grocery_orders',
};

export const ADMIN_ACCOUNTS = [
  {
    id: 'admin_001',
    name: 'Store Administrator',
    email: 'admin@klufresh.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    id: 'admin_002',
    name: 'Store Administrator',
    email: 'admin123@klufresh.in',
    password: 'admin11',
    role: 'admin',
  },
];

export const CATEGORIES = [
  'Fruits',
  'Vegetables',
  'Dairy',
  'Snacks',
  'Staples',
  'Personal Care',
  'Protein',
];

export const CATEGORY_ICONS = {
  'Fruits': '🍎',
  'Vegetables': '🥦',
  'Dairy': '🧀',
  'Snacks': '🍿',
  'Staples': '🌾',
  'Personal Care': '🧴',
  'Protein': '🥩',
};

export const COUPONS = {
  KLU10: 0.10, // 10% discount
};

export const TRACKING_STEPS = ['Placed', 'Processing', 'Out for Delivery', 'Delivered'];
