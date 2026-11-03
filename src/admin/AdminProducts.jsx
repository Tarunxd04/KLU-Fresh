import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useToast } from '../context/ToastContext';
import { formatPrice, stockInfo, imageSrc } from '../utils/formatters';
import { CATEGORIES } from '../utils/constants';
import { ProductFormModal } from './ProductFormModal';

export function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct, adjustStock } = useStore();
  const { showToast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [catFilter, setCatFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const filteredProducts = products.filter((p) => {
    const search = searchTerm.toLowerCase().trim();
    const matchesSearch =
      p.name.toLowerCase().includes(search) || p.category.toLowerCase().includes(search);
    const matchesCat = catFilter === 'all' || p.category === catFilter;
    return matchesSearch && matchesCat;
  });

  const handleOpenAdd = () => {
    setProductToEdit(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setProductToEdit(product);
    setModalOpen(true);
  };

  const handleDelete = (product) => {
    if (window.confirm(`Are you sure you want to delete "${product.name}" from catalog?`)) {
      deleteProduct(product.id);
      showToast('Product deleted from catalog');
    }
  };

  const handleStockInc = (product) => {
    adjustStock(product.id, 5);
    showToast(`Stock updated for ${product.name}`);
  };

  const handleSave = (prodData) => {
    if (productToEdit) {
      updateProduct(productToEdit.id, prodData);
      showToast(`✓ Updated ${prodData.name}`);
    } else {
      addProduct(prodData);
      showToast(`✓ Added ${prodData.name} to catalog`);
    }
    setModalOpen(false);
  };

  return (
    <div className="admin-tab-pane active" id="tab-admin-products">
      <div className="admin-header-row">
        <div>
          <h2>Product Catalog Management</h2>
          <p className="admin-subtitle">Add, edit, delete products and adjust inventory stock</p>
        </div>
        <button className="btn btn-primary" id="adminAddNewProductBtn" onClick={handleOpenAdd}>
          ➕ Add Product
        </button>
      </div>

      <div className="admin-search-filter-bar">
        <input
          type="text"
          id="adminProductSearch"
          className="admin-input-search"
          placeholder="Search products by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          id="adminProductCatFilter"
          className="admin-select-filter"
          value={catFilter}
          onChange={(e) => setCatFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="admin-section-card">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Name</th>
                <th>Category</th>
                <th>Unit</th>
                <th>Price</th>
                <th>Orig. Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="adminProductsTableBody">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    style={{ textAlign: 'center', color: 'var(--gray-text)', padding: '30px' }}
                  >
                    No products match criteria
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const stock = stockInfo(p.stock);
                  return (
                    <tr key={p.id}>
                      <td>
                        {p.image ? (
                          <img
                            src={imageSrc(p.image)}
                            className="table-img"
                            alt={p.name}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextSibling.style.display = 'inline-block';
                            }}
                          />
                        ) : null}
                        <span
                          className="table-thumb"
                          style={{ display: p.image ? 'none' : 'inline-block' }}
                        >
                          {p.emoji || '🛒'}
                        </span>
                      </td>
                      <td>
                        <strong>{p.name}</strong>
                      </td>
                      <td>{p.category}</td>
                      <td>{p.qty || '1 unit'}</td>
                      <td>
                        <strong>{formatPrice(p.price)}</strong>
                      </td>
                      <td>{p.original ? formatPrice(p.original) : '—'}</td>
                      <td>
                        <span className={`product-stock ${stock.cls}`}>{p.stock} units</span>
                      </td>
                      <td>
                        <button
                          className="action-icon-btn btn-stock-inc"
                          data-id={p.id}
                          title="Add 5 Stock"
                          onClick={() => handleStockInc(p)}
                        >
                          +5
                        </button>
                        <button
                          className="action-icon-btn btn-edit-product"
                          data-id={p.id}
                          title="Edit Product"
                          onClick={() => handleOpenEdit(p)}
                        >
                          ✏️
                        </button>
                        <button
                          className="action-icon-btn btn-delete btn-delete-product"
                          data-id={p.id}
                          title="Delete Product"
                          onClick={() => handleDelete(p)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ProductFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        productToEdit={productToEdit}
      />
    </div>
  );
}
