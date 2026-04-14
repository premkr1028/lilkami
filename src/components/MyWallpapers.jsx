// import React, { useEffect, useState } from "react";
// import { SquarePen, EllipsisVertical, Key } from "lucide-react";
// import axios from "axios";
// import { useUser } from "@clerk/clerk-react";
// 
// const images = [
//   {
//     link: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1000&auto=format&fit=crop",
//     type: "desktop",
//   },
//   {
//     link: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?q=80&w=1000&auto=format&fit=crop",
//     type: "mobile",
//   },
//   {
//     link: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=1000&auto=format&fit=crop",
//     type: "desktop",
//   },
//   {
//     link: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1000&auto=format&fit=crop",
//     type: "mobile",
//   },
//   {
//     link: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000&auto=format&fit=crop",
//     type: "desktop",
//   },
//   {
//     link: "https://images.unsplash.com/photo-1528319725582-ddc096101511?q=80&w=1000&auto=format&fit=crop",
//     type: "mobile",
//   },
// ];

// const MyWallpapers =  () => {
//   const {user} = useUser()
//   const [openMenuIndex, setOpenMenuIndex] = useState(null);
//   const [myWallpapers, setMyWallpapers] = useState([])
//   console.log(user.id)
// useEffect(() => {
//   // 1. Mark the function as async
//   const fetchMyWallpapers = async () => {
//     try {
//       console.log("in")
//       const res = await axios.get("http://localhost:3000/api/get-my-wallpaper", {
//         params: {
//           id: user?.id // Optional chaining protects against null users
//         }
//       });

//       // 2. Access the data property
//       console.log(res.data); 
//       setMyWallpapers(res?.data.wallpapers)
    
//     } catch (error) {
//       console.error("Error fetching wallpapers:", error);
//     }
//   };

//   // Only fetch if user.id exists
//   if (user?.id) {
//     fetchMyWallpapers();
//   }
// }, [user?.id]); // 3. Re-run if user.id changes

//   return (
//     <section
//       onClick={() => setOpenMenuIndex(null)}
//       className="columns-2 gap-4 space-y-4 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6"
//     >
//       {myWallpapers.map((img, i) => {
//         const src = typeof img === "string" ? img : img.link;

//         return (
//       <div key={i}>
//       <WallpaperCard openMenuIndex={openMenuIndex} src={src} img={img} i={i}/>
//       </div>
//         );
//       })}
//     </section>
//   );
// };

// export default MyWallpapers;


import React, { useState } from "react";
import { ArrowDownToLine, Heart, Monitor, Smartphone } from "lucide-react";
import WallpaperCardComp from "./WallpaperCardComp.jsx";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import WallpaperCard from "./WallpaperCard.jsx";
import axios from "axios";

const myWallpapers = () => {
  
 const [myWallpapers, setMyWallpapers] = useState([])
 
  const {user} = useUser()
  useEffect(() => {
  const fetchLikedWall = async () => {
    try {
        const res = await axios.get("https://lilkami-server.vercel.app/api/get-my-wallpaper", {
        params: {
          id: user?.id // Optional chaining protects against null users
        }
      });

      // 2. Access the data property
      console.log(res)
      console.log(res?.data.wallpaper); 
      setMyWallpapers(res?.data.wallpaper)
      console.log(myWallpapers)
    } catch (err) {
      console.error(err);
      alert("dataNotGet failed");
    }
  };

  fetchLikedWall();
}, []);

// Function to remove the deleted image from the UI immediately
  const handleRemoveFromUI = (deletedId) => {
    setMyWallpapers((prev) => prev.filter((item) => item._id !== deletedId));
  };
  return (
   
     
      <>
     
      {myWallpapers.length > 0 ? (
        <div className="columns-2 gap-4 space-y-4 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6">
          {myWallpapers.map((data, i) => (
            <div key={data.id || i} className="break-inside-avoid">
              <WallpaperCard
                i = {i}
                data={data} 
                onDeleteSuccess={handleRemoveFromUI}
                type={data.type || "desktop"} 
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-20">
          <p>create some wallpapers</p>
        </div>
      )}
   </>
  
  );
};

export default myWallpapers;