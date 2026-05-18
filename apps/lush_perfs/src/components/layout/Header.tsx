"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { totalItems } = useCart();

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`${
        isHome ? "absolute" : "fixed"
      } top-0 inset-x-0 z-50 transition-all duration-300 bg-[#050404]/80 backdrop-blur-md border-b border-white/5 py-4 md:py-5 px-6 md:px-12`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
        {/* Brand Logo in Gold */}
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-serif text-xl md:text-2xl tracking-[0.2em] font-extrabold uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#8e5e38] via-[#c89666] to-[#f5d6c6] group-hover:scale-105 transition-transform">
            LUSH
          </span>
          <span className="text-[9px] tracking-[0.3em] font-black uppercase text-white/40 group-hover:text-[#c89666] transition-colors">
            ATELIER
          </span>
        </Link>

        {/* Navigation - hidden on mobile since we have bottom nav bar */}
        <nav className="hidden md:flex items-center gap-8 md:gap-12">
          <Link 
            href="/" 
            className={`text-[10px] tracking-[0.3em] font-black uppercase transition-colors relative py-1 ${
              pathname === "/" ? "text-[#c89666]" : "text-white/60 hover:text-white"
            }`}
          >
            Boutique
            {pathname === "/" && (
              <motion.div 
                layoutId="nav-underline" 
                className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#c89666] to-transparent" 
              />
            )}
          </Link>
          <Link 
            href="/about" 
            className={`text-[10px] tracking-[0.3em] font-black uppercase transition-colors relative py-1 ${
              pathname === "/about" ? "text-[#c89666]" : "text-white/60 hover:text-white"
            }`}
          >
            Atelier Story
            {pathname === "/about" && (
              <motion.div 
                layoutId="nav-underline" 
                className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#c89666] to-transparent" 
              />
            )}
          </Link>
        </nav>

        {/* Cart Icon Link */}
        <Link href="/cart" className="relative group p-2 text-white/70 hover:text-[#c89666] transition-colors">
          <motion.div
            animate={{ 
              rotate: [-6, 6, -6]
            }}
            transition={{ 
              duration: 2.5, 
              ease: "easeInOut",
              repeat: Infinity 
            }}
            whileTap={{ scale: 0.95 }}
            className="origin-center"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </motion.div>
        </Link>
      </div>
    </motion.header>
  );
}

