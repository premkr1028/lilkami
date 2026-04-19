import { useUser, useClerk } from "@clerk/clerk-react";
import { useState } from "react";
import MyWallpapers from "../../components/MyWallpapers.jsx";
import LikedWallpapers from "../../components/LikedWallpapers.jsx";
import { SignOutButton } from "@clerk/clerk-react";
const Profile = () => {
  const { user, isLoaded } = useUser();
  const { openUserProfile } = useClerk();

  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("my");

  const handleImageUpload = async (e) => {
    if (!isLoaded || !user) return;

    const input = e.target;
    const file = input.files[0];
    if (!file) return;

    // Validate type
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image");
      input.value = "";
      return;
    }

    // Limit size to 2MB
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be under 2MB");
      input.value = "";
      return;
    }

    try {
      setUploading(true);
      await user.setProfileImage({ file });
    } catch (err) {
      console.error(err);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
      input.value = "";
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-6 h-6 rounded-full border-2 border-black border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center gap-10 px-4 sm:px-8 md:px-16 py-14">

      {/* Profile Header */}
      <div className="flex flex-col items-center gap-3">

        {/* Avatar */}
        <label
          className="relative group cursor-pointer"
          aria-label="Change profile picture"
        >
          <img
            src={user.imageUrl}
            alt="avatar"
            className={`w-24 h-24 rounded-full object-cover border transition
              ${uploading ? "opacity-60" : "group-hover:brightness-75"}
            `}
          />

          {/* Overlay */}
          <div className="absolute inset-0 flex items-center justify-center rounded-full
            bg-black/40 opacity-0 group-hover:opacity-100 transition">
            {uploading ? (
              <div className="w-6 h-6 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : (
              <span className="text-white text-xs font-medium">Change</span>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>

        {/* Name */}
        <h2 className="text-lg font-semibold">{user.fullName}</h2>

        {/* Status */}
        <p className="text-sm text-gray-500">
          {uploading ? "Uploading photo…" : "Click photo to update"}
        </p>

        {/* Clerk Profile */}
        <button
          onClick={() => openUserProfile()}
          className="mt-4 rounded-full border px-5 py-2 text-sm font-medium
                     hover:bg-black hover:text-white transition"
        >
          More profile settings
        </button>
      </div>
<SignOutButton>
      <button className="your-styling-here">
        Log Out
      </button>
    </SignOutButton>
      {/* Tabs */}
      <div className="w-full border-t border-dashed pt-6">
        <ul className="flex gap-6 text-sm font-medium">
          <li
            onClick={() => setActiveTab("my")}
            className={`cursor-pointer pb-2 border-b-2 transition
              ${activeTab === "my"
                ? "border-black"
                : "border-transparent text-gray-500"}
            `}
          >
            My Wallpapers
          </li>
{/* 
          <li
            onClick={() => setActiveTab("liked")}
            className={`cursor-pointer pb-2 border-b-2 transition
              ${activeTab === "liked"
                ? "border-black"
                : "border-transparent text-gray-500"}
            `}
          >
            Liked Wallpapers
          </li> */}
        </ul>

        {/* Content */}
        <div className="mt-6">
          {activeTab === "my" && (
            <div className="text-gray-500 text-sm">
              <MyWallpapers />
            </div>
          )}

          {activeTab === "liked" && (
            <div className="text-gray-500 text-sm">
             <LikedWallpapers />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Profile;
