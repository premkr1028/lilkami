import React, { useEffect, useState } from "react";
import { MoveRight } from "lucide-react";
import axios from "axios";
import WallpaperCardComp from "./WallpaperCardComp.jsx";
import { useNavigate } from "react-router-dom";
const HomePageWallpapers = () => {
  const [images, setImages] = useState([]);
 const navigate  = useNavigate()
  useEffect(() => {
    const fetchTrendingWallpapers = async () => {
      try {
        const response = await axios.get("https://lilkami-server.vercel.app/api/trending-wallpaper");
        // Ensure we are setting an array even if the response is unexpected
        setImages(response?.data?.wallData || []);
      } catch (error) {
        console.error("Error fetching wallpapers:", error);
      }
    };
    fetchTrendingWallpapers();
  }, []);
const navigateToRecent = () =>{
  navigate("/recent-wallpapers");
}
  return (
    <main className="w-full max-h-screen px-4 py-10">
      <h1 className="group flex gap-2 items-center pb-6 px-1 text-2xl cursor-pointer">
        Trending 
        <MoveRight className="transition-transform group-hover:translate-x-2 group-hover:bg-gray-200 rounded-full p-1"/>
      </h1>

      <div className="columns-2 gap-4 space-y-4 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6">
        {/* Only take the first 20 items from the array */}
        {images.slice(0, 20).map((data, i) => (
          <div
            key={data._id || i} // Use a unique ID if available instead of index
            className="relative break-inside-avoid overflow-hidden rounded-2xl group cursor-zoom-in bg-zinc-200 shadow-sm hover:shadow-xl transition-shadow duration-300"
          >
            <WallpaperCardComp data={data}/>
          </div>
        ))}
      </div>

      <div className="w-full flex justify-center mt-12">
        <button onClick={navigateToRecent}  className="px-8 py-3 font-medium text-zinc-700 border-2 border-zinc-200 rounded-full hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all duration-300 active:scale-95">
          Explore More Wallpapers
        </button>
      </div>
    </main>
  );
};

export default HomePageWallpapers;