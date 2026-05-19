"use client";

import React from "react";

export function Showroom() {
  return (
    <section id="showroom" className="py-20 md:py-32 px-6 max-w-5xl mx-auto relative z-10">
      <div className="text-center mb-16 space-y-4">
        <span className="text-[9px] tracking-[0.4em] font-black text-white/40 uppercase block">FLAGSHIP COORDINATES</span>
        <h2 className="text-3xl md:text-5xl font-serif text-white">Our Palms Mall Showroom</h2>
        <p className="text-xs text-white/40 tracking-[0.1em] font-light max-w-md mx-auto">
          Experience our physical boutiques and consult with our specialists in Kwara State.
        </p>
      </div>

      {/* Horizontal Coordinates Glassmorphic Panel (No Frame, Zero API Errors!) */}
      <div className="glass-panel border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
        
        {/* Soft Background Highlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-40 bg-[#6366f1]/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#6366f1]/10 transition-all duration-700" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start relative z-10">
          
          {/* Address credentials */}
          <div className="space-y-4 text-center md:text-left">
            <span className="inline-block p-3 rounded-2xl bg-white/5 border border-[#6366f1]/20 text-[#a78bfa]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            <div className="space-y-2">
              <h4 className="text-[10px] tracking-[0.3em] font-black uppercase text-[#a78bfa]">FLAGSHIP ADDRESS</h4>
              <address className="not-italic text-sm font-light text-white/60 leading-relaxed">
                Shop 21 Palms Mall,<br />
                Ilorin, Kwara State,<br />
                Nigeria
              </address>
            </div>
          </div>

          {/* Business Hours */}
          <div className="space-y-4 text-center md:text-left">
            <span className="inline-block p-3 rounded-2xl bg-white/5 border border-[#6366f1]/20 text-[#a78bfa]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </span>
            <div className="space-y-2">
              <h4 className="text-[10px] tracking-[0.3em] font-black uppercase text-[#a78bfa]">BUSINESS HOURS</h4>
              <ul className="text-sm font-light text-white/60 space-y-1.5">
                <li>Monday – Saturday: <span className="text-white font-medium">9:00am – 9:00pm</span></li>
                <li>Sunday: <span className="text-white font-medium">1:00pm – 9:00pm</span></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Clean Directions Link banner inside the panel */}
        <div className="mt-10 pt-8 border-t border-white/5 text-center relative z-10">
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=The+Palms+Shopping+Mall+Ilorin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-[10px] tracking-[0.25em] font-black text-white/60 hover:text-white uppercase transition-all duration-300 group/link"
          >
            CALCULATE LIVE ROUTE DIRECTIONS
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5"
              className="transform group-hover/link:translate-x-1.5 transition-transform duration-300"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
