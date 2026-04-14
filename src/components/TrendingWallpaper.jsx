import React, { useRef, useState, useEffect } from "react";
import { MoveRight, Eye, ArrowDownToLine, Heart, ChevronLeft, ChevronRight } from "lucide-react";

// Mock data with variety to test layout
const wallpapers = [
  { id: 1, title: "Your Lie in April", views: 1240, tags: ["anime", "music", "sad"], image: "https://images.alphacoders.com/605/605592.png" },
  { id: 2, title: "Cyberpunk Night", views: 850, tags: ["dark", "neon", "4k"], image: "https://images8.alphacoders.com/108/1089332.jpg" },
  { id: 3, title: "Minimalist Forest", views: 430, tags: ["nature", "green"], image: "https://images5.alphacoders.com/112/1123013.jpg" },
  { id: 4, title: "Naruto Uzumaki", views: 2100, tags: ["naruto", "shonen", "4k"], image: "https://images6.alphacoders.com/606/606255.jpg" },
  { id: 5, title: "Spirited Away", views: 920, tags: ["ghibli", "classic"], image: "https://images.alphacoders.com/134/1342614.png" },
  { id: 6, title: "Abstract Waves", views: 110, tags: ["abstract", "blue", "8k"], image: "https://images7.alphacoders.com/942/942557.jpg" },
];

const TrendingDesktopWallpapers = () => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

  // Check scroll position to hide/show left arrow
  const handleScroll = () => {
    if (scrollRef.current) {
      setShowLeftArrow(scrollRef.current.scrollLeft > 10);
    }
  };

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 320; 
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Heading */}
      <div className="flex justify-between items-end mb-6">
        <h2 className="flex items-center gap-2 text-2xl font-bold group cursor-pointer">
          Trending Desktop Wallpapers
          <MoveRight size={22} className="transition-transform duration-200 group-hover:translate-x-2 text-rose-500" />
        </h2>
      </div>

      <div className="relative group/nav">
        {/* Left Scroll Button - Hidden if at start */}
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center border border-slate-100 hover:bg-slate-50 transition-all active:scale-90"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {/* Right Scroll Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center border border-slate-100 hover:bg-slate-50 transition-all active:scale-90"
        >
          <ChevronRight size={20} />
        </button>

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide scroll-smooth snap-x snap-mandatory"
        >
          {wallpapers.map((item) => (
            <div
              key={item.id}
              className="min-w-[280px] md:min-w-[300px] snap-start group rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
            >
              {/* Image Section */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                   <button className="bg-white/90 text-black px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    Preview
                   </button>
                </div>
                <span className="absolute top-3 left-3 px-2 py-1 text-[9px] font-bold rounded bg-black/60 text-white backdrop-blur-md">
                  4K ULTRA HD
                </span>
              </div>

              {/* Info Section */}
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-bold text-slate-800 line-clamp-1 truncate mr-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1 text-slate-400 shrink-0">
                    <Eye size={13} />
                    <span className="text-[11px] font-semibold">{item.views.toLocaleString()}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5 h-6 overflow-hidden">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="text-slate-500 text-[10px] font-medium hover:text-rose-500 cursor-pointer transition-colors">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl py-2.5 transition-colors active:scale-[0.98]">
                    <ArrowDownToLine size={16} />
                    <span className="text-xs font-bold uppercase tracking-tight">Download</span>
                  </button>
                  <button className="w-11 h-11 flex items-center justify-center bg-slate-50 hover:bg-rose-50 hover:text-rose-500 text-slate-400 rounded-xl border border-slate-100 transition-all active:scale-90">
                    <Heart size={18} fill={item.id === 1 ? "#f43f5e" : "transparent"} className={item.id === 1 ? "text-rose-500" : ""} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingDesktopWallpapers;