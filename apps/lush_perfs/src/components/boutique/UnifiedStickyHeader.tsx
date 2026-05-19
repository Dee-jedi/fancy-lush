"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useSearch } from '@/context/SearchContext';
import { useCart } from '@/context/CartContext';

export function UnifiedStickyHeader() {
  const pathname = usePathname();
  const { searchQuery, setSearchQuery, activeCategory, setActiveCategory } = useSearch();
  const { totalItems } = useCart();

  const categories = [
    { id: "all", label: "All" },
    { id: "jewelry", label: "Lush Jewelry" },
    { id: "fragrances", label: "Lush Perfumes" }
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 inset-x-0 z-50 bg-[#050404]/85 backdrop-blur-xl border-b border-white/5 py-4 px-6 md:px-12 flex flex-col gap-4 shadow-2xl transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-4">
        {/* Row 1: Brand & Bag Icon & Desktop Navigation */}
        <div className="flex justify-between items-center w-full">
          {/* Brand Logo in Gold */}
          <Link href="/" className="group flex items-baseline gap-2">
            <span className="font-serif text-xl md:text-2xl tracking-[0.2em] font-extrabold uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#8e5e38] via-[#c89666] to-[#f5d6c6] group-hover:scale-105 transition-transform">
              LUSH
            </span>
            <span className="text-[9px] tracking-[0.3em] font-black uppercase text-white/40 group-hover:text-[#c89666] transition-colors">
              ATELIER
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-12">
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

          {/* Shopping Bag / Cart */}
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
              className="origin-center relative"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#c89666] text-[#050404] text-[8px] font-black rounded-full flex items-center justify-center shadow-lg border border-[#050404]">
                  {totalItems}
                </span>
              )}
            </motion.div>
          </Link>
        </div>

        {/* Row 2: Search Input & Category Filters */}
        {/* Desktop View: Inline categories (left) and search input (right) */}
        <div className="hidden md:flex justify-between items-center border-t border-white/5 pt-3 w-full">
          {/* Desktop Categories Filter */}
          <div className="flex gap-10">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`text-[10px] tracking-[0.3em] font-black uppercase py-2 relative transition-colors ${isActive ? "text-white" : "text-white/40 hover:text-white"
                    }`}
                >
                  {cat.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryLineDesktop"
                      className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#c89666] to-transparent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Desktop Search Bar */}
          <div className="relative w-[300px] group">
            <div className="absolute inset-0 bg-[#c89666]/10 rounded-full blur-[8px] opacity-0 group-focus-within:opacity-30 transition-opacity duration-500"></div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search selection..."
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-full px-6 py-2.5 text-xs font-light text-white placeholder-white/20 focus:outline-none focus:border-[#c89666]/75 transition-all relative z-10"
            />
            <div className="absolute right-5 top-1/2 -translate-y-1/2 z-20 text-white/30 group-focus-within:text-[#c89666] transition-colors pointer-events-none">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
        </div>

        {/* Mobile View: Stacked search input and centered categories */}
        <div className="flex flex-col gap-3 md:hidden border-t border-white/5 pt-3 w-full">
          {/* Mobile Search Bar */}
          <div className="relative w-full group px-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search our selection..."
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-full px-5 py-2.5 text-[11px] font-light text-white placeholder-white/20 focus:outline-none focus:border-[#c89666]/75 transition-all relative z-10"
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 text-white/30 pointer-events-none">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>

          {/* Mobile Categories Filter */}
          <div className="px-5 pb-1 flex gap-6 justify-center overflow-x-auto no-scrollbar scroll-smooth relative w-full">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`text-[10px] tracking-[0.2em] font-black uppercase flex-none py-2 relative transition-all ${isActive ? "text-white" : "text-white/40"
                    }`}
                >
                  {cat.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryLineMobile"
                      className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#c89666] to-transparent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
