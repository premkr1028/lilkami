import React, { useState } from "react";
import { ArrowDownToLine, Heart, Monitor, Smartphone } from "lucide-react";
import WallpaperCardComp from "./WallpaperCardComp.jsx";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
const images = [
  {
    link: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1000&auto=format&fit=crop",
    type: "desktop",
  },
  {
    link: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?q=80&w=1000&auto=format&fit=crop",
    type: "mobile",
  },
  // Handling the strings safely by providing a fallback type
  { link: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=1000&auto=format&fit=crop", type: "desktop" },
  { link: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1000&auto=format&fit=crop", type: "mobile" },
  { link: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000&auto=format&fit=crop", type: "desktop" },
  { link: "https://images.unsplash.com/photo-1528319725582-ddc096101511?q=80&w=1000&auto=format&fit=crop", type: "mobile" },
];

const LikedWallpapers = () => {
  const [likedWallpapers, setlikedWallpapers] = useState([])
  const {user} = useUser()
  useEffect(() => {
  const fetchLikedWall = async () => {
    try {
      const res = await axios.get("https://lilkami-server.vercel.app/api/get-liked-wallpaper", {
        params: {
          id: user?.id // Optional chaining protects against null users
        }
      });

      // 2. Access the data property
      console.log(res)
      console.log(res?.data); 
      setlikedWallpapers(res?.data.likedWallpaper)
      console.log(likedWallpapers)
    } catch (err) {
      console.error(err);
      alert("dataNotGet failed");
    }
  };

  fetchLikedWall();
}, []);
  return (
   
     
      <>
      {likedWallpapers.length > 0 ? (
        <div className="columns-2 gap-4 space-y-4 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6">
          {likedWallpapers.map((data, i) => (
            <div key={data.id || i} className="break-inside-avoid">
              <WallpaperCardComp 
                i = {i}
                data={data} 
                src={data.link} 
                type={data.type || "desktop"} 
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-20">
          <p>No liked wallpapers yet. Go explore!</p>
        </div>
      )}
   </>
  
  );
};

export default LikedWallpapers;