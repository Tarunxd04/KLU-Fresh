import React from 'react';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';
import { formatPrice, imageSrc } from '../utils/formatters';

export function WishlistDrawer({ isOpen, onClose }) {
  const { wishlist, toggleWishlist } = useCart();
  const { products } = useStore();

  return (
    <>
      <div
        className={`overlay ${isOpen ? 'active' : ''}`}
        id="wishlistOverlay"
        onClick={onClose}
      />
      <aside className={`cart-sidebar ${isOpen ? 'open' : ''}`} id="wishlistSidebar" data-lenis-prevent>
        <div className="cart-header">
          <h3>Your Wishlist</h3>
          <button className="close-btn" id="closeWishlist" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="cart-items" id="wishlistItems">
          {wishlist.length === 0 ? (
            <p className="empty-cart">Your wishlist is empty 🤍</p>
          ) : (
            wishlist.map((id) => {
              const p = products.find((prod) => prod.id === id);
              if (!p) return null;
              return (
                <div key={p.id} className="cart-item">
                  <div className="cart-item-emoji">
                    {p.image ? (
                      <img src={imageSrc(p.image)} className="cart-thumb-img" alt={p.name} />
                    ) : (
                      p.emoji || '🛒'
                    )}
                  </div>
                  <div className="cart-item-info">
                    <div className="cart-item-name">{p.name}</div>
                    <div className="cart-item-price">{formatPrice(p.price)}</div>
                  </div>
                  <button
                    className="cart-item-remove"
                    data-id={p.id}
                    onClick={() => toggleWishlist(p.id)}
                  >
                    Remove
                  </button>
                </div>
              );
            })
          )}
        </div>
      </aside>
    </>
  );
}
