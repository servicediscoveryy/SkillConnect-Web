import { useState, useEffect } from "react";
import bannerData from "../../constant/data/banner.json";
import NavigationButton from "../NavigationButton";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const banners = bannerData.banners;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[250px] overflow-hidden bg-gray-100 my-3">
      {/* Banner Images */}
      <div
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="min-w-full h-full relative aspect-[1/2]"
          >
            <a href={banner.link} className="block w-full h-full">
              <img
                src={banner.imageUrl}
                alt={banner.alt}
                className="w-full h-full object-cover aspect-[1/2]"
              />
            </a>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <NavigationButton direction="left" onClick={prevSlide} />
      <NavigationButton direction="right" onClick={nextSlide} />

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index ? "bg-white w-4" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
