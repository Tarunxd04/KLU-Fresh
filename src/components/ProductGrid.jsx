import React from 'react';
import { ProductCard } from './ProductCard';

export function ProductGrid({ products, onReset }) {
  if (products.length === 0) {
    return (
      <div className="empty-results" id="noResults">
        <h3>No groceries found</h3><p>Try a different product name or browse all categories.</p>
        <button className="btn btn-primary" onClick={onReset}>Browse all products</button>
      </div>
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
