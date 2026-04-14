// import React from "react";
// import { ArrowDownToLine, Heart, Tags, Eye } from "lucide-react";
// import imageData from "../../localData/localData.js";

// const New = () => {
//   const MAX_TAGS = 2;
//   const MAX_LENGTH = 10;

//   return (
//     <main className="columns-1 sm:columns-2 md:columns-4 gap-6 px-4 sm:px-8 md:px-16 py-12">
//       {imageData.map((data, i) => {
//         const tags = data.tags || [];
//         const visibleTags = tags.slice(0, MAX_TAGS);
//         const hasMore = tags.length > MAX_TAGS;

//         return (
//           <div
//             key={i}
//             className="mb-6 break-inside-avoid group w-full rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 p-3"
//           >
//             {/* Image */}
//             <div
//               className={`relative rounded-xl overflow-hidden
//                 ${data.type === "mobile" ? "aspect-[9/16]" : "aspect-video"}`}
//             >
//               <img
//                 src={data.imageLink}
//                 alt={data.title}
//                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//               />

//               {/* Badge */}
//               <span
//                 className={`absolute top-2 right-2 px-2 py-1 text-[10px] font-bold rounded-md tracking-wider
//                   ${
//                     data.type === "mobile"
//                       ? "bg-indigo-600 text-white"
//                       : "bg-emerald-600 text-white"
//                   }`}
//               >
//                 {data.type === "mobile" ? "MOBILE" : "DESKTOP"}
//               </span>
//             </div>

//             {/* Content */}
//             <div className="px-1">
//               {/* Title + Views */}
//               <div className="flex flex-col gap-2 mt-4">
//                 <div className="flex justify-between items-start">
//                   <h1 className="text-lg font-bold text-slate-800 tracking-tight">
//                     {data.title}
//                   </h1>

//                   <div className="flex items-center gap-1.5 text-slate-400">
//                     <Eye size={16} />
//                     <span className="text-sm font-medium">
//                       {data.views || 0}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Tags */}
//                 <div className="flex flex-wrap gap-1.5 items-center">
//                   <Tags size={14} className="text-slate-400 mr-1" />

//                   {visibleTags.map((tag, index) => (
//                     <span
//                       key={index}
//                       className="bg-slate-100 text-slate-600 rounded-lg px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider"
//                     >
//                       {tag.length > MAX_LENGTH
//                         ? tag.slice(0, MAX_LENGTH) + "…"
//                         : tag}
//                     </span>
//                   ))}

//                   {hasMore && (
//                     <span className="bg-slate-100 text-slate-600 rounded-lg px-2 py-1 text-[11px] font-bold">
//                       ···
//                     </span>
//                   )}
//                 </div>
//               </div>

//               {/* Actions */}
//               <div className="flex gap-3 mt-5">
//                 <button className="flex-1 flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-xl py-2.5 transition-all active:scale-95 shadow-lg shadow-rose-200">
//                   <ArrowDownToLine size={18} strokeWidth={2.5} />
//                   <span className="text-sm">Download</span>
//                 </button>

//                 <button className="flex items-center justify-center aspect-square px-3 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-500 border border-slate-200 hover:border-rose-100 rounded-xl transition-all active:scale-90">
//                   <Heart size={20} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </main>
//   );
// };

// export default New;


// import React from "react";
// import { ArrowDownToLine, Heart, Tags, Eye } from "lucide-react";
// import imageData from "../../localData/localData.js";

// const New = () => {
//   const MAX_TAGS = 2;
//   const MAX_LENGTH = 10;

//   return (
//     // columns-1 for mobile, 2 for tablet, and exactly 4 for desktop (lg)
//     // gap-4 reduces the space between cards to keep things tight
//     <main className="columns-1 sm:columns-2 lg:columns-4 gap-4 px-4 md:px-10 py-8">
//       {imageData.map((data, i) => {
//         const tags = data.tags || [];
//         const visibleTags = tags.slice(0, MAX_TAGS);
//         const hasMore = tags.length > MAX_TAGS;

//         return (
//           <div
//             key={i}
//             // break-inside-avoid is crucial for Masonry to prevent cards from splitting
//             className="mb-4 break-inside-avoid group w-full rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 p-2"
//           >
//             {/* Image Container */}
//             <div className="relative rounded-lg overflow-hidden">
//               <img
//                 src={data.imageLink}
//                 alt={data.title}
//                 // Removed fixed aspect ratio classes to allow natural Masonry heights
//                 className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
//               />

//               {/* Compact Badge */}
//               <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 text-[8px] font-black rounded bg-white/90 text-slate-800 backdrop-blur-sm">
//                 {data.type === "mobile" ? "MOBILE" : "DESKTOP"}
//               </span>
//             </div>

//             {/* Content Area - Scaled down */}
//             <div className="px-1 mt-3">
//               <div className="flex justify-between items-start mb-2">
//                 <h1 className="text-sm font-bold text-slate-800 leading-tight line-clamp-1">
//                   {data.title}
//                 </h1>
//                 <div className="flex items-center gap-1 text-slate-400 shrink-0">
//                   <Eye size={12} />
//                   <span className="text-[10px] font-bold">{data.views || 0}</span>
//                 </div>
//               </div>

//               {/* Tags - Mini style */}
//               <div className="flex flex-wrap gap-1 items-center mb-4">
//                 {visibleTags.map((tag, index) => (
//                   <span
//                     key={index}
//                     className="bg-slate-50 text-slate-500 border border-slate-100 rounded px-1.5 py-0.5 text-[9px] font-medium"
//                   >
//                     #{tag.length > MAX_LENGTH ? tag.slice(0, MAX_LENGTH) + ".." : tag}
//                   </span>
//                 ))}
//               </div>

//               {/* Action Buttons - Slimmed down */}
//               <div className="flex gap-1.5">
//                 <button className="flex-1 flex items-center justify-center gap-1 bg-rose-500 hover:bg-rose-600 text-white rounded-lg py-1.5 transition-colors">
//                   <ArrowDownToLine size={14} />
//                   <span className="text-[11px] font-bold">Get</span>
//                 </button>

//                 <button className="flex items-center justify-center w-8 h-8 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-lg transition-colors border border-slate-100">
//                   <Heart size={14} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </main>
//   );
// };

// export default New;

import React, { useEffect, useState } from "react";
import { ArrowDownToLine, Heart, Eye } from "lucide-react";
// import imageData from "../../localData/localData.js";
import axios from "axios";
import WallpaperCardComp from "../../components/WallpaperCardComp.jsx";


const RecentWallpapers = () => {
  const [imageData, setImageData] = useState([])
  const MAX_TAGS = 2;
  const MAX_LENGTH = 10;
useEffect(() => {
  const fetchWall = async () => {
    try {
      const res = await axios.get("https://lilkami-server.vercel.app/getWall");
     
      setImageData(res.data.wallData)
      
    } catch (err) {
      console.error(err);
      alert("dataNotGet failed");
    }
  };

  fetchWall();
}, []);

 if (imageData == []) return <>
 no data available
 </>;
  return (
 <main className="flex flex-col items-center gap-10 px-4 sm:px-8 md:px-16 py-14">
      <section
    
      className="columns-2 gap-4 space-y-4 sm:columns-4 md:columns-5 lg:columns-6 xl:columns-7"
    >
    {imageData.map((data, i) => {
      const tags = data.tags || [];
       const visibleTags = tags.slice(0, MAX_TAGS);

        return (
      <div key={i}>
 <WallpaperCardComp data={data} i={i} tags={tags} visibleTags={visibleTags} MAX_LENGTH={MAX_LENGTH}/>
      </div>
        );
      })
      }
    </section>
   </main>
  );
};

export default RecentWallpapers;