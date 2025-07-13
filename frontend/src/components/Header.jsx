import { Link } from 'react-router-dom';
import { ShoppingBag, Search, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-10 left-0 w-full z-40 bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-6 md:px-16 py-4 flex justify-between items-center">
        
        {/* ✅ Logo */}
        <Link to="/" className="flex flex-col items-center group transition-transform duration-300 hover:scale-105">
          <h1 className="text-3xl font-[Cinzel] font-bold bg-gradient-to-r from-[#b08d57] to-[#a07744] bg-clip-text text-transparent">
            CAFTAN
          </h1>
          <span className="text-sm tracking-[0.35em] font-[Cinzel] text-[#b08d57] group-hover:text-[#a07744] transition-colors duration-300">
            NOBLE
          </span>
          <h1 className="text-3xl font-[Cinzel] font-bold bg-gradient-to-r from-[#b08d57] to-[#a07744] bg-clip-text text-transparent">
            HERITAGE
          </h1>
        </Link>

        {/* ✅ Navbar */}
        <nav className="space-x-6 hidden md:flex">
          {[
            ['/', 'Accueil'],
            ['/caftans', 'Tous les Caftans'],
            ['/about', 'À propos'],
            ['/contact', 'Contact'],
          ].map(([to, label]) => (
            <Link
              key={to}
              to={to}
              className="text-gray-700 hover:text-[#a07744] font-medium transition duration-300 hover:underline underline-offset-4"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* ✅ Icons */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-[#a07744] transition-transform transform hover:scale-110">
            <Search className="w-5 h-5" />
          </button>

          <button className="text-gray-600 hover:text-[#a07744] transition-transform transform hover:scale-110">
            <ShoppingBag className="w-5 h-5" />
          </button>

        </div>
      </div>
    </header>
  );
};

export default Header;
