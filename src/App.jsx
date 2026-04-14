import React from 'react'
import Home from './pages/home/Home.jsx'
import New from './pages/new/RecentWallpapers.jsx';
import Collection from './pages/collection/Collection.jsx';
import SignUp from './pages/register/SignUp.jsx';
import MainLayout from "./layouts/MainLayout"
import {  Routes, Route } from "react-router";
import Categories from './pages/categories/Categories.jsx';
import { Upload } from 'lucide-react';
import UploadImage from './pages/upload/UploadImage.jsx';
import Profile from './pages/profile/Profile.jsx';
import DMCA from './pages/DMCA.jsx';
import Contact from './pages/contact/Contact.jsx';
import PrivacyPolicy from './pages/privacyPolicy/PrivacyPolicy.jsx';
import TermsOfService from './pages/termsOfServices/TermOfServices.jsx';
import ComingSoonPage from './components/ComingSoonPage.jsx';
import WallpaperPreview from './components/WallpaperPreview.jsx';
import SearchWallpaperPreview from './components/SearchWallpaperPreview.jsx';
import RecentWallpapers from './pages/new/RecentWallpapers.jsx';
import Blog from './components/Blog.jsx';
import Discord from './components/Discord.jsx';
import ArtSubmit from './components/ArtSubmit.jsx';
import Contributers from './components/Contributers.jsx';
import WallpaperApi from './components/WallpaperApi.jsx';
const App = () => {
  return (
    <>
 <Routes>
   <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/recent-wallpapers" element={<RecentWallpapers />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/uploadImage" element={<UploadImage />} />
      <Route path="/profile" element={<Profile />} /> 
      <Route path="/dmca" element={<DMCA />} />
      <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
                 <Route path="/coming-soon" element={<ComingSoonPage />} />
        <Route path="/wallpaper/:id" element={<WallpaperPreview />} />
        <Route path="/search/:name" element={<SearchWallpaperPreview />} />
         <Route path="/blog" element={<Blog />} />
       <Route path="/discord" element={<Discord />} />
       <Route path="/art-submit" element={<ArtSubmit />} />
       <Route path="/contributers" element={<Contributers />} />
       <Route path="/wallpaper-api" element={<WallpaperApi />} />
      </Route>
    </Routes>
    </>
  )
}

export default App