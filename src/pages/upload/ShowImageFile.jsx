import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ChevronLeft, X, CheckCircle2 } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

const ShowImageFile = ({ imageFile, setImageFile }) => {
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  
  // State for the Pop-up Modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { user } = useUser();
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (!imageFile) return;
    const objectUrl = URL.createObjectURL(imageFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const addTag = (value) => {
    const trimmed = value.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    setTags([...tags, trimmed]);
    setTagInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(tagInput);
    }
    if (e.key === "Backspace" && !tagInput && tags.length) {
      setTags(tags.slice(0, -1));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!imageFile) return alert("Please select an image");

    setLoading(true);
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", JSON.stringify(tags));
    formData.append("postedBy", user?.id);
    formData.append("postedByName", user?.fullName);

    try {
      await axios.post("https://lilkami-server.vercel.app/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // TRIGGER SUCCESS POP-UP
      setShowSuccessModal(true);
      
      // Reset form fields
      setTags([]);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    setImageFile(null); // Return to upload screen after user acknowledges
  };

  return (
    <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6 sm:p-8 md:p-10 relative">
      
      {/* SUCCESS POP-UP MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center transform transition-all scale-100 animate-in zoom-in-95 duration-300">
            <div className="flex justify-center mb-4">
              <CheckCircle2 size={64} className="text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Upload Successful!</h2>
            <p className="text-gray-600 mb-6">
              Your image has been shared with the community.
            </p>
            <button
              onClick={closeSuccessModal}
              className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition"
            >
              Awesome
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setImageFile(null)}
        disabled={loading}
        className="text-base rounded-xl py-2 text-gray-600 hover:scale-105 transition font-bold flex gap-1 items-center disabled:opacity-50"
      >
        <ChevronLeft size={16} /> Back
      </button>

      <h1 className="text-center text-3xl font-bold mb-6">Upload Image</h1>

      <div className="w-full h-52 flex items-center justify-center overflow-hidden mb-6 mt-8 border-2 border-dashed border-gray-300 rounded-lg p-2 bg-gray-50">
        {preview && <img src={preview} alt="Preview" className="max-h-full object-contain rounded shadow-sm" />}
      </div>

      <form onSubmit={handleUpload} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />

        <textarea
          placeholder="Description"
          className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black outline-none min-h-[80px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
        />

        {/* TAG INPUT */}
        <div
          className={`flex flex-wrap items-center gap-2 border rounded-lg px-2 py-2 transition ${
            loading ? "bg-gray-100" : "focus-within:ring-2 focus-within:ring-black"
          }`}
          onClick={() => !loading && inputRef.current.focus()}
        >
          {tags.map((tag, i) => (
            <span key={i} className="flex items-center gap-1 bg-black text-white px-2 py-1 rounded-full text-xs">
              {tag}
              <X size={14} className="cursor-pointer" onClick={() => setTags(tags.filter((_, idx) => idx !== i))} />
            </span>
          ))}
          <input
            ref={inputRef}
            type="text"
            className="flex-1 min-w-[120px] outline-none px-1 text-sm bg-transparent"
            placeholder={tags.length === 0 ? "Add tags..." : ""}
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
        </div>

        {/* LOADING BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white py-3 rounded-lg hover:opacity-90 transition mt-4 flex items-center justify-center gap-3 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              {/* Circular SVG Spinner */}
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            "Upload Image"
          )}
        </button>
      </form>
    </div>
  );
};

export default ShowImageFile;