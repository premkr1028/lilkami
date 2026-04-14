import { useState } from "react";

const slides = [
  {
    desktop: "/images/banner-desktop-1.jpg",
    mobile: "/images/banner-mobile-1.jpg",
    alt: "Slide 1",
  },
  {
    desktop: "/images/banner-desktop-2.jpg",
    mobile: "/images/banner-mobile-2.jpg",
    alt: "Slide 2",
  },
  {
    desktop: "/images/banner-desktop-3.jpg",
    mobile: "/images/banner-mobile-3.jpg",
    alt: "Slide 3",
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-2xl">
      
      {/* Image Container with fixed aspect ratio */}
      <div className="relative w-full aspect-[16/9] bg-black">
        
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Desktop Image */}
            <img
              src={slide.desktop}
              alt={slide.alt}
              className="hidden md:block w-full h-full object-cover"
            />

            {/* Mobile Image */}
            <img
              src={slide.mobile}
              alt={slide.alt}
              className="block md:hidden w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Prev Button */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-black px-3 py-2 rounded-full shadow"
      >
        ‹
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-black px-3 py-2 rounded-full shadow"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full ${
              i === current ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
