import { Link } from 'react-router-dom';
import { ShoppingBag, Search, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("hero");
  useEffect(() => {
  const sections = ["hero", "categories", "about", "contact"];
  const observer = new IntersectionObserver(
    (entries) => {
      const visibleSection = entries.find(entry => entry.isIntersecting);
      if (visibleSection) {
        setActiveSection(visibleSection.target.id);
      }
    },
    { threshold: 0.6 }
  );

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  return () => observer.disconnect();
}, []);
 const handleNavigateToSection = (sectionId) => {
    navigate("/", { state: { scrollTo: sectionId } });
  
  };
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
  <button
    onClick={() => handleNavigateToSection("hero")}
    className={`relative pb-1 hover:text-[#b08d57] ${
      activeSection === "hero" ? "text-[#b08d57] font-semibold" : ""
    }`}
  >
    Accueil
    {activeSection === "hero" && (
      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#b08d57] rounded-full"></span>
    )}
  </button>

  <button
    onClick={() => navigate("/caftans")}
    className={`relative pb-1 hover:text-[#b08d57] ${
      window.location.pathname === "/caftans" ? "text-[#b08d57] font-semibold" : ""
    }`}
  >
    Tous les Caftans
    {window.location.pathname === "/caftans" && (
      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#b08d57] rounded-full"></span>
    )}
  </button>

  <button
    onClick={() => handleNavigateToSection("contact")}
    className={`relative pb-1 hover:text-[#b08d57] ${
      activeSection === "contact" ? "text-[#b08d57] font-semibold" : ""
    }`}
  >
    Contact
    {activeSection === "contact" && (
      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#b08d57] rounded-full"></span>
    )}
  </button>
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
