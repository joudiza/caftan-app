
import { FaWhatsapp, FaInstagram, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className=" bg-gray-800  text-white py-10 px-6 mt-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* ✅ Logo & Name */}
        <div>
          <h1 className="text-2xl font-[Cinzel] font-bold tracking-wide">
            CAFTAN <span className="text-[#b08d57]">NOBLE HERITAGE</span>
          </h1>
          <p className="text-sm mt-2">
            Artisanat marocain avec élégance et passion.
          </p>
        </div>

        {/* ✅ Navigation Links */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Navigation</h3>
          <ul className="space-y-1">
            <li><a href="#hero" className="hover:underline">Accueil</a></li>
            <li><a href="/caftans" className="hover:underline">Tous les Caftans</a></li>
            <li><a href="#about" className="hover:underline">À propos</a></li>
            <li><a href="#contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* ✅ Social Contact */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Contact</h3>
          <ul className="space-y-1">
            <li className="flex items-center justify-center md:justify-start gap-2">
              <FaWhatsapp className="text-[#25D366]" />
              <a href="https://wa.me/359877312928" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <FaInstagram className="text-pink-500" />
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <FaEnvelope className="text-white" />
              <a href="mailto:contact@caftan.com">contact@caftan.com</a>
            </li>
          </ul>
        </div>
      </div>

      {/* ✅ Bottom Text */}
      <div className="mt-8 text-sm text-center border-t pt-4 border-[#d4c5af]">
        &copy; {new Date().getFullYear()} Caftan Noble Heritage. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
