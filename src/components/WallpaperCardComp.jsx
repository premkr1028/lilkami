
import React, { useState } from 'react'
import LikeButton from './LikeButton.jsx';
import { ArrowDownToLine, Heart, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WallpaperCardComp = ({data,i,tags,visibleTags,MAX_LENGTH}) => {
  const navigate = useNavigate();
  const [previewPage, setPreviewPage] = useState(true)
  const [downloading, setDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [imageUrl, setImageUrl] = useState(data.imageUrl);
   const  wallpaperId = data._id
  const previewImage = (wallpaperId) => {
  // Use a template literal to inject the variable directly
  navigate(`/wallpaper/${wallpaperId}`);
};
 const handleDownload = async () => {
  // 1. Set UI State
  setDownloading(true);
  setDownloadComplete(false);

  try {
    // 2. Fetch the data
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const blob = await response.blob();
    
    // 3. Create a temporary URL for the blob
    const blobUrl = window.URL.createObjectURL(blob);

    // 4. Create a hidden link and trigger click
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `${data.title || 'wallpaper'}.jpg`;
    document.body.appendChild(link);
    link.click();
    
    // 5. Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);

    // 6. Update UI State
    setDownloading(false);
    setDownloadComplete(true);
    
    // Reset the "Success" checkmark/message after 3 seconds
    setTimeout(() => setDownloadComplete(false), 3000);
    
  } catch (err) {
    console.error("Download error:", err);
    setDownloading(false);
    // Optional: set an error state here to show a toast to the user
  }
};
  return (
  <>
  
  <div          
              key={wallpaperId}
              className="relative break-inside-avoid overflow-hidden rounded-2xl group cursor-zoom-in bg-zinc-200 shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              {/* --- TOP BADGE (4K & Device) --- */}
              <div className="absolute top-3 left-3 z-20 flex gap-2">
                <span className="px-2 py-0.5 text-[10px] font-bold bg-black/40 backdrop-blur-md text-white rounded-md uppercase tracking-wider">
                  4k
                </span>
               
              </div>

              {/* Overlay Layer - Becomes visible on hover */}
              <div className="group relative overflow-hidden rounded-xl">
  {/* Image Component */}
  <img
    onClick={() => previewImage(wallpaperId)}
    src={data.imageUrl}
    alt={`Wallpaper showing ${data.title} setup`}
    className="w-full h-auto block object-cover transition-transform duration-700 ease-out group-hover:scale-110 cursor-pointer"
    loading="lazy"
  />

  {/* Overlay - Moved below the img in DOM so it stacks on top visually */}
  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 pointer-events-none">
    <div className="flex items-center justify-between text-white w-full pointer-events-auto">
      {/* <LikeButton data={data} wallpaperId={wallpaperId}/> */}
      
      <button
        className="p-2 rounded-full bg-white/20 backdrop-blur-lg hover:bg-white/40 transition-all active:scale-95"
        aria-label="Download wallpaper"
        onClick={(e) => {
          e.stopPropagation(); // Prevents triggering previewImage on the parent/sibling
          handleDownload(); 
        }}
      > 
      {
        downloading ?  
<div class="flex items-center justify-center gap-0.5 sm:gap-1 md:gap-2 p0.51">
  <div class="w-0.5 h-0.5 sm:w-1 sm:h-1 md:w-2 md:h-2 rounded-full bg-gray-700 animate-bounce [animation-delay:.7s]"></div>
  <div class="w-0.5 h-0.5 sm:w-1 sm:h-1 md:w-2 md:h-2 rounded-full bg-gray-700 animate-bounce [animation-delay:.3s]"></div>
  <div class="w-0.5 h-0.5 sm:w-1 sm:h-1 md:w-2 md:h-2 rounded-full bg-gray-700 animate-bounce [animation-delay:.7s]"></div>
</div> : <ArrowDownToLine size={18}/>  

      }
        
      </button>
    </div>
  </div>
</div>
            </div>
  </>
  )
}

export default WallpaperCardComp