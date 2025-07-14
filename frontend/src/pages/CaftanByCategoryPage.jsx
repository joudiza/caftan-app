import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCaftansByCategory, likeCaftan } from '../features/caftanSlice';
import { Heart } from 'lucide-react'; // ✅ تأكد من التثبيت: npm i lucide-react

const CaftanByCategoryPage = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  const dispatch = useDispatch();
  const { caftans, status, error } = useSelector((state) => state.caftan);
const loading = status === 'loading';

  const [likedItems, setLikedItems] = useState(() => {
    const stored = localStorage.getItem('likedCaftans');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    if (category) {
      dispatch(fetchCaftansByCategory(category));
    }
  }, [dispatch, category]);
  useEffect(() => {
  console.log("🔍 caftans:", caftans);
  console.log("📦 loading:", loading);
  console.log("❗ error:", error);
}, [caftans, loading, error]);

  const handleLike = (slug) => {
    dispatch(likeCaftan(slug));
    const updatedLiked = likedItems.includes(slug)
      ? likedItems.filter((item) => item !== slug)
      : [...likedItems, slug];
    setLikedItems(updatedLiked);
    localStorage.setItem('likedCaftans', JSON.stringify(updatedLiked));
  };

  return (
    <div className="p-6 mt-44">
{status === 'succeeded' && caftans.length === 0 && (
  <p className="text-gray-500 text-center">Aucun caftan trouvé dans cette catégorie.</p>
)}

{status === 'failed' && error && (
  <p className="text-red-500 text-center">
    Une erreur est survenue : {error === "Rejected" ? "Vérifiez votre connexion ou l’URL de la catégorie." : error}
  </p>
)}


      {loading ? (
        <p className="text-center text-gray-600 text-lg">⏳ Chargement en cours...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <section className="container mx-auto px-4 py-16 font-sans text-black">
          <h2 className="text-3xl font-bold text-center mb-12 tracking-wide text-[#4b3621]">
            Découvrez Nos {category}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {caftans.map((caftan) => {
              const isLiked = likedItems.includes(caftan.slug);

              return (
                <div
                  key={caftan.id}
                  className="relative bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300"
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

                  <Link to={`/caftans/${caftan.slug}`}>
                    <img
                      src={caftan.image}
                      alt={caftan.name}
                      className="w-full h-[400px] object-contain rounded-t-xl transition-transform duration-500 hover:scale-105 bg-white"
                    />
                  </Link>

                  <div className="p-5">
                    <h3 className="text-lg font-semibold mb-2">{caftan.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800 font-medium">{caftan.price} MAD</span>
                      <Link
                        to={`/caftans/${caftan.slug}`}
                        className="text-sm bg-black text-white px-4 py-1.5 rounded-md hover:bg-gray-800 transition"
                      >
                        Voir plus
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

export default CaftanByCategoryPage;
