// src/pages/ManageAdmins.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, createUser } from '../features/userSlice';

const ManageAdminsPage = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    is_staff: true,
    is_superuser: false,
  });

   useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleCreate = async () => {
    if (!form.username || !form.email || !form.password) {
      alert("Please fill all fields.");
      return;
    }
     dispatch(createUser(form));
    setForm({
      username: '',
      email: '',
      password: '',
      is_staff: true,
      is_superuser: false
    });
    dispatch(fetchUsers());
  };


  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">👨‍💼 Manage Admins</h2>

      <div className="bg-white shadow-md rounded-lg p-6 mb-10 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">➕ Add New Admin</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              checked={form.is_superuser}
              onChange={(e) => setForm({ ...form, is_superuser: e.target.checked })}
              className="h-5 w-5 text-blue-600"
            />
            <span className="text-gray-700">Superuser</span>
          </label>
        </div>
        <button
          onClick={handleCreate}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Admin
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-x-auto border border-gray-200">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="px-6 py-3 border-b">Username</th>
              <th className="px-6 py-3 border-b">Email</th>
              <th className="px-6 py-3 border-b">Staff</th>
              <th className="px-6 py-3 border-b">Superuser</th>
            </tr>
          </thead>
          <tbody>
            {users.map((admin) => (
              <tr key={admin.id} className="hover:bg-gray-50">
                <td className="px-6 py-3 border-b">{admin.username}</td>
                <td className="px-6 py-3 border-b">{admin.email}</td>
                <td className="px-6 py-3 border-b">{admin.is_staff ? '✅' : '❌'}</td>
                <td className="px-6 py-3 border-b">{admin.is_superuser ? '✅' : '❌'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAdminsPage;
