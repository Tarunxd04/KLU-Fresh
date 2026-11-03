import React, { useState } from 'react';
import { formatPrice, stockInfo, starString, discountPercent, imageSrc } from '../utils/formatters';
import { useCart } from '../context/CartContext';

export function ProductCard({ product, index = 0 }) {
  const { wishlist, toggleWishlist, addToCart } = useCart();
  const [imgError, setImgError] = useState(false);

  const stock = stockInfo(product.stock);
  const isWished = wishlist.includes(product.id);
  const discount = discountPercent(product);
  const staggerClass = `stagger-${index % 8}`;

  return (
    <div className={`product-card scroll-reveal ${staggerClass}`}>
      <div className="product-image">
        {product.image && !imgError ? (
          <img
            src={imageSrc(product.image)}
            alt={product.name}
            className="product-img"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="product-emoji">{product.emoji || '🛒'}</span>
        )}
        {discount > 0 && <span className="discount-sticker">-{discount}%</span>}
      </div>

      <button
        className="wishlist-toggle"
        data-id={product.id}
        title="Toggle Wishlist"
        onClick={() => toggleWishlist(product.id)}
      >
        {isWished ? '❤️' : '🤍'}
      </button>

      <div className="product-category">{product.category}</div>
      <div className="product-name">{product.name}</div>
      <div className="product-qty">{product.qty || '1 unit'}</div>
      <div className="product-rating">{starString(product.rating)}</div>
      <div className={`product-stock ${stock.cls}`}>{stock.label}</div>

      <div className="price-row">
        <span className="price-current">{formatPrice(product.price)}</span>
        {product.original && product.original > product.price && (
          <span className="price-original">{formatPrice(product.original)}</span>
        )}
      </div>

      <button
        className="add-cart-btn"
        data-id={product.id}
        disabled={product.stock === 0}
        onClick={() => addToCart(product.id)}
      >
        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
      </button>
    </div>
  );
}
