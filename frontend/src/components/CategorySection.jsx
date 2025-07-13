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
    <div className="py-12 bg-white">
      <h2 className="text-3xl font-bold text-center text-[#b08d57] mb-8">Catégories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
        {categories.map((category) => (
          <Link
            to={`/caftans/by_category/?category=${category.name}`} 
            key={category.id}
            className="border border-[#b08d57] rounded-lg p-6 hover:bg-[#f7f3ee] transition duration-300 text-center shadow-sm"
          >
            <h3 className="text-lg font-semibold text-[#4b3621]">{category.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
