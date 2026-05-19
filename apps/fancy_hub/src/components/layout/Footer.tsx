"use client";

import React from "react";

export function Footer() {
  return (
    <footer className="bg-[#010102] border-t border-white/5 py-16 px-6 md:px-12 relative z-20 text-white/50 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-baseline justify-center md:justify-start gap-2">
            <span className="font-serif text-xl tracking-[0.2em] font-extrabold uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-[#d1d5db] to-[#9ca3af]">
              FANCY LUSH
            </span>
            <span className="text-[8px] tracking-[0.3em] font-black uppercase text-white/30">
              EMPIRE
            </span>
          </div>
          <p className="text-[10px] font-light text-white/30 max-w-xs">
            One standard of clinical, aesthetic, and architectural craftsmanship. Shop 21 Palms Mall, Ilorin.
          </p>
        </div>

        <div className="text-center md:text-right space-y-2">
          <p className="text-[10px] text-white/30 font-light">
            © {new Date().getFullYear()} FANCY LUSH EMPIRE. ALL RIGHTS RESERVED.
          </p>
          <p className="text-[9px] text-[#e5e7eb] tracking-[0.1em] font-black uppercase">
            REDEFINING AFRICAN LUXURY
          </p>
        </div>

      </div>
    </footer>
  );
}
