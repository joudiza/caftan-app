// src/pages/HomePage.jsx
import HeroSection from '../components/HeroSection';
import CategorySection from '../components/CategorySection';

const HomePage = () => {
  return (
    <div>
        
      <HeroSection />
      <CategorySection />
    
      {/* فين غنديرو sections أخرى: nouveautés, populaires, ... */}
    </div>
  );
};

export default HomePage;
