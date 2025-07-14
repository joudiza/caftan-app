import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCaftanById } from '../features/caftanSlice';
import { useParams } from 'react-router-dom';

const CaftanDetailPage = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { caftan, status } = useSelector((state) => state.caftan);

  useEffect(() => {
    dispatch(fetchCaftanById(slug));
  }, [dispatch, slug]);

  if (status === 'loading') {
    return <div className="text-center py-20 text-lg text-gray-500 animate-pulse">⏳ Chargement...</div>;
  }

  if (!caftan) {
    return <div className="text-center py-20 text-red-600 text-lg">Caftan introuvable.</div>;
  }

  return (
    <section className="container  mx-auto px-6 py-16 mt-41 font-sans text-black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image du caftan */}
        <div className="relative">
          <img
            src={caftan.image}
            alt={caftan.name}
            className="w-full h-[400px] object-contain rounded-xl border border-gray-200  shadow-sm"
          />
          <span className="absolute top-4 left-4 bg-white text-black px-3 py-1 rounded-full text-sm font-medium border border-gray-300 shadow-sm">
            {caftan.category?.name || "Caftan"}
          </span>
        </div>

        {/* Détails du caftan */}
        <div className="flex flex-col  justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-6">{caftan.name}</h1>
            <p className="text-gray-800 text-lg leading-relaxed mb-6">{caftan.description}</p>
            <p className="text-2xl font-semibold mb-8">{caftan.price} MAD</p>
          </div>
          <button className="w-full md:w-2/3 bg-black hover:bg-gray-800 text-white text-base py-3 rounded-md transition-all duration-300 shadow-md">
            🛍 Ajouter au panier
          </button>
        </div>
      </div>
    </section>
  );
};

export default CaftanDetailPage;
