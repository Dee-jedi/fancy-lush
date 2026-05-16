"use client";

import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const FloatingCart = () => {
  const { totalItems } = useCart();
  const pathname = usePathname();

  // Always show on Shop and Product pages, otherwise only if items > 0
  const isShopOrProductPage = pathname === '/shop' || pathname?.startsWith('/products/');

  // Always show on Shop and Product pages, otherwise hidden (e.g. Home page)
  if (!isShopOrProductPage || pathname === '/cart') return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: 20 }}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100]"
      >
          <Link href="/cart" className="group block relative">
            {/* Outer Glow Pulse */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)] rounded-full blur-[15px] opacity-40 group-hover:opacity-80 animate-pulse transition-opacity duration-500"></div>
            
            <motion.div 
              whileHover={{ scale: 1.1, y: -8 }}
              whileTap={{ scale: 0.9 }}
              className="w-16 h-16 md:w-24 md:h-24 bg-white/10 text-white rounded-full flex items-center justify-center relative border border-white/30 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:border-[var(--primary)] transition-all duration-500"
            >
              <svg 
                width="28" 
                height="28" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="group-hover:rotate-12 transition-transform"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span 
                    key={totalItems}
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-7 h-7 md:w-10 md:h-10 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white rounded-full flex items-center justify-center text-[10px] md:text-[13px] font-black border-2 border-[#030712] shadow-[0_0_20px_rgba(251,113,133,0.5)]"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Tooltip hint */}
            <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#030712]/90 backdrop-blur-md rounded-xl shadow-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              <span className="text-[10px] tracking-widest uppercase font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">View Cart</span>
            </div>
          </Link>
        </motion.div>
    </AnimatePresence>
  );
};
