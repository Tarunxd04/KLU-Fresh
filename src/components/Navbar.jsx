import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Icon } from './Icon';
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
  const { products } = useStore();
  const [searchFocused, setSearchFocused] = React.useState(false);
  const suggestions = searchTerm.trim() ? products.filter(p => p.name.toLowerCase().includes(searchTerm.trim().toLowerCase())).slice(0, 5) : [];
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
          <span className="logo-leaf"><Icon name="leaf" /></span>
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

        <div className="search-wrap" onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setSearchFocused(false); }}>
          <span
            className="search-icon"
            onClick={() => onSearchSubmit && onSearchSubmit()}
          >
            <Icon name="search" size={18} />
          </span>
          <input
            type="text"
            id="searchInput"
            className="search-input"
            aria-label="Search groceries"
            onFocus={() => setSearchFocused(true)}
            onKeyUp={e => { if (e.key === 'Escape') setSearchFocused(false); }}
            placeholder="Search for fruits, vegetables, groceries..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                setSearchFocused(false);
                onSearchSubmit && onSearchSubmit();
              }
            }}
          />
          {searchTerm && (
            <button
              type="button"
              className="clear-search"
              aria-label="Clear search"
              onClick={() => {
                onSearchChange('');
                setSearchFocused(false);
                document.getElementById('searchInput')?.focus();
              }}
            >
              ×
            </button>
          )}
          {searchFocused && suggestions.length > 0 && (
            <div className="search-suggestions" role="listbox" aria-label="Matching products">
              <p className="suggestions-heading">Matching products ({suggestions.length})</p>
              {suggestions.map((p) => (
                <Link
                  key={p.id}
                  to={`/products/${p.id}`}
                  role="option"
                  onClick={() => setSearchFocused(false)}
                >
                  <span className="suggestion-name">{p.name}</span>
                  <small className="suggestion-meta">
                    {p.category} &bull; {p.qty}
                  </small>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="header-actions">
          <button className="action-btn" id="locationBtn" onClick={handleLocationClick}>
            <span className="action-icon"><Icon name="pin" /></span>
            <span className="action-label">Vijayawada</span>
          </button>

          <button className="action-btn" id="myOrdersNavBtn" onClick={onOpenOrders}>
            <span className="action-icon"><Icon name="box" /></span>
            <span className="badge" id="ordersCount">
              {ordersCount}
            </span>
            <span className="action-label">Orders</span>
          </button>

          <button className="action-btn" id="wishlistBtn" onClick={onOpenWishlist}>
            <span className="action-icon" id="wishlistIcon">
              <Icon name="heart" />
            </span>
            <span className="badge" id="wishlistCount">
              {wishlist.length}
            </span>
            <span className="action-label">Wishlist</span>
          </button>

          <button className="action-btn" id="cartBtn" onClick={onOpenCart}>
            <span className="action-icon"><Icon name="cart" /></span>
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
                  <span className="action-icon"><Icon name="user" /></span>
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
                  <span className="action-icon"><Icon name="user" /></span>
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
