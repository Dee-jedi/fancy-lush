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
  const isShopOrProductPage = pathname === '/shop' || pathname.startsWith('/products/');

  // Always show on Shop and Product pages, otherwise hidden (e.g. Home page)
  if (!isShopOrProductPage || pathname === '/cart') return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: 20 }}
        className="fixed bottom-10 right-10 z-[50]"
      >
          <Link href="/cart" className="group block relative">
            <motion.div 
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="w-20 h-20 bg-[var(--primary)] text-white rounded-full shadow-[0_20px_50px_rgba(46,16,101,0.3)] flex items-center justify-center relative border border-white/20 backdrop-blur-xl"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span 
                    key={totalItems}
                    initial={{ scale: 1.5, backgroundColor: '#c5a059', color: '#ffffff' }}
                    animate={{ scale: 1, backgroundColor: '#c5a059', color: '#ffffff' }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-8 h-8 bg-[var(--secondary)] text-white rounded-full flex items-center justify-center text-[11px] font-black border-2 border-white shadow-lg"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Tooltip hint */}
            <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              <span className="text-[10px] tracking-widest uppercase font-black text-[var(--primary)]">View Cart</span>
            </div>
          </Link>
        </motion.div>
    </AnimatePresence>
  );
};
