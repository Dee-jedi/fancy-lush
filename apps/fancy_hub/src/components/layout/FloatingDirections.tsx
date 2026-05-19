"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingDirections() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href="https://www.google.com/maps/dir/?api=1&destination=The+Palms+Shopping+Mall+Ilorin"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#0a0a0c]/85 border border-[#6366f1]/40 backdrop-blur-xl text-[#a78bfa] shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_20px_rgba(99,102,241,0.2)] hover:border-[#a78bfa] hover:text-white transition-all duration-500 group"
      >
        {/* Soft outer pulsing ring */}
        <span className="absolute inset-0 rounded-full border border-[#a78bfa]/20 animate-ping pointer-events-none" />

        {/* Map Compass/Navigation Arrow Icon */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="transform rotate-45 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-500"
        >
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>

        {/* Tooltip Label */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-[#0a0a0c]/90 border border-white/5 px-4 py-2 rounded-2xl shadow-2xl backdrop-blur-md pointer-events-none whitespace-nowrap hidden md:block"
            >
              <span className="text-[9px] tracking-[0.2em] font-black uppercase text-white/80">
                GET GPS DIRECTIONS
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </a>
    </div>
  );
}
