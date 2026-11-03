import React from 'react';
import { CATEGORIES } from '../utils/constants';

export function ProductFilters({
  activeCategory,
  onCategoryChange,
  activeSort,
  onSortChange,
  resultsCount,
}) {
  return (
    <div className="filters-bar scroll-reveal">
      <div className="filter-group" id="filterCategoryGroup">
        <label>Category</label>
        <select
          id="filterCategory"
          value={activeCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="all">All</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Sort by</label>
        <select
          id="sortSelect"
          value={activeSort}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="default">Featured</option>
          <option value="price-low">Price: Low → High</option>
          <option value="price-high">Price: High → Low</option>
          <option value="rating">Rating</option>
          <option value="discount">Discount</option>
        </select>
      </div>

      <div className="results-count" id="resultsCount">
        {resultsCount} product{resultsCount !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
