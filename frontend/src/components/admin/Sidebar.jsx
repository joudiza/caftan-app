import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Home, Layers, Users } from 'lucide-react';

const Sidebar = () => {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <Home size={18} /> },
    { label: 'Caftans', path: '/admin/caftans', icon: <Layers size={18} /> },
  ];

  if (user?.is_superuser) {
    navItems.push({
      label: 'Manage Admins',
      path: '/admin/admins',
      icon: <Users size={18} />,
    });
  }

  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-lg flex flex-col">
      <div className="p-6 text-2xl font-extrabold tracking-wide border-b border-gray-700">
        Admin Panel
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
              location.pathname === item.path
                ? 'bg-blue-600 text-white font-semibold shadow'
                : 'hover:bg-gray-700 text-gray-200'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="px-6 py-4 text-sm text-gray-400 border-t border-gray-700">
        Logged in as: <span className="text-white font-medium">{user?.username}</span>
      </div>
    </aside>
  );
};

export default Sidebar;
