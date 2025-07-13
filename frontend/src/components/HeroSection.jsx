import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { fetchCaftans } from '../features/caftanSlice';
import { useDispatch, useSelector } from 'react-redux';

const HeroSection = () => {
  const dispatch = useDispatch();
  const caftans = useSelector((state) => state.caftan.caftans);


  useEffect(() => {
    dispatch(fetchCaftans());
  }, [dispatch]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <div
      className="relative h-[600px] bg-cover bg-black/40 mt-41 pt-4 bg-center "
      style={{
        backgroundImage: "url('/images/bg1.jpg')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* طبقة شفافة على الخلفية */}
      <div className="absolute inset-0 z-10"></div>

      {/* المحتوى فوق الخلفية */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 h-full">
       <h2 className="text-4xl md:text-5xl font-[Cinzel] font-bold uppercase text-[#f0e6d2] drop-shadow-[0_2px_5px_rgba(0,0,0,0.7)] mb-8 text-center">
  Découvrez l'élégance des Caftans marocains
</h2>


        {/* ✅ السلايدر */}
        <div className="w-full max-w-6xl">
          <Slider {...settings}>
            {caftans.map((caftan) => (
              <div key={caftan.id} className="px-4">
                <div className="bg-transparent  rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={caftan.image}
                    alt={caftan.name}
                    className="w-[300px] h-[400px] object-conain "
                  />
                
                </div>
              </div>
            ))}
          </Slider>
<div className="absolute bottom-10 left-1/2 top-1/2 transform -translate-x-1/2">
  <a
    href="/caftans"
    className="inline-flex items-center gap-3 px-8 py-3  bg-[#3f904e]  text-white uppercase tracking-wider rounded-full shadow-md hover:shadow-xl hover:scale-105 transition duration-300 text-lg font-semibold"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L21 12m0 0l-3.75 5.25M21 12H3" />
    </svg>
    Voir tous les Caftans
  </a>
</div>


        </div>
      </div>
    </div>
  );
};

export default HeroSection;
