"use client";

import React from "react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#030303]/60 backdrop-blur-xl border-b border-white/5 px-6 py-5 md:px-12 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-baseline gap-2">
          <span className="font-serif text-lg sm:text-xl md:text-2xl tracking-[0.15em] sm:tracking-[0.25em] font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e8e6f4] to-[#a78bfa]">
            FANCY LUSH
          </span>
          <span className="hidden sm:inline font-serif italic lowercase text-[13px] tracking-normal text-[#a78bfa]/70 ml-0.5 select-none">
            emp
          </span>
        </div>

        <nav className="hidden md:flex gap-10">
          <a href="#ecosystem" className="text-[10px] tracking-[0.3em] font-black uppercase text-white/50 hover:text-[#a78bfa] transition-colors">THE ECOSYSTEM</a>
          <a href="#story" className="text-[10px] tracking-[0.3em] font-black uppercase text-white/50 hover:text-[#a78bfa] transition-colors">OUR STORY</a>
          <a href="#showroom" className="text-[10px] tracking-[0.3em] font-black uppercase text-white/50 hover:text-[#a78bfa] transition-colors">THE SHOWROOM</a>
        </nav>

        <a 
          href="#showroom"
          className="border border-[#6366f1]/30 text-[#a78bfa] px-5 py-2 rounded-full text-[10px] tracking-[0.2em] font-black uppercase hover:bg-[#6366f1] hover:text-white hover:border-transparent transition-all duration-500 shadow-[0_0_15px_rgba(99,102,241,0.1)]"
        >
          VISIT US
        </a>
      </div>
    </header>
  );
}
