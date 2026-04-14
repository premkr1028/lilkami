import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, SearchX } from 'lucide-react';
import axios from 'axios';
import WallpaperCardComp from '../components/WallpaperCardComp.jsx'; // Path to your existing component

const SearchWallpaperPreview = () => {
  const { name } = useParams(); // Grabs the :name from the URL
  const navigate = useNavigate();
  
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        // Calling the search API we created earlier
        const response = await axios.get(`https://lilkami-server.vercel.app/api/search/results`, {
          params: { q: name }
        });
        setWallpapers(response.data);
      } catch (err) {
        console.error("Search fetch error:", err);
        setError("Failed to load search results. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (name) fetchResults();
  }, [name]);

  return (
    <div className="min-h-screen bg-white px-4 sm:px-8 md:px-16 py-10">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-10 flex flex-col gap-4">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-500 hover:text-black transition w-fit"
        >
          <ArrowLeft size={20} />
          <span className="font-medium text-sm">Back</span>
        </button>

        <div className="flex items-baseline gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 capitalize">
            {name}
          </h1>
          <span className="text-gray-400 text-lg">
            ({wallpapers.length} results)
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto">
        
        {loading ? (
          /* LOADING STATE */
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 size={40} className="animate-spin text-blue-500" />
            <p className="text-gray-500 font-medium">Hunting down the best pixels...</p>
          </div>

        ) : error ? (
          /* ERROR STATE */
          <div className="text-center py-20 bg-red-50 rounded-3xl border border-red-100">
            <p className="text-red-500 font-medium">{error}</p>
          </div>

        ) : wallpapers.length > 0 ? (
          /* RESULTS FOUND (Masonry Layout) */
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {wallpapers.map((item, index) => (
              <WallpaperCardComp 
                key={item._id} 
                data={item} 
                i={index}
                // These handlers ensure the list updates if you edit/delete from this page
                onDeleteSuccess={(id) => setWallpapers(prev => prev.filter(w => w._id !== id))}
                onUpdateSuccess={(id, newData) => setWallpapers(prev => 
                  prev.map(w => w._id === id ? { ...w, ...newData } : w)
                )}
              />
            ))}
          </div>

        ) : (
          /* NO RESULTS FOUND */
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="bg-gray-100 p-6 rounded-full mb-6 text-gray-400">
              <SearchX size={48} />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No wallpapers found</h2>
            <p className="text-gray-500 max-w-xs">
              We couldn't find anything matching "{name}". Try checking your spelling or using different keywords.
            </p>
            <button 
              onClick={() => navigate('/')}
              className="mt-8 px-6 py-2 bg-black text-white rounded-full hover:bg-zinc-800 transition"
            >
              Go Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchWallpaperPreview;