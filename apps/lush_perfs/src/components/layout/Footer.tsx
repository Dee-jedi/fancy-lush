"use client";

import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#030305] border-t border-white/5 py-16 px-6 md:px-12 relative z-20 text-white/50 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">
        
        {/* Brand Meta */}
        <div className="space-y-4">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="font-serif text-xl tracking-[0.2em] font-extrabold uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#8e5e38] via-[#c89666] to-[#f5d6c6]">
              LUSH
            </span>
            <span className="text-[9px] tracking-[0.3em] font-black uppercase text-white/40">
              ATELIER
            </span>
          </Link>
          <p className="max-w-xs text-[11px] font-light leading-relaxed text-white/40">
            Redefining luxury beauty in Ilorin through precision, passion, and unparalleled relaxation. Crafting solid 18K gold and olfactory art.
          </p>
        </div>

        {/* Opening Hours */}
        <div className="space-y-4">
          <h4 className="text-[9px] tracking-[0.3em] font-black uppercase text-[#c89666]">Opening Hours</h4>
          <ul className="space-y-2 text-[11px] font-light text-white/30">
            <li>Mon - Sat: 9am - 9pm</li>
            <li>Sun: 1pm - 9pm</li>
          </ul>
        </div>

        {/* Location & Contact */}
        <div className="space-y-4">
          <h4 className="text-[9px] tracking-[0.3em] font-black uppercase text-[#c89666]">Location</h4>
          <address className="not-italic text-[11px] font-light leading-relaxed text-white/30">
            Shop 21 Palms Mall,<br />
            Ilorin, Kwara State,<br />
            Nigeria
          </address>
          <div className="pt-2 text-[10px] font-black text-white/20">
            © {new Date().getFullYear()} LUSH ATELIER. ALL RIGHTS RESERVED.
          </div>
        </div>

      </div>
    </footer>
  );
}
