import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../utils/constants';

export function ProductFormModal({ isOpen, onClose, onSave, productToEdit }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Fruits',
    qty: '',
    price: '',
    original: '',
    stock: '',
    emoji: '',
    image: '',
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name || '',
        category: productToEdit.category || 'Fruits',
        qty: productToEdit.qty || '',
        price: productToEdit.price !== undefined ? productToEdit.price : '',
        original: productToEdit.original !== undefined ? productToEdit.original : '',
        stock: productToEdit.stock !== undefined ? productToEdit.stock : '',
        emoji: productToEdit.emoji || '',
        image: productToEdit.image || '',
      });
    } else {
      setFormData({
        name: '',
        category: 'Fruits',
        qty: '',
        price: '',
        original: '',
        stock: '',
        emoji: '',
        image: '',
      });
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const priceNum = Number(formData.price);
    const origNum = Number(formData.original) || priceNum;
    const stockNum = Number(formData.stock) || 0;

    onSave({
      name: formData.name.trim(),
      category: formData.category,
      qty: formData.qty.trim() || '1 unit',
      price: priceNum,
      original: origNum,
      stock: stockNum,
      emoji: formData.emoji.trim() || '🛒',
      image: formData.image.trim() || undefined,
    });
  };

  return (
    <>
      <div className="overlay active" id="adminProductOverlay" onClick={onClose} />
      <div className="modal open" id="adminProductModal" data-lenis-prevent>
        <div className="modal-header">
          <h3 id="adminProductModalTitle">
            {productToEdit ? 'Edit Product' : 'Add New Product'}
          </h3>
          <button className="close-btn" id="closeAdminProductModal" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="modal-body">
          <form id="adminProductForm" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="span-2">
                <label className="form-input-label">Product Name *</label>
                <input
                  type="text"
                  id="adminProdName"
                  placeholder="e.g. Fresh Organic Apples"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="form-input-label">Category *</label>
                <select
                  id="adminProdCategory"
                  className="admin-select"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-input-label">Unit / Quantity *</label>
                <input
                  type="text"
                  id="adminProdQty"
                  placeholder="e.g. 1 kg, 500 g, 1 L"
                  required
                  value={formData.qty}
                  onChange={(e) => setFormData({ ...formData, qty: e.target.value })}
                />
              </div>

              <div>
                <label className="form-input-label">Selling Price (₹) *</label>
                <input
                  type="number"
                  id="adminProdPrice"
                  min="1"
                  placeholder="45"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>

              <div>
                <label className="form-input-label">Original Price (₹) *</label>
                <input
                  type="number"
                  id="adminProdOriginal"
                  min="1"
                  placeholder="60"
                  required
                  value={formData.original}
                  onChange={(e) => setFormData({ ...formData, original: e.target.value })}
                />
              </div>

              <div>
                <label className="form-input-label">Stock Units *</label>
                <input
                  type="number"
                  id="adminProdStock"
                  min="0"
                  placeholder="20"
                  required
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                />
              </div>

              <div>
                <label className="form-input-label">Display Emoji</label>
                <input
                  type="text"
                  id="adminProdEmoji"
                  placeholder="e.g. 🍎, 🥦, 🥛"
                  value={formData.emoji}
                  onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
                />
              </div>

              <div className="span-2">
                <label className="form-input-label">Image Path or URL (Optional)</label>
                <input
                  type="text"
                  id="adminProdImage"
                  placeholder="e.g. Images/Whey Protein.jpg"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <button
                type="button"
                className="btn btn-outline full-width"
                id="cancelAdminProductBtn"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary full-width"
                id="saveAdminProductBtn"
              >
                Save Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
