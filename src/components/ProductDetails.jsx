import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { useCart } from '../context/CartContext';
import { formatPrice, imageSrc, stockInfo, starString, discountPercent } from '../utils/formatters';
import { QuantityControl } from './QuantityControl';
import { ProductCard } from './ProductCard';
import { Icon } from './Icon';

const storage = {
  Fruits: 'Store in a cool place. Refrigerate ripe fruit and wash before eating.',
  Vegetables: 'Store in a cool place or refrigerate as appropriate. Wash before preparation.',
  Dairy: 'Follow package refrigeration and use-by instructions.',
  Protein: 'Follow package storage instructions. Keep chilled and cook thoroughly.',
  'Personal Care': 'Store away from direct heat and sunlight. Follow label instructions.',
};

export function ProductDetails({ id }) {
  const { products } = useStore();
  const { wishlist, toggleWishlist } = useCart();
  const [imgError, setImgError] = useState(false);

  const product = products.find((p) => String(p.id) === id);

  if (!product) {
    return (
      <main className="detail-page" role="main">
        <div className="empty-results">
          <h1>Product not found</h1>
          <p>This grocery item may no longer be available in our catalog.</p>
          <Link to="/" className="btn btn-primary">
            Back to shopping
          </Link>
        </div>
      </main>
    );
  }

  const stock = stockInfo(product.stock);
  const discount = discountPercent(product);
  const isWished = wishlist.includes(product.id);
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="detail-page" key={id} role="main">
      <div className="detail-nav-bar">
        <Link to="/" className="back-link" aria-label="Back to all products">
          <Icon name="arrowLeft" size={16} />
          <span>Back to products</span>
        </Link>
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Shop</Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span aria-current="page">{product.name}</span>
        </nav>
      </div>

      <div className="detail-layout">
        <div className="detail-image">
          {product.image && !imgError ? (
            <img
              src={imageSrc(product.image)}
              alt={product.name}
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="product-emoji" style={{ fontSize: '96px' }}>
              {product.emoji || '🛒'}
            </span>
          )}
          {discount > 0 && <span className="discount-sticker">-{discount}%</span>}
        </div>

        <div className="detail-copy">
          <span className="eyebrow">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="detail-pack">{product.qty || '1 unit'}</p>
          <div className="product-rating" style={{ marginBottom: '8px' }}>
            {starString(product.rating)}
          </div>

          <div className="detail-price">
            <span className="price-current">{formatPrice(product.price)}</span>
            {product.original && product.original > product.price && (
              <del className="price-original">{formatPrice(product.original)}</del>
            )}
          </div>

          <p className={`product-stock ${stock.cls}`}>{stock.label}</p>

          <p className="detail-desc">
            {product.description ||
              `Fresh, handpicked ${product.name}. Carefully quality-checked and packaged in a ${
                product.qty || 'standard'
              } pack for your everyday kitchen and pantry essentials.`}
          </p>

          <div className="detail-actions">
            <QuantityControl product={product} />
            <button
              type="button"
              className="detail-wish"
              aria-pressed={isWished}
              aria-label={isWished ? `Remove ${product.name} from wishlist` : `Save ${product.name} for later`}
              onClick={() => toggleWishlist(product.id)}
            >
              <Icon name="heart" size={18} />
              <span>{isWished ? 'Saved' : 'Save for later'}</span>
            </button>
          </div>

          <div className="delivery-note">
            <Icon name="pin" size={20} />
            <span>
              Express 15-minute delivery across Vijayawada &amp; KL University campus. Select your time slot at checkout.
            </span>
          </div>

          <h2>Product Specifications</h2>
          <dl className="spec-list">
            <div>
              <dt>Category</dt>
              <dd>{product.category}</dd>
            </div>
            <div>
              <dt>Pack Size</dt>
              <dd>{product.qty || '1 unit'}</dd>
            </div>
            <div>
              <dt>Stock Status</dt>
              <dd>{product.stock > 0 ? `${product.stock} units available` : 'Out of stock'}</dd>
            </div>
          </dl>

          <h2>Storage &amp; Care</h2>
          <p className="storage-note">
            {product.storageInstructions ||
              storage[product.category] ||
              'Store in a cool, dry place. Keep sealed and follow the package instructions.'}
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="related-products marketplace" aria-labelledby="related-heading">
          <h2 id="related-heading">You might also like</h2>
          <div className="product-grid">
            {related.map((p, idx) => (
              <ProductCard product={p} index={idx} key={p.id} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
