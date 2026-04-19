import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "@clerk/clerk-react"; // Added Clerk
import { MoveLeft, Download, Heart, Eye, User, CalendarDays, Tag, Loader2, CheckCircle2 } from 'lucide-react';

const WallpaperPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userId } = useAuth(); // Get Clerk UserID

  const [wallpaper, setWallpaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [error, setError] = useState(null);

  // Like System States
  const [isSyncingLike, setIsSyncingLike] = useState(false);

  useEffect(() => {
    const fetchWallpaper = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://lilkami-server.vercel.app/api/preview/${id}`);
        setWallpaper(res.data);
        setError(null);
      } catch (err) {
        setError("Wallpaper not found.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchWallpaper();
  }, [id]);

  // --- INTEGRATED LIKE LOGIC ---
  const handleLike = async () => {
    if (!userId) return alert("Please sign in to like wallpapers!");
    if (isSyncingLike) return;

    // 1. Local data setup
    const currentLikes = wallpaper?.likes || [];
    const isCurrentlyLiked = currentLikes.includes(userId);
    const action = isCurrentlyLiked ? "dislike" : "like";
    
    // 2. Backup current state for rollback
    const previousWallpaperState = { ...wallpaper };

    // 3. Optimistic Update
    const newLikes = isCurrentlyLiked 
      ? currentLikes.filter((id) => id !== userId) 
      : [...currentLikes, userId];

    setWallpaper({ ...wallpaper, likes: newLikes });
    setIsSyncingLike(true);

    try {
      await axios.put(
        "https://lilkami-server.vercel.app/api/wallpaper/like",
        {
          wallpaperId: id,
          userId,
          doing: action 
        }
      );
    } catch (error) {
      console.error("Like sync failed, rolling back", error);
      // Rollback on error
      setWallpaper(previousWallpaperState);
    } finally {
      setIsSyncingLike(false);
    }
  };

  // --- DOWNLOAD LOGIC ---
  const handleDownload = async () => {
    setDownloading(true);
    setDownloadComplete(false);
    
    setTimeout(async () => {
      try {
        const response = await fetch(wallpaper.imageUrl);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `${wallpaper.title || 'wallpaper'}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        window.URL.revokeObjectURL(blobUrl);

        setDownloading(false);
        setDownloadComplete(true);
        setTimeout(() => setDownloadComplete(false), 3000);
      } catch (err) {
        console.error("Download error:", err);
        setDownloading(false);
      }
    }, 3000);
  };

  if (loading) return (
    <div className="w-full h-screen bg-white flex items-center justify-center">
      <Loader2 className="w-10 h-10 text-pink-500 animate-spin" />
    </div>
  );

  const isLiked = userId && wallpaper?.likes?.includes(userId);

  return (
    <main className="w-full min-h-screen bg-slate-50 text-slate-900 px-4 py-6 md:py-12 flex flex-col items-center selection:bg-pink-100">
      
      <button 
        onClick={() => navigate(-1)} 
        className="fixed z-50 left-4 top-6 md:left-10 md:top-10 p-3 bg-white shadow-xl border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all active:scale-90"
      >
        <MoveLeft size={22} className="text-slate-400" />
      </button>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12 md:mt-0 relative">
        
        {/* IMAGE AREA */}
        <div className="lg:col-span-8 w-full">
          <div className="bg-white p-2 md:p-3 rounded-[2.5rem] border border-slate-200 shadow-sm sticky top-10">
            <img 
              src={wallpaper?.imageUrl} 
              alt={wallpaper?.title} 
              className="w-full h-auto rounded-[2rem] object-contain max-h-[80vh] bg-slate-50"
            />
          </div>
        </div>

        {/* DETAILS AREA */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 blur-[60px] rounded-full"></div>
            
            <h1 className="text-4xl font-black text-slate-900 capitalize mb-2 relative z-10">
              {wallpaper?.title}
            </h1>
            <p className="text-slate-500 text-lg mb-8 font-light relative z-10">
              {wallpaper?.description}
            </p>

            {/* <div className="flex items-center gap-3 mb-8 relative z-10">
              INTERACTIVE LIKE BUTTON
              <button 
                onClick={handleLike}
                disabled={isSyncingLike}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border transition-all active:scale-95 ${
                  isLiked 
                  ? 'bg-pink-50 border-pink-200 text-pink-600' 
                  : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100'
                }`}
              >
                <Heart 
                  size={18} 
                  className={`${isLiked ? 'fill-pink-500 text-pink-500' : ''} transition-colors`} 
                /> 
                <span className="font-bold font-mono">
                  {wallpaper?.likes?.length || 0}
                </span>
              </button>
            </div> */}

            {/* DOWNLOAD SECTION */}
            <div className="mb-10 relative z-10">
              {!downloading && !downloadComplete && (
                <button 
                  onClick={handleDownload}
                  className="w-full py-5 bg-slate-900 hover:bg-pink-600 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95"
                >
                  <Download size={22} /> DOWNLOAD NOW
                </button>
              )}

              {downloading && (
                <div className="w-full py-5 bg-pink-50 border-2 border-dashed border-pink-200 text-pink-600 rounded-2xl font-bold text-center flex flex-col items-center gap-2 animate-pulse">
                  <Loader2 className="animate-spin text-pink-500" size={24} />
                  <span className="text-sm">Wait, your download is loading...</span>
                </div>
              )}

              {downloadComplete && (
                <div className="w-full py-5 bg-green-50 border border-green-100 text-green-600 rounded-2xl font-bold text-center flex items-center justify-center gap-2">
                  <CheckCircle2 size={20} />
                  <span>Success! Check your downloads.</span>
                </div>
              )}
            </div>

            {/* INFO LIST */}
            <div className="space-y-6 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
                  <User size={18} className="text-pink-500" />
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 font-black tracking-widest uppercase">Uploader</p>
                  <p className="font-bold text-sm text-slate-700">{wallpaper?.postedByName}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
                  <CalendarDays size={18} className="text-slate-400" />
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 font-black tracking-widest uppercase">Published</p>
                  <p className="font-bold text-sm text-slate-700">
                    {wallpaper?.createdAt ? new Date(wallpaper.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* TAGS */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2 mb-4">
                <Tag size={16} className="text-pink-500" />
                <p className="text-[10px] text-slate-400 font-black tracking-widest uppercase">Tags</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {wallpaper?.tags && wallpaper.tags.length > 0 && wallpaper.tags[0] !== "[]" ? (
                  wallpaper.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[11px] font-bold">
                      #{tag.replace(/[\[\]'"]/g, '')}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-300 text-xs italic">No tags</span>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
};

export default WallpaperPreview;