import React from "react";
import { Twitter, Instagram, Layers, Heart, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white text-zinc-600 pt-20 pb-10 px-6 border-t border-zinc-100">
      <div className="mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="md:col-span-4 space-y-6">
            <Link to="/" className="inline-block group">
              <h2 className="text-2xl font-black text-zinc-900 tracking-tighter flex items-center gap-2.5">
                <div className="p-2 bg-rose-500 rounded-xl shadow-lg shadow-rose-200 group-hover:rotate-12 transition-transform duration-300">
                  <Layers size={20} className="text-white" />
                </div>
                Lilkami
              </h2>
            </Link>
            <p className="text-sm leading-relaxed text-zinc-500 max-w-sm">
              A curated sanctuary for high-quality anime aesthetics. Discover, download, and share the finest digital art for your personal spaces.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Twitter, label: "Twitter" },
                { Icon: Instagram, label: "Instagram" }
              ].map(({ Icon, label }, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="p-3 rounded-xl bg-zinc-50 text-zinc-400 hover:bg-rose-50 hover:text-rose-500 transition-all duration-300 border border-transparent hover:border-rose-100"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Grid */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Community Section */}
            <div>
              <h3 className="text-zinc-900 font-bold mb-6 uppercase text-[11px] tracking-[0.2em]">
                Community
              </h3>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link to="/contributers" className="text-zinc-500 hover:text-rose-500 transition-colors">Top Contributors</Link></li>
                <li><Link to="/art-submit" className="text-zinc-500 hover:text-rose-500 transition-colors">Art Submission</Link></li>
                <li><Link to="/wallpaper-api" className="text-zinc-500 hover:text-rose-500 transition-colors">Wallpapers API</Link></li>
                <li><Link to="/discord" className="text-zinc-500 hover:text-rose-500 transition-colors">Discord Server</Link></li>
              </ul>
            </div>

            {/* Legal Section - Contact Us Restored */}
            <div>
              <h3 className="text-zinc-900 font-bold mb-6 uppercase text-[11px] tracking-[0.2em]">
                Legal
              </h3>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link to="/privacy-policy" className="text-zinc-500 hover:text-rose-500 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="text-zinc-500 hover:text-rose-500 transition-colors">Terms of Service</Link></li>
                <li><Link to="/dmca" className="text-zinc-500 hover:text-rose-500 transition-colors">Copyright (DMCA)</Link></li>
                <li>
                
                </li>
              </ul>
            </div>

            {/* Status Section */}
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-zinc-900 font-bold mb-6 uppercase text-[11px] tracking-[0.2em]">
                Status
              </h3>
              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 group hover:border-green-200 transition-colors duration-300">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </div>
                  <span className="text-[10px] text-green-700 font-bold uppercase tracking-wider">
                    Systems Nominal
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 mt-2 font-medium">
                  Uptime: 99.9%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <p className="text-sm font-medium text-zinc-900">
              © {currentYear} Lilkami.
            </p>
            <p className="text-xs text-zinc-400">
              All third-party artwork belongs to its respective owners.
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="text-zinc-400 flex items-center gap-1.5">
              Made with <Heart size={14} className="fill-rose-500 text-rose-500" /> by 
              <a href="https://github.com/meghXite" target="_blank" rel="noreferrer" className="text-zinc-900 hover:text-rose-500 transition-colors">
                meghXite
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;