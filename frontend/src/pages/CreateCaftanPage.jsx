// src/pages/CreateCaftanPage.jsx
import { useState } from 'react';
import { useDispatch,useSelector} from 'react-redux';
import { createCaftan } from '../features/caftanSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchCategories } from '../features/categorySlice';
const CreateCaftanPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const { categories } = useSelector((state) => state.category);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    is_featured: false,
    image: null,
  });
useEffect(() => {
  dispatch(fetchCategories());
}, [dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'file') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }
    await dispatch(createCaftan(data)).unwrap();
    navigate('/admin/caftans');
  };

  return (
<div className="p-8 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold text-gray-800">➕ Add New Caftan</h2>
    <button
      onClick={() => navigate('/admin/caftans')}
      className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
    >
      ← Back to List
    </button>
  </div>

  <form onSubmit={handleSubmit} className="space-y-6">
    {/* Name */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
      <input
        name="name"
        onChange={handleChange}
        value={formData.name}
        placeholder="e.g. Elegant Green Caftan"
        className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm focus:ring focus:ring-blue-200"
        required
      />
    </div>

    {/* Slug */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
      <input
        name="slug"
        onChange={handleChange}
        value={formData.slug}
        placeholder="e.g. elegant-green-caftan"
        className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm"
        required
      />
    </div>

    {/* Description */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
      <textarea
        name="description"
        onChange={handleChange}
        value={formData.description}
        placeholder="Describe the caftan..."
        className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm"
        rows={4}
        required
      />
    </div>

    {/* Price and Stock */}
    <div className="flex gap-4">
      <div className="w-1/2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Price (MAD)</label>
        <input
          name="price"
          type="number"
          onChange={handleChange}
          value={formData.price}
          className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm"
          required
        />
      </div>
      <div className="w-1/2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
        <input
          name="stock"
          type="number"
          onChange={handleChange}
          value={formData.stock}
          className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm"
          required
        />
      </div>
    </div>

    {/* Category */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm"
        required
      >
        <option value="">-- Select a category --</option>
        {Array.isArray(categories) &&
          categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
      </select>
    </div>

    {/* Image Upload */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
      <input
        name="image"
        type="file"
        onChange={handleChange}
        className="w-full border border-gray-300 px-3 py-2 rounded bg-white"
        required
      />
    </div>

    {/* Featured Checkbox */}
    <div className="flex items-center space-x-3">
      <input
        type="checkbox"
        name="is_featured"
        checked={formData.is_featured}
        onChange={handleChange}
        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
      />
      <label className="text-sm text-gray-700">Mark as Featured</label>
    </div>

    {/* Submit Button */}
    <div className="text-right">
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow"
      >
        ✅ Save Caftan
      </button>
    </div>
  </form>
</div>

  );
};

export default CreateCaftanPage;
