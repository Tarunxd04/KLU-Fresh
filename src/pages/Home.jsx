import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Lenis from 'lenis';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { ProductFilters } from '../components/ProductFilters';
import { ProductGrid } from '../components/ProductGrid';
import { AboutSection } from '../components/AboutSection';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';
import { WishlistDrawer } from '../components/WishlistDrawer';
import { CheckoutModal } from '../components/CheckoutModal';
import { OrderSuccessModal } from '../components/OrderSuccessModal';
import { OrdersModal } from '../components/OrdersModal';
import { AuthModal } from '../components/AuthModal';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { ProductDetails } from '../components/ProductDetails';
import '../styles/storefront.css';
import '../styles/polish.css';

export function Home() {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const { products, orders } = useStore();
  const { cart } = useCart();
  const { showToast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const { productId } = useParams();
  useEffect(() => {
    if (productId) window.scrollTo({ top: 0, behavior: 'instant' });
  }, [productId]);
  useEffect(() => {
    const header = document.querySelector('.site-header');
    const update = () => document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
    const observer = new ResizeObserver(update);
    observer.observe(header);
    update();
    return () => observer.disconnect();
  }, []);

  // Search, filter, sort state
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSection, setActiveSection] = useState('home');

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [lastPlacedOrder, setLastPlacedOrder] = useState(null);

  // Check URL path on mount or location change (/login or /signup)
  useEffect(() => {
    if (location.pathname === '/login') {
      setAuthMode('login');
      setIsAuthOpen(true);
    } else if (location.pathname === '/signup') {
      setAuthMode('signup');
      setIsAuthOpen(true);
    }
  }, [location.pathname]);

  // Lenis Smooth Scroll initialization
  const lenisRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      smoothWheel: !prefersReducedMotion,
      autoRaf: true,
      respectReducedMotion: true,
    });
    lenisRef.current = lenis;
    window.__lenis = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      delete window.__lenis;
    };
  }, []);

  // ScrollSpy logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['contact', 'about', 'products', 'home'];
      const scrollPos = window.scrollY + 180;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const headerHeight = document.querySelector('.site-header')?.offsetHeight || 80;
      const targetOffset = -headerHeight + 5;
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { offset: targetOffset, immediate: window.matchMedia('(prefers-reduced-motion: reduce)').matches });
      } else {
        const targetPos = el.getBoundingClientRect().top + window.pageYOffset + targetOffset;
        window.scrollTo({
          top: Math.max(0, targetPos),
          behavior: 'smooth',
        });
      }
    }
  };

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    if (productId) {
      navigate('/');
      setTimeout(() => scrollToSection(sectionId), 100);
    } else scrollToSection(sectionId);
    setActiveSection(sectionId);
  };

  const handleSearchChange = (val) => {
    setSearchTerm(val);
    setActiveCategory('all');
    if (productId) navigate('/');
    if (val.trim().length > 0) {
      scrollToSection('products');
    }
  };

  const handleSearchSubmit = () => {
    scrollToSection('products');
  };

  const handleShopNow = () => {
    setActiveCategory('all');
    setSearchTerm('');
    scrollToSection('products');
    setActiveSection('products');
  };

  // Orders visible to current user
  const visibleOrders = useMemo(() => {
    if (!user) return [];
    if (user.role === 'admin') return orders;
    return orders.filter(
      (o) => o.userId === user.id || o.customerEmail === user.email
    );
  }, [user, orders]);

  // Protected actions (Approved Correction A)
  const handleOpenCheckout = () => {
    setIsCartOpen(false);
    if (!isAuthenticated) {
      showToast('Please login to continue');
      setAuthMode('login');
      setIsAuthOpen(true);
      return;
    }
    if (cart.length === 0) {
      showToast('Add items to cart first');
      return;
    }
    setIsCheckoutOpen(true);
  };

  const handleOpenOrders = () => {
    if (!isAuthenticated) {
      showToast('Please login to continue');
      setAuthMode('login');
      setIsAuthOpen(true);
      return;
    }
    setIsOrdersOpen(true);
  };

  const handleOrderSuccess = (newOrder) => {
    setIsCheckoutOpen(false);
    setLastPlacedOrder(newOrder);
    setIsSuccessOpen(true);
  };

  // Filtered & sorted products list
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Filter by category
    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Filter by search
    if (searchTerm.trim() !== '') {
      const term = searchTerm.trim().toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term)
      );
    }

    return list;
  }, [products, activeCategory, searchTerm]);

  // Subtle scroll entrance animations via Intersection Observer
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = document.querySelectorAll(
      '.scroll-reveal:not(.is-visible), .hero-reveal-left:not(.is-visible), .hero-reveal-right:not(.is-visible)'
    );

    if (prefersReducedMotion) {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.05,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [filteredProducts, productId]);

  return (
    <div id="userStorefrontView">
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        activeSection={activeSection}
        onNavClick={handleNavClick}
        onOpenOrders={handleOpenOrders}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={(mode) => {
          setAuthMode(mode);
          setIsAuthOpen(true);
        }}
        ordersCount={visibleOrders.length}
        onOpenAdmin={() => navigate('/admin/dashboard')}
      />

      {productId ? <ProductDetails id={productId} /> : <>
      <Hero onShopNow={handleShopNow} />

      <section className="marketplace section" id="products" aria-label="Shop groceries">
        <ProductFilters activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        <div id="productsSection" className="catalog-content">
          <div className="catalog-heading">
            <div>
              <h2>{activeCategory === 'all' ? 'All Products' : activeCategory}</h2>
              <p>Quality groceries at honest prices</p>
            </div>
            <p id="resultsCount" role="status" aria-live="polite">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </div>
          <ProductGrid products={filteredProducts} onReset={handleShopNow} />
        </div>
      </section>

      <AboutSection />
      </>}

      <Footer />

      {/* Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleOpenCheckout}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={handleOrderSuccess}
      />

      <OrderSuccessModal
        isOpen={isSuccessOpen}
        order={lastPlacedOrder}
        onClose={() => setIsSuccessOpen(false)}
        onViewOrders={() => {
          setIsSuccessOpen(false);
          setIsOrdersOpen(true);
        }}
      />

      <OrdersModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={visibleOrders}
      />

      <AuthModal
        isOpen={isAuthOpen}
        mode={authMode}
        onClose={() => {
          setIsAuthOpen(false);
          if (location.pathname === '/login' || location.pathname === '/signup') {
            navigate('/', { replace: true });
          }
        }}
        onSwitchMode={(mode) => setAuthMode(mode)}
        onLoginSuccess={(loggedInUser) => {
          if (loggedInUser.role === 'admin') {
            navigate('/admin/dashboard');
          }
        }}
      />
    </div>
  );
}
