import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from "@clerk/clerk-react";
import axios from 'axios';

const LikeButton = ({ data, wallpaperId }) => {

  const { userId } = useAuth();

  const [likeList, setLikeList] = useState(data?.likes || []);
  const [isLoading, setIsLoading] = useState(false);
  const [doing, setDoing] = useState(null)
  const isLiked = userId && likeList.includes(userId);

  const handleLike = async () => {
  if (!userId) return alert("Please sign in to like wallpapers!");
  if (isLoading) return;

  // 1. Determine action locally to avoid state latency issues
  const isCurrentlyLiked = likeList.includes(userId);
  const action = isCurrentlyLiked ? "dislike" : "like";
  
  // 2. Save current state for potential rollback
  const previousLikes = [...likeList];

  // 3. Optimistic Update (UI changes immediately)
  setLikeList((prev) =>
    isCurrentlyLiked 
      ? prev.filter((id) => id !== userId) 
      : [...prev, userId]
  );
  
  // Update the 'doing' state for the UI (if needed elsewhere)
  setDoing(action);
  setIsLoading(true);

  try {
    await axios.put(
      "https://lilkami-server.vercel.app/api/wallpaper/like",
      {
        wallpaperId,
        userId,
        // Use the local 'action' variable, NOT the 'doing' state
        doing: action 
      }
    );
  } catch (error) {
    console.error("Like sync failed, rolling back", error);
    // 4. Rollback if backend fails
    setLikeList(previousLikes);
    // Reset 'doing' state back to previous if necessary
    setDoing(isCurrentlyLiked ? "like" : "dislike");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <button
      onClick={handleLike}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-lg transition-all active:scale-95 
        ${isLiked ? 'text-red-500' : 'bg-white/20 text-white hover:bg-white/30'}`}
    >
      <Heart
        size={16}
        className={`${isLiked ? 'fill-current' : 'fill-none'} transition-colors`}
      />
      <span className="text-xs font-semibold">
        {likeList.length}
      </span>
    </button>
  );
};

export default LikeButton;
