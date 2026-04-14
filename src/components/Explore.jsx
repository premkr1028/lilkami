import React from 'react'
import { Menu, X, Upload, ChevronDown,ChevronUp, Monitor, Smartphone, CircleUser, ImagePlay, UnlockKeyhole } from 'lucide-react'
const Explore = () => {
  return (
   <div className="exploreOption absolute top-10 bg-white flex gap-4 shadow-2xl rounded-2xl px-4 py-3">
<div className="featured border-r border-gray-400 px-2">
  <ul>
   {
    [{
      text: "Desktop Wallpapers",
      icon: Monitor
    },
  {
      text: "Mobile Wallpapers",
      icon: Smartphone
    },
  {
      text: "Anime pfp",
      icon: ImagePlay
    },
  {
      text: "Anime GIFs",
      icon: Monitor
    }].map((data,i)=>{
      return <li className='flex gap-1.5 items-center' key={i}>
       { <data.icon size={16}/>}
       {data.text}
      </li>
    })
   }
  </ul>
</div>
<div className="trend-categories border-r border-gray-400 px-2">
 <ul>
   {
    ["Naruto","One Piece", "Pokemon", "Beyblade"].map((name,i)=>{
return <li key={i} >
{
  name
}

</li>
    })
  }
 </ul>
</div>
<div className="">
{
  ["About Us", "FAQ", "Copyright (DMCA)","Privacy Policy", "Terms & condition"].map((name,i)=>{
return <ul>

   <li key={i}>
  {name}
</li>
</ul>
  })
}
</div>
</div>
  )
}

export default Explore