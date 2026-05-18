"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export function FloatingCart() {
  const { totalItems } = useCart();


  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-8 right-8 z-50 pointer-events-auto hidden lg:block"
        >
          <Link href="/cart">
            <button className="relative flex items-center gap-4 bg-[#1c1310]/95 hover:bg-[#281c18] border border-[#c89666]/30 hover:border-[#c89666]/60 text-white rounded-full px-6 py-4 shadow-[0_20px_50px_rgba(200,150,102,0.15)] backdrop-blur-md group transition-all duration-300 hover:scale-105">
              
              {/* Pulsing Outer Gold Ring */}
              <div className="absolute inset-0 rounded-full bg-[#c89666]/5 animate-ping pointer-events-none"></div>

              {/* Shopping bag icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#c89666]">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>

              <span className="text-[10px] tracking-[0.2em] font-black uppercase text-white/80 group-hover:text-white transition-colors">
                View Bag
              </span>

              {/* Count Indicator */}
              <span className="bg-gradient-to-r from-[#a07148] via-[#c89666] to-[#e5baa0] text-[#120d0a] font-serif font-black italic rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md">
                {totalItems}
              </span>

            </button>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

