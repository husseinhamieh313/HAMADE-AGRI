import React, { useState } from 'react';
import ProductModal from './ProductModal.jsx';
import * as api from '../../api/api.js';
import { useSettings } from '../../context/SettingsContext.jsx';

export default function ProductsPanel({ products, onRefresh }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const { currencySymbol } = useSettings();

  function openAdd() {
    setEditingProduct(null);
    setModalOpen(true);
  }

  function openEdit(product) {
    setEditingProduct(product);
    setModalOpen(true);
  }

  async function handleSave(data) {
    try {
      if (editingProduct) {
        await api.updateProduct(editingProduct.id, data);
      } else {
        await api.createProduct(data);
      }
      setModalOpen(false);
      onRefresh();
      alert('Product saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save product.');
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.deleteProduct(id);
      onRefresh();
      alert('Product deleted successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to delete product.');
    }
  }

  return (
    <section className="content-panel">
      <div className="section-header">
        <h2 className="section-title">Product Management</h2>
        <button className="btn btn-primary" onClick={openAdd}>+ Add Product</button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {product.image ? (
                    <img src={product.image} style={{ width: 50, height: 50, borderRadius: 8, objectFit: 'cover' }} alt="" />
                  ) : (
                    <span style={{ fontSize: '2rem' }}>{product.icon}</span>
                  )}
                  <span>{product.name}</span>
                </div>
              </td>
              <td><span className="badge badge-success">{product.category}</span></td>
              <td>{currencySymbol}{Number(product.price).toFixed(2)}</td>
              <td style={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.description}</td>
              <td>
                <div className="action-buttons">
                  <button className="action-btn btn-primary" onClick={() => openEdit(product)}>Edit</button>
                  <button className="action-btn btn-danger" onClick={() => handleDelete(product.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ProductModal open={modalOpen} product={editingProduct} onClose={() => setModalOpen(false)} onSave={handleSave} />
    </section>
  );
}