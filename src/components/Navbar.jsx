import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Upload, ChevronDown, ChevronUp, Monitor, Smartphone, ImagePlay } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const { isSignedIn, user } = useUser();

  const toggleExplore = () => setExploreOpen((prev) => !prev);

  return (
    <nav className="w-full flex items-center justify-between px-4 sm:px-8 md:px-16 py-4 md:py-6 relative bg-white z-50">
      
      {/* Logo */}
      <Link to="/" className="text-2xl sm:text-3xl font-bold w-[33.33%]">
        Lilkami
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex justify-center gap-8 text-sm lg:text-base w-[33.33%] items-center">
        <Link to="/recent-wallpapers" className="hover:text-rose-500 transition">Recent</Link>
        <Link to="/blog" className="hover:text-rose-500 transition">Blog</Link>
        
        
      </div>

      {/* Desktop Auth & Actions */}
      <div className="hidden md:flex gap-5 items-center justify-end w-[33.33%]">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="text-sm font-medium hover:text-rose-500">Log In</button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <Link to="/profile">
            <img src={user?.imageUrl} alt="Profile" className="w-9 h-9 rounded-full border border-gray-200" />
          </Link>
        </SignedIn>

        {
          isSignedIn ? <Link
          to={"/uploadImage"}
          className="bg-black text-white rounded-full px-5 py-2 hover:bg-rose-500 transition flex gap-2 items-center text-sm"
        >
          <Upload size={16} /> Upload
        </Link> :  <SignInButton mode='modal'
         
        >
         <div  className="bg-black text-white rounded-full px-5 py-2 hover:bg-rose-500 transition flex gap-2 items-center text-sm">
           <Upload size={16} /> Upload
         </div>
        </SignInButton> 
        }
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setOpen(!open)}>
        {open ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-white shadow-xl flex flex-col items-center gap-6 py-8 md:hidden z-50 border-t">
          <Link to="/new" onClick={() => setOpen(false)}>Recent</Link>
          <Link to="/categories" onClick={() => setOpen(false)}>Blog</Link>
          <SignedOut>
            <SignInButton mode="modal" />
          </SignedOut>
          <SignedIn>
            <Link to="/profile" onClick={() => setOpen(false)}>My Profile</Link>
          </SignedIn>
          <Link to="/uploadImage" className="bg-black text-white px-6 py-2 rounded-full">Upload</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;