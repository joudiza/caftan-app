import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCaftanById, editCaftan } from '../features/caftanSlice';
import { fetchCategories } from '../features/categorySlice';

const EditCaftanPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { caftan } = useSelector((state) => state.caftan);
  const { categories } = useSelector((state) => state.category);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    is_featured: false,
    is_available: false,
    image: null,
  });

  useEffect(() => {
    dispatch(fetchCaftanById(id));
    dispatch(fetchCategories());
  }, [dispatch, id]);

  useEffect(() => {
    if (caftan) {
      setFormData({
        name: caftan.name || '',
        slug: caftan.slug || '',
        description: caftan.description || '',
        price: caftan.price || '',
        stock: caftan.stock || '',
        category: caftan.category || '',
        is_featured: caftan.is_featured || false,
        is_available: caftan.is_available || false,
        image: null, // نحافظ عليه null باش ما يتصيفطش url فـ formData
      });
    }
  }, [caftan]);

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
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    }

    try {
      await dispatch(editCaftan({ id, data })).unwrap();
      navigate('/admin/caftans'); // ✅ خلي navigation هنا ماشي فـ button
    } catch (error) {
      console.error('Error updating caftan:', error);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">✏️ Edit Caftan</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={formData.name} onChange={handleChange} className="border p-2 w-full" required />
        <input name="slug" value={formData.slug} onChange={handleChange} className="border p-2 w-full" required />
        <textarea name="description" value={formData.description} onChange={handleChange} className="border p-2 w-full" required />
        <input name="price" type="number" value={formData.price} onChange={handleChange} className="border p-2 w-full" required />
        <input name="stock" type="number" value={formData.stock} onChange={handleChange} className="border p-2 w-full" required />

        <label className="block">Category</label>
        <select name="category" value={formData.category} onChange={handleChange} className="border p-2 w-full" required>
          <option value="">-- Select a category --</option>
          {Array.isArray(categories) &&
            categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
        </select>

        <input name="image" type="file" onChange={handleChange} className="border p-2 w-full" />
        {caftan && caftan.image && (
  <img src={caftan.image} alt="Current" className="h-20 mt-2 rounded" />
)}

        <label className="flex items-center space-x-2">
          <input type="checkbox" name="is_featured" checked={formData.is_featured} onChange={handleChange} />
          <span>Featured</span>
        </label>

        <label className="flex items-center space-x-2">
          <input type="checkbox" name="is_available" checked={formData.is_available} onChange={handleChange} />
          <span>Available</span>
        </label>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditCaftanPage;
