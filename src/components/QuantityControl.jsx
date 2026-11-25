import React from 'react';
import { useCart } from '../context/CartContext';

export function QuantityControl({ product }) {
  const { cart, addToCart, changeQty } = useCart();
  const quantity = cart.find((item) => item.id === product.id)?.qty || 0;

  if (!quantity) {
    return (
      <button
        type="button"
        className="add-cart-btn"
        disabled={product.stock <= 0}
        aria-label={product.stock <= 0 ? `${product.name} is out of stock` : `Add ${product.name} to cart`}
        onClick={() => addToCart(product.id)}
      >
        {product.stock <= 0 ? 'Out of stock' : 'Add to Cart'}
      </button>
    );
  }

  return (
    <div className="quantity-control" aria-label={`Quantity controls for ${product.name}`}>
      <button
        type="button"
        className="qty-btn-minus"
        aria-label={`Decrease ${product.name} quantity`}
        onClick={() => changeQty(product.id, -1)}
      >
        −
      </button>
      <span className="quantity-value" aria-live="polite" aria-label={`${quantity} in cart`}>
        {quantity}
      </span>
      <button
        type="button"
        className="qty-btn-plus"
        aria-label={`Increase ${product.name} quantity`}
        disabled={quantity >= product.stock}
        onClick={() => changeQty(product.id, 1)}
      >
        +
      </button>
    </div>
  );
}
