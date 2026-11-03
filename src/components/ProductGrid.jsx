import React from 'react';
import { ProductCard } from './ProductCard';

export function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <p className="no-results" id="noResults" style={{ display: 'block' }}>
        No products found 😕
      </p>
    );
  }

  return (
    <div className="product-grid" id="productGrid">
      {products.map((p, index) => (
        <ProductCard key={p.id} product={p} index={index} />
      ))}
    </div>
  );
}
