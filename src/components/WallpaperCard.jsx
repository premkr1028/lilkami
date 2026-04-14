import React, { useState } from 'react';
import { SquarePen, EllipsisVertical, X, Copy, Check, Plus, CheckCircle2, Trash2 } from "lucide-react";
import axios from 'axios';

const WallpaperCard = ({ data, i, onDeleteSuccess, onUpdateSuccess }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showUpdateToast, setShowUpdateToast] = useState(false);
  const [showDeleteToast, setShowDeleteToast] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const [editData, setEditData] = useState({
    title: data.title || "",
    description: data.description || "",
    tags: Array.isArray(data.tags) ? data.tags.filter(t => t !== "[]") : []
  });

  // --- TAG MANAGEMENT ---
  const addTag = () => {
    const trimmed = tagInput.trim().toLowerCase();
    if (trimmed && !editData.tags.includes(trimmed)) {
      setEditData({ ...editData, tags: [...editData.tags, trimmed] });
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setEditData({
      ...editData,
      tags: editData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  // --- SHARE LOGIC ---
  const handleShare = async (e) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/wallpaper/${data._id}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setIsMenuOpen(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // --- DELETE LOGIC ---
  const deleteImage = async (id) => {
    if (!window.confirm("Delete this wallpaper permanently?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/deletemyimage/${id}`);
      
      // Trigger Delete Toast
      setShowDeleteToast(true);
      
      // Delay removal from UI so user can see the notification
      setTimeout(() => {
        if (onDeleteSuccess) onDeleteSuccess(id);
      }, 1500);
      
    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  };

  // --- UPDATE LOGIC ---
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://lilkami-server.vercel.app/api/edit/${data._id}`, editData);
      
      setIsEditOpen(false);
      if (onUpdateSuccess) onUpdateSuccess(data._id, response.data);
      
      // Trigger Success Toast
      setShowUpdateToast(true);
      setTimeout(() => setShowUpdateToast(false), 3000);
    } catch (err) {
      alert("Update failed");
    }
  };
 
  return (
    <div className="relative break-inside-avoid overflow-hidden rounded-2xl group bg-zinc-200 mb-4 text-left">
      
      {/* 3-Dot Context Menu */}
      <div className="absolute top-3 right-3 z-30">
        <button
          onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }}
          className="p-1.5 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition"
        >
          <EllipsisVertical size={18} color="white" />
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-40 rounded-xl bg-zinc-900 text-white shadow-xl overflow-hidden border border-zinc-700 animate-in fade-in slide-in-from-top-2 duration-200">
            <button
              className={`w-full px-4 py-2.5 text-sm flex items-center justify-between transition-colors ${
                copied ? "text-green-400" : "hover:bg-zinc-800"
              }`}
              onClick={handleShare}
            >
              <span className="flex items-center gap-2">
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copied!" : "Copy Link"}
              </span>
            </button>
            
            <button
              className="w-full px-4 py-2.5 text-sm hover:bg-red-600/20 text-red-500 text-left border-t border-zinc-800 transition-colors"
              onClick={() => { deleteImage(data._id); setIsMenuOpen(false); }}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* SUCCESS/DELETE TOAST NOTIFICATIONS */}
      {showUpdateToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-zinc-900 border border-zinc-800 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3">
            <CheckCircle2 size={18} className="text-green-500" />
            <span className="text-sm font-medium">Changes saved successfully!</span>
          </div>
        </div>
      )}

      {showDeleteToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-zinc-900 border border-zinc-800 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3">
            <Trash2 size={18} className="text-red-500" />
            <span className="text-sm font-medium">Wallpaper deleted.</span>
          </div>
        </div>
      )}

      {/* Hover Image Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <div className="w-full flex justify-between items-center">
            <div className="text-white">
                <h3 className="font-medium text-sm truncate w-32">{data.title}</h3>
            </div>
            <button 
                onClick={() => setIsEditOpen(true)}
                className="flex items-center gap-2 p-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20 transition"
            >
                <span className="text-sm font-medium">Edit</span>
                <SquarePen size={16} />
            </button>
        </div>
      </div>

      <img
        src={data.imageUrl}
        alt={data.title}
        className="w-full h-auto block object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />

      {/* --- EDIT MODAL --- */}
      {isEditOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 w-full max-w-md rounded-2xl p-6 border border-zinc-800 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Edit Details</h2>
              <button 
                onClick={() => setIsEditOpen(false)} 
                className="text-zinc-400 hover:text-white transition"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4 text-left">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Title</label>
                <input 
                  type="text" 
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  value={editData.title}
                  onChange={(e) => setEditData({...editData, title: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Description</label>
                <textarea 
                  rows="3"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition"
                  value={editData.description}
                  onChange={(e) => setEditData({...editData, description: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Tags</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {editData.tags.map((tag, index) => (
                    <span key={index} className="flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-full text-xs font-medium">
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} className="hover:text-white"><X size={12} /></button>
                    </span>
                  ))}
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); }}}
                    placeholder="Add tag and press Enter"
                  />
                  <button 
                    type="button" 
                    onClick={addTag} 
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-zinc-700 hover:bg-zinc-600 text-white rounded-md transition"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsEditOpen(false)} 
                  className="flex-1 py-2.5 rounded-xl bg-zinc-800 text-white font-medium hover:bg-zinc-700 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-2.5 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WallpaperCard;