import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { logout } from '../../features/authSlice';

const Topbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm px-6 py-5 flex items-center justify-between">
      <div className="text-xl font-bold text-gray-800 tracking-wide">
        Welcome back, <span className="text-blue-600">{user?.username}</span>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
      >
        <LogOut size={18} />
        <span className="font-medium">Logout</span>
      </button>
    </header>
  );
};

export default Topbar;
