"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#030303]/60 backdrop-blur-xl border-b border-white/5 px-6 py-5 md:px-12 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-lg sm:text-xl md:text-2xl tracking-[0.15em] sm:tracking-[0.25em] font-black uppercase text-transparent bg-clip-text bg-linear-to-r from-white via-[#e8e6f4] to-[#a78bfa]">
              FANCY LUSH
            </span>
          </div>

          {/* Desktop Nav - Hidden on mobile */}
          <nav className="hidden md:flex gap-10">
            <a href="#ecosystem" className="text-[10px] tracking-[0.3em] font-black uppercase text-white/50 hover:text-[#a78bfa] transition-colors">THE ECOSYSTEM</a>
            <a href="#story" className="text-[10px] tracking-[0.3em] font-black uppercase text-white/50 hover:text-[#a78bfa] transition-colors">OUR STORY</a>
            <a href="#showroom" className="text-[10px] tracking-[0.3em] font-black uppercase text-white/50 hover:text-[#a78bfa] transition-colors">THE SHOWROOM</a>
          </nav>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="w-12 h-12 flex flex-col items-center justify-center gap-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            aria-label="Open menu"
          >
            <span className="w-5 h-0.5 bg-white rounded-full"></span>
            <span className="w-5 h-0.5 bg-white rounded-full"></span>
          </button>
        </div>
      </header>

      {/* Side Menu Overlay & Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-100"
            />
            
            {/* Sliding Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[80vw] sm:w-[400px] bg-[#050404] border-l border-white/10 z-101 flex flex-col shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="flex justify-between items-center p-6 border-b border-white/5">
                <span className="font-serif text-lg tracking-[0.15em] font-black uppercase text-transparent bg-clip-text bg-linear-to-r from-white via-[#e8e6f4] to-[#a78bfa]">
                  MENU
                </span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-10 h-10 flex flex-col items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white"
                  aria-label="Close menu"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              
              {/* Drawer Content */}
              <div className="flex-1 flex flex-col p-8 gap-8 overflow-y-auto">
                <nav className="flex flex-col gap-8 mt-2">
                  <a href="/" onClick={() => setIsMenuOpen(false)} className="text-xl font-light text-white hover:text-[#a78bfa] transition-colors flex items-center justify-between group">
                    Home
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/20 group-hover:text-[#a78bfa] transition-colors"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </a>
                  <a href="/membership" onClick={() => setIsMenuOpen(false)} className="text-xl font-light text-white hover:text-[#a78bfa] transition-colors flex items-center justify-between group">
                    Membership
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/20 group-hover:text-[#a78bfa] transition-colors"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </a>
                  <a href="/account" onClick={() => setIsMenuOpen(false)} className="text-xl font-light text-white hover:text-[#a78bfa] transition-colors flex items-center justify-between group">
                    Account
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/20 group-hover:text-[#a78bfa] transition-colors"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </a>
                </nav>

                <div className="mt-auto">
                  <a href="/membership" onClick={() => setIsMenuOpen(false)} className="block">
                    <button className="w-full py-4 rounded-full bg-[#6366f1] text-white text-xs tracking-widest font-black uppercase hover:bg-[#a78bfa] transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                      Become a Member &rarr;
                    </button>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
