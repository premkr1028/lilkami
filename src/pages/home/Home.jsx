import React, { useState, useEffect, useRef } from "react";
import { Search, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import axios from "axios";

import HomePageWallpapers from "../../components/HomePageWallpapers.jsx";
import inputTags from "../../localData/localData.js";

const CATEGORIES = [
  { title: "Desktop Wallpapers", img: "https://ik.imagekit.io/z2jwotlhm/rawData/your-name-4k-desktop-wallpaper" },
  { title: "Anime GIFs", img: "https://ik.imagekit.io/z2jwotlhm/rawData/rem-rotating-the-finger.gif" },
  { title: "Mobile Wallpapers", img: "https://ik.imagekit.io/z2jwotlhm/rawData/rem-mobile-wallpaper" },
  { title: "Anime PFPs", img: "https://ik.imagekit.io/z2jwotlhm/rawData/pfp" },
];

const Home = () => {
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const dropdownRef = useRef(null);
  
  const navigate = useNavigate(); // 2. Initialize navigate

  // --- Logic: API Fetching ---
  const callData = async (query) => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await axios.get("https://lilkami-server.vercel.app/api/search", {
        params: { q: query },
      });
      setSearchResults(res.data || []);
    } catch (error) {
      console.error("Search API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- Logic: Debouncing ---
  useEffect(() => {
    if (!search.trim()) {
      setSearchResults([]);
      return;
    }
    const delayDebounceFn = setTimeout(() => {
      callData(search);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  // --- Logic: Updated Click Handlers ---
  const handleResultClick = (value) => {
    const query = value.toLowerCase().trim();
    if (query) {
      setShowDropdown(false);
      // 3. Navigate to the dynamic search route
      navigate(`/search/${encodeURIComponent(query)}`);
    }
  };

  // 4. Handle Enter Key Press
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && search.trim() !== "") {
      handleResultClick(search);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getProcessedResults = () => {
    const query = search.toLowerCase().trim();
    if (!query) return [];
    const rawList = searchResults.flatMap((item) => {
      const matches = [];
      const clean = (str) => String(str).replace(/[\[\]"]/g, "").trim();
      const cleanTitle = item.title ? clean(item.title) : "";
      if (cleanTitle.toLowerCase().startsWith(query)) matches.push(cleanTitle);
      if (Array.isArray(item.tags)) {
        item.tags.forEach((tag) => {
          const cleanTag = clean(tag);
          if (cleanTag.toLowerCase().startsWith(query)) matches.push(cleanTag);
        });
      }
      return matches;
    });
    return Array.from(new Set(rawList)).slice(0, 6);
  };

  const processedResults = getProcessedResults();

  return (
    <main className="flex flex-col items-center gap-10 px-4 sm:px-8 md:px-16 py-14">
      {/* Hero Section */}
      <section className="max-w-4xl text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-gray-900">
          Pixel-Perfect Moments <br className="hidden sm:block" />
          from Your Favorite Worlds
        </h1>
      </section>

      {/* Search Input Area */}
      <div className="w-full max-w-xl relative" ref={dropdownRef}>
        <div className="relative group">
          <input
            type="text"
            value={search}
            onFocus={() => setShowDropdown(true)}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown} // 5. Added keydown listener
            placeholder="Search by name or tag..."
            className="w-full border border-gray-200 focus:border-black focus:ring-4 focus:ring-black/5 outline-none pl-6 pr-14 py-4 rounded-full text-sm sm:text-base transition-all duration-300 shadow-sm"
          />
          <div 
            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
            onClick={() => handleResultClick(search)} // 6. Clicking icon also searches
          >
            {loading ? <Loader2 size={20} className="animate-spin text-black" /> : <Search size={20} />}
          </div>
        </div>

        {/* Dropdown Results */}
        {showDropdown && search.trim() !== "" && (
          <div className="absolute top-full mt-3 bg-white w-full max-h-80 border border-gray-100 shadow-2xl rounded-2xl z-50 overflow-y-auto">
            <ul className="py-2">
              {processedResults.length > 0 ? (
                processedResults.map((result, index) => (
                  <li
                    key={index}
                    onClick={() => handleResultClick(result)}
                    className="px-6 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 transition-colors border-b border-gray-50 last:border-0"
                  >
                    <Search size={16} className="text-gray-400 shrink-0" />
                    <span className="text-gray-800 font-medium lowercase">
                      {result}
                    </span>
                  </li>
                ))
              ) : (
                !loading && (
                  <li className="px-6 py-4 text-gray-400 text-sm italic text-center">
                    No matching results found
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Quick Select Tags */}
      <div className="flex gap-2 sm:gap-3 flex-wrap justify-center max-w-2xl">
        {inputTags.slice(0, 8).map((tag) => (
          <button
            key={tag}
            onClick={() => handleResultClick(tag)}
            className="bg-gray-100 hover:bg-black hover:text-white transition rounded-full text-xs sm:text-sm px-5 py-2 active:scale-95"
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* Categories */}
    

      <HomePageWallpapers results={searchResults} />
    </main>
  );
};

export default Home;