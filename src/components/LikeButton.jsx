import React, { useState } from "react";
import { Heart } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

const LikeButton = ({ initialLikes = [], wallpaperId }) => {
  const { userId, getToken } = useAuth();

  const [likes, setLikes] = useState(initialLikes);
  const [isSyncing, setIsSyncing] = useState(false);

  const isLiked = !!userId && likes.includes(userId);

  const handleLike = async () => {
    if (!userId) {
      alert("Please sign in!");
      return;
    }

    if (isSyncing) return;

    const action = isLiked ? "dislike" : "like";
    const previousState = [...likes];

    // ✅ Optimistic UI update
    setLikes(prev =>
      isLiked
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );

    setIsSyncing(true);

    try {
      const token = await getToken();

      const res = await axios.put(
        "http://localhost:3000/api/wallpaper/like",
        {
          wallpaperId,
          clerkId: userId,
          doing: action
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // ✅ IMPORTANT: sync with backend response
      if (res.data?.likes) {
        setLikes(res.data.likes);
      }

    } catch (error) {
      console.error("❌ Sync failed:", error);

      // 🔁 rollback UI if failed
      setLikes(previousState);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={isSyncing}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200
        ${isLiked 
          ? "bg-red-50 text-red-500 hover:bg-red-100" 
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
    >
      <Heart
        size={20}
        className={`transition-all ${isLiked ? "fill-current scale-110" : ""}`}
      />
      <span className="font-medium">{likes.length}</span>
    </button>
  );
};

export default LikeButton;