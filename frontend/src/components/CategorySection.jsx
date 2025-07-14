// src/components/CategorySection.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../features/categorySlice';
import { Link } from 'react-router-dom';

const CategorySection = () => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (status === 'loading') return <p className="text-center my-10">⏳ Chargement des catégories...</p>;
  if (status === 'failed') return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="py-16 px-6 bg-white">
      <h2 className="text-2xl md:text-2xl font-[Cinzel] font-bold uppercase  text-center text-[#3f904e] mb-8">Catégories</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto justify-center items-center px-4">
        {categories.map((category) => (
          <Link
            to={`/caftans/by_category/?category=${category.name}`} 
            key={category.id}
            className="flex flex-col border items-center justify-center p-4   shadow-md hover:bg-[#f7f3ee] transition duration-300"
          >
            {/* ✅ الصورة فشكل دائرة */}
            {category.image ? (
              <img
                src={category.image}
                alt={category.name}
                className="w-36 h-36 object-cover rounded-full  mb-3 border border-[#d6c1a5]"
              />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center rounded-full bg-[#f3eadd] mb-3 text-3xl text-[#b08d57]">
                👗
              </div>
            )}

            <h3 className="text-lg uppercase font-semibold font-[Cinzel] text-[#2e3e68] text-center">{category.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
