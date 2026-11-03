import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export function Navbar({
  searchTerm,
  onSearchChange,
  onSearchSubmit,
  activeSection,
  onNavClick,
  onOpenOrders,
  onOpenWishlist,
  onOpenCart,
  onOpenAuth,
  ordersCount,
  onOpenAdmin,
}) {
  const { user, isAuthenticated, logout } = useAuth();
  const { wishlist, totals } = useCart();
  const { showToast } = useToast();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(e) {
      if (!e.target.closest('#authUser')) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLocationClick = () => {
    showToast('📍 Delivering to Vijayawada & KL University campus');
  };

  const handleAccountClick = () => {
    setDropdownOpen(false);
    showToast(`👤 Signed in as ${user ? user.name : 'Guest'}`);
  };

  const handleLogoutClick = () => {
    setDropdownOpen(false);
    logout();
    showToast('Logged out successfully 👋');
  };

  return (
    <header className="site-header">
      <div className="header-top">
        <div
          className="logo"
          id="logoHome"
          onClick={(e) => {
            onNavClick(e, 'home');
          }}
        >
          <span className="logo-leaf">🌿</span>
          <span className="logo-text">
            KLU <span>Fresh</span>
          </span>
        </div>

        {/* Customer Section Navigation */}
        <nav className="main-nav" id="mainNav">
          <a
            href="#home"
            className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
            onClick={(e) => onNavClick(e, 'home')}
          >
            Home
          </a>
          <a
            href="#products"
            className={`nav-link ${activeSection === 'products' ? 'active' : ''}`}
            onClick={(e) => onNavClick(e, 'products')}
          >
            Products
          </a>
          <a
            href="#about"
            className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
            onClick={(e) => onNavClick(e, 'about')}
          >
            About
          </a>
          <a
            href="#contact"
            className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={(e) => onNavClick(e, 'contact')}
          >
            Contact
          </a>
        </nav>

        <div className="search-wrap">
          <span
            className="search-icon"
            onClick={() => onSearchSubmit && onSearchSubmit()}
          >
            🔍
          </span>
          <input
            type="text"
            id="searchInput"
            className="search-input"
            placeholder="Search for fruits, vegetables, groceries..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onSearchSubmit && onSearchSubmit();
              }
            }}
          />
        </div>

        <div className="header-actions">
          <button className="action-btn" id="locationBtn" onClick={handleLocationClick}>
            <span className="action-icon">📍</span>
            <span className="action-label">Vijayawada</span>
          </button>

          <button className="action-btn" id="myOrdersNavBtn" onClick={onOpenOrders}>
            <span className="action-icon">📦</span>
            <span className="badge" id="ordersCount">
              {ordersCount}
            </span>
            <span className="action-label">Orders</span>
          </button>

          <button className="action-btn" id="wishlistBtn" onClick={onOpenWishlist}>
            <span className="action-icon" id="wishlistIcon">
              {wishlist.length > 0 ? '❤️' : '🤍'}
            </span>
            <span className="badge" id="wishlistCount">
              {wishlist.length}
            </span>
            <span className="action-label">Wishlist</span>
          </button>

          <button className="action-btn" id="cartBtn" onClick={onOpenCart}>
            <span className="action-icon">🛒</span>
            <span className="badge" id="cartCount">
              {totals.count}
            </span>
            <span className="action-label">Cart</span>
          </button>

          <div className="auth-area" id="authArea">
            {!isAuthenticated ? (
              <div className="auth-guest" id="authGuest">
                <button
                  className="action-btn"
                  id="loginBtn"
                  title="Login / Register"
                  onClick={() => onOpenAuth('login')}
                >
                  <span className="action-icon">👤</span>
                  <span className="action-label">Login</span>
                </button>
              </div>
            ) : (
              <div className="auth-user" id="authUser">
                <button
                  className="action-btn user-menu-trigger"
                  id="userMenuTrigger"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span className="action-icon">👤</span>
                  <span className="action-label" id="userNameLabel">
                    {user.name.split(' ')[0]}
                  </span>
                </button>

                <div className={`user-dropdown ${dropdownOpen ? 'open' : ''}`} id="userDropdown">
                  <div className="user-dropdown-header">
                    <div className="user-avatar" id="dropdownAvatar">
                      {user.role === 'admin' ? '🛡️' : '👤'}
                    </div>
                    <div>
                      <div className="user-dropdown-name" id="dropdownName">
                        {user.name}
                      </div>
                      <div className="user-dropdown-email" id="dropdownEmail">
                        {user.email}
                      </div>
                      <span
                        className={`role-badge ${user.role === 'admin' ? 'admin-role' : ''}`}
                        id="dropdownRoleBadge"
                      >
                        {user.role === 'admin' ? '🛡️ Store Admin' : '👤 Customer'}
                      </span>
                    </div>
                  </div>

                  {user.role === 'admin' ? (
                    <div id="adminNavLinks">
                      <button
                        className="user-dropdown-item admin-menu-highlight"
                        id="adminDashboardBtn"
                        onClick={() => {
                          setDropdownOpen(false);
                          onOpenAdmin();
                        }}
                      >
                        🛠️ Admin Dashboard
                      </button>
                    </div>
                  ) : (
                    <div id="userNavLinks">
                      <button
                        className="user-dropdown-item"
                        id="myOrdersMenuBtn"
                        onClick={() => {
                          setDropdownOpen(false);
                          onOpenOrders();
                        }}
                      >
                        📦 My Orders &amp; Tracking
                      </button>
                      <button
                        className="user-dropdown-item"
                        id="accountMenuBtn"
                        onClick={handleAccountClick}
                      >
                        👤 Account / Profile
                      </button>
                    </div>
                  )}

                  <button
                    className="user-dropdown-item logout-item"
                    id="logoutBtn"
                    onClick={handleLogoutClick}
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
