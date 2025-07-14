import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCaftans, likeCaftan } from '../features/caftanSlice';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const CaftanPage = () => {
  const dispatch = useDispatch();
  const { caftans, status } = useSelector((state) => state.caftan);

  const [likedItems, setLikedItems] = useState(() => {
    const stored = localStorage.getItem('likedCaftans');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    dispatch(fetchCaftans());
  }, [dispatch]);

  const handleLike = (slug) => {
    dispatch(likeCaftan(slug));
    const updatedLiked = likedItems.includes(slug)
      ? likedItems.filter((item) => item !== slug)
      : [...likedItems, slug];
    setLikedItems(updatedLiked);
    localStorage.setItem('likedCaftans', JSON.stringify(updatedLiked));
  };

  return (
    <section className="container mt-41 mx-auto px-4 py-16 font-sans text-black">
      <h1 className="text-4xl font-bold text-center mb-12 tracking-wide">
        Découvrez Nos Caftans
      </h1>

      {status === 'loading' ? (
        <p className="text-center text-gray-600 text-lg">⏳ Chargement en cours...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {caftans.map((caftan) => {
            const isLiked = likedItems.includes(caftan.slug);

            return (
<div
  key={caftan.id}
   className="relative group bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
>
  {/* ❤️ Like button */}

                          <button
                  onClick={() => handleLike(caftan.slug)}
                  className="absolute top-3 right-3 z-10 bg-white p-1 rounded-full shadow-md hover:scale-110 transition"
                >
<Heart
  className={`w-5 h-5 transition-colors ${
    isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'
  }`}
/>

                </button>


  {/* 📷 Image */}
  <Link to={`/caftans/${caftan.slug}`}>
    <div className="overflow-hidden">
      <img
        src={caftan.image}
        alt={caftan.name}
        className="w-full h-[350px] object-contain transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  </Link>

  {/* 📦 Content */}
  <div className="p-5 space-y-2">
    {/* Name */}
    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#b08d57] transition-colors">
      {caftan.name}
    </h3>

    {/* Rating */}
    <div className="flex items-center space-x-1 text-sm text-yellow-400">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 ${
            star <= caftan.ratings ? 'text-yellow-400' : 'text-gray-200'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957h4.16c.969 0 1.371 1.24.588 1.81l-3.37 2.449 1.287 3.957c.3.921-.755 1.688-1.538 1.117L10 13.347l-3.37 2.449c-.783.57-1.838-.196-1.538-1.117l1.287-3.957-3.37-2.449c-.783-.57-.38-1.81.588-1.81h4.16l1.286-3.957z" />
        </svg>
      ))}
    </div>

    {/* Description */}
    <p className="text-sm text-gray-500 line-clamp-1">
      {caftan.description || 'Aucune description disponible.'}
    </p>

    {/* Price + Voir plus */}
    <div className="flex justify-between items-center pt-2">
      <span className="text-base font-medium text-gray-800">
        {caftan.price} MAD
      </span>
      <Link
        to={`/caftans/${caftan.slug}`}
        className="text-sm text-[#b08d57] font-medium hover:underline"
      >
        Voir plus →
      </Link>
    </div>
  </div>
</div>


            );
          })}
        </div>
      )}
    </section>
  );
};

export default CaftanPage;
