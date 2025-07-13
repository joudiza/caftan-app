// src/pages/CaftanListPage.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCaftans, deleteCaftan } from '../features/caftanSlice';
import { useNavigate } from 'react-router-dom';

const CaftanListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { caftans, status, error } = useSelector((state) => state.caftan);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchCaftans());
  }, [dispatch]);

  const filteredCaftans = caftans.filter((caftan) =>
    caftan.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
   <div className="p-6 bg-gray-50 min-h-screen">
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-3xl font-semibold text-gray-800">🧵 Caftan List</h1>
    <button
      onClick={() => navigate('/admin/caftans/create')}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
    >
      ➕ Add New Caftan
    </button>
  </div>

  <div className="mb-6">
    <input
      type="text"
      placeholder="Search by name..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border border-gray-300 px-4 py-2 rounded w-full max-w-sm shadow-sm focus:ring focus:ring-blue-200"
    />
  </div>

  {status === 'loading' && <p className="text-blue-500">Loading caftans...</p>}
  {error && <p className="text-red-500">Error: {error}</p>}
  {status === 'succeeded' && filteredCaftans.length === 0 && (
    <p className="text-gray-600">No caftans found.</p>
  )}

  {status === 'succeeded' && filteredCaftans.length > 0 && (
    <div className="overflow-x-auto shadow rounded-lg bg-white">
      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-gray-100 text-xs text-gray-600 uppercase tracking-wider">
          <tr>
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Image</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Stock</th>
            <th className="px-4 py-3">Available</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Likes</th>
            <th className="px-4 py-3">Views</th>
            <th className="px-4 py-3">Featured</th>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCaftans.map((caftan, index) => (
            <tr key={caftan.id} className="border-t hover:bg-gray-50 transition">
              <td className="px-4 py-2 text-center">{index + 1}</td>
              <td className="px-4 py-2">
                <img
                  src={caftan.image}
                  alt={caftan.name}
                  className="h-12 w-12 object-cover rounded-md shadow-sm"
                />
              </td>
              <td className="px-4 py-2">{caftan.name}</td>
              <td className="px-4 py-2">{caftan.price} MAD</td>
              <td className="px-4 py-2">{caftan.stock}</td>
              <td className="px-4 py-2">
                <span className={caftan.is_available ? 'text-green-600' : 'text-red-500'}>
                  {caftan.is_available ? '✔ Available' : '✖ Not Available'}
                </span>
              </td>
              <td className="px-4 py-2">{caftan.category_name || '—'}</td>
              <td className="px-4 py-2">{caftan.likes}</td>
              <td className="px-4 py-2">{caftan.views}</td>
              <td className="px-4 py-2 text-center">{caftan.is_featured ? '⭐' : '—'}</td>
              <td className="px-4 py-2">{new Date(caftan.created_at).toLocaleDateString()}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => navigate(`/admin/caftans/edit/${caftan.id}`)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this caftan?')) {
                      dispatch(deleteCaftan(caftan.id))
                        .unwrap()
                        .then(() => dispatch(fetchCaftans()));
                    }
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

  );
};

export default CaftanListPage;
