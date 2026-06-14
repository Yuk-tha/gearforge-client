import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import { productAPI } from '../../services/api';
import toast from 'react-hot-toast';

const emptyForm = {
  name: '', description: '', category: 'Keyboards',
  image: '', price: '', stock: '', rating: ''
};

const categories = ['Keyboards', 'Mouse', 'Headsets', 'Controllers', 'Chairs', 'Mousepads', 'Webcams', 'Microphones'];

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchProducts = async () => {
    try {
      const { data } = await productAPI.getAll({ limit: 100 });
      setProducts(data.products);
    } catch {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const openAdd = () => {
    setEditProduct(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (product) => {
    setEditProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      category: product.category,
      image: product.image,
      price: product.price,
      stock: product.stock,
      rating: product.rating,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      if (editProduct) {
        await productAPI.update(editProduct._id, form);
        toast.success('Product updated!');
      } else {
        await productAPI.create(form);
        toast.success('Product added!');
      }
      setShowModal(false);
      fetchProducts();
    } catch {
      toast.error('Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await productAPI.delete(id);
      toast.success('Product deleted!');
      fetchProducts();
    } catch {
      toast.error('Failed to delete product');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">
          Manage <span className="text-primary">Products</span>
        </h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-primary hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
        >
          <FaPlus /> Add Product
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 glass rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="glass rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 border-b border-border bg-surfaceLight">
                  <th className="text-left px-4 py-3">Product</th>
                  <th className="text-left px-4 py-3">Category</th>
                  <th className="text-left px-4 py-3">Price</th>
                  <th className="text-left px-4 py-3">Stock</th>
                  <th className="text-left px-4 py-3">Rating</th>
                  <th className="text-left px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b border-border/50 hover:bg-surfaceLight transition">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-lg" />
                        <span className="text-white text-xs line-clamp-1 max-w-xs">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-primary text-xs">{product.category}</td>
                    <td className="px-4 py-3 text-white font-bold">₹{product.price.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={product.stock > 0 ? 'text-green-400' : 'text-red-400'}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-yellow-400">{product.rating} ⭐</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(product)} className="text-neon hover:text-blue-300 transition">
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDelete(product._id)} className="text-red-400 hover:text-red-300 transition">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="glass rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">
                {editProduct ? 'Edit Product' : 'Add Product'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: 'Product Name', key: 'name', type: 'text' },
                { label: 'Image URL', key: 'image', type: 'text' },
                { label: 'Price (₹)', key: 'price', type: 'number' },
                { label: 'Stock', key: 'stock', type: 'number' },
                { label: 'Rating (0-5)', key: 'rating', type: 'number' },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-gray-300 text-sm mb-1">{field.label}</label>
                  <input
                    type={field.type}
                    value={form[field.key]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    className="w-full bg-surfaceLight border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition"
                    required
                  />
                </div>
              ))}
              <div>
                <label className="block text-gray-300 text-sm mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-surfaceLight border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full bg-surfaceLight border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-primary hover:bg-purple-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition"
              >
                {saving ? 'Saving...' : editProduct ? 'Update Product' : 'Add Product'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;