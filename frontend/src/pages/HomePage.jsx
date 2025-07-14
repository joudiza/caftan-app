// src/pages/HomePage.jsx
import HeroSection from '../components/HeroSection';
import CategorySection from '../components/CategorySection';
import ContactSection from '../components/ContactSection';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import CaftanSection from '../components/CaftanSection'; // Assuming you have a CaftanSection component
const HomePage = () => {
    const location = useLocation();
useEffect(() => {
  if (location.state?.scrollTo) {
    const element = document.getElementById(location.state.scrollTo);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });

      // ✅ نمسحو scrollTo من الhistory باش ما يعاودش يهزنا تلقائياً
      window.history.replaceState({}, '', location.pathname);
    }
  }
}, [location]);

  return (
    <div>
      <section id="hero">
        <HeroSection />
      </section>

      <section id="categories">
        <CategorySection />
      </section>
    
        <CaftanSection />
    
      <section id="contact">
        <ContactSection />
      </section>
    </div>
  );
};

export default HomePage;