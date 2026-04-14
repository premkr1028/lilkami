import { Flag, Upload, CheckCircle } from "lucide-react";
import React, { useState } from "react";
import ShowImageFile from "./ShowImageFile";
import ImageUploading from "./ImageUploading";

const UploadImage = () => {
    const [selectedImage, setSelectedImage] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const handleImageChange = (e) =>{
const file = e.target.files[0]
setImageFile(file)
  }
  return (
    <main className="upArea w-full min-[90vh] flex items-center justify-center px-4 sm:px-6 md:px-12 py-8 ">
     {imageFile ? selectedImage ? <ImageUploading imageFile={imageFile} /> :<ShowImageFile imageFile={imageFile} setImageFile={setImageFile} setSelectedImage={setSelectedImage}/> :  <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6 sm:p-8 md:p-10">

        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
          Pick your image
        </h1>

        {/* Upload Box */}
        <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-xl px-6 py-10 sm:py-14 text-center cursor-pointer hover:border-black transition">
          <Upload className="w-10 h-10 mb-3 text-gray-500" />
          <p className="text-gray-600 text-sm sm:text-base">
            Drag & drop or{" "}
            <span className="text-black font-semibold">Browse files</span>
          </p>
          <input type="file" accept="image/*" className="hidden" onChange={handleImageChange}/>
        </label>

        {/* Requirements */}
        <div className="mt-8 space-y-6 text-sm sm:text-base text-gray-700">

          {/* Top Two Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Upload className="w-5 h-5 mt-1 flex-shrink-0" />
              <p>Upload file requirements</p>
            </div>

            <div className="flex items-start gap-3">
              <Flag className="w-5 h-5 mt-1 flex-shrink-0" />
              <p>Excludes nudity, violence, or hate</p>
            </div>
          </div>

          {/* Bottom Item */}
          <div className="flex items-start gap-3 justify-center text-center sm:text-left">
            <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0 text-green-600" />
            <p>
              Use original media you own, and credit the creator if it’s someone else
            </p>
          </div>

        </div>
      </div> }
    </main>
  );
};

export default UploadImage;
