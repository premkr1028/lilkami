import React from 'react';
import { motion } from 'framer-motion';

const ComingSoonPage = () => {
  return (
    <div className="min-h-screen w-full bg-white text-black flex items-center justify-center font-sans">
      <main className="text-center px-6">
        
        {/* Simple Animated Dot */}
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 bg-black rounded-full mx-auto mb-6"
        />

        {/* Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-light tracking-tighter mb-4"
        >
          Something new is <strong>on the way.</strong>
        </motion.h1>

        {/* Subtext */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.2 }}
          className="text-sm uppercase tracking-[0.3em] font-medium"
        >
          Page under construction // 2026
        </motion.p>

        {/* Home Link */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <a href="/" className="text-xs font-bold border-b border-black pb-1 hover:opacity-50 transition-opacity">
            RETURN HOME
          </a>
        </motion.div>

      </main>
    </div>
  );
};



export default ComingSoonPage;