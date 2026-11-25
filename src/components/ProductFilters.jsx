import React from 'react';
import { Icon } from './Icon';
import { CATEGORIES, CATEGORY_ICONS } from '../utils/constants';

export function ProductFilters({ activeCategory, onCategoryChange }) {
  return (
    <aside className="category-sidebar" aria-labelledby="category-heading">
      <h2 id="category-heading">Categories</h2>
      <nav className="category-list" aria-label="Product categories">
        {['all', ...CATEGORIES].map((category) => (
          <button type="button" key={category}
            className={`category-option ${activeCategory === category ? 'selected' : ''}`}
            aria-pressed={activeCategory === category}
            onClick={() => onCategoryChange(category)}>
            <span className="category-icon" aria-hidden="true"><Icon name={category === 'all' ? 'grid' : category === 'Dairy' || category === 'Personal Care' ? 'bottle' : category === 'Staples' ? 'wheat' : category === 'Snacks' || category === 'Protein' ? 'box' : 'leaf'} /></span>
            <span>{category === 'all' ? 'All Products' : category}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
