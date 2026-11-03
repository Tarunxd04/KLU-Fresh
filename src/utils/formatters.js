export function formatPrice(n) {
  return '₹' + Math.round(n || 0);
}

export function stockInfo(stock) {
  if (stock === 0) return { label: 'Out of Stock', cls: 'stock-out' };
  if (stock <= 3) return { label: `Only ${stock} left`, cls: 'stock-low' };
  return { label: 'In Stock', cls: 'stock-in' };
}

export function starString(rating) {
  const full = Math.round(rating || 4.5);
  return '★'.repeat(full) + '☆'.repeat(5 - full) + ` (${rating || 4.5})`;
}

export function discountPercent(p) {
  if (!p || !p.original || p.original <= p.price) return 0;
  return Math.round(((p.original - p.price) / p.original) * 100);
}

export function imageSrc(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:') || path.startsWith('/')) {
    return path;
  }
  return '/' + path;
}
