import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCaftans, likeCaftan } from '../features/caftanSlice';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
const CaftanSection = () => {
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
    <section className="container  mx-auto px-4  font-sans text-black">
      <h1 className="text-2xl md:text-2xl font-[Cinzel]   text-[#3f904e] uppercase font-bold text-center mb-12 tracking-wide">
        Latest Caftans
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
                  <h2 className="text-lg font-semibold mb-2">{caftan.name}</h2>
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
      )}
    </section>
  )
}

export default CaftanSection
