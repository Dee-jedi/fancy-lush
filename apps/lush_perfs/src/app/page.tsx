"use client";

import React from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useSearch } from "@/context/SearchContext";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const sentenceVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.2,
    }
  }
};

const wordVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const letterVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function BoutiquePage() {
  const { searchQuery, setSearchQuery, activeCategory, setActiveCategory } = useSearch();
  const { addToCart } = useCart();

  // Category options for filters
  const categories = [
    { id: "all", label: "All Products" },
    { id: "jewelry", label: "Fine Jewelry" },
    { id: "fragrances", label: "Luxury Fragrances" }
  ];

  // Filtering Logic
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const titleText = "Lush Boutique";

  return (
    <main className="min-h-screen bg-[#050404] text-white pb-28 lg:pb-12">
      {/* Standard Desktop Header */}
      <Header />

      {/* Hero Atmosphere */}
      <div className="relative pt-24 lg:pt-36 flex flex-col items-center justify-center min-h-[30vh] lg:min-h-[45vh] overflow-hidden text-center z-10 px-6">
        {/* Glow Vignette Underlays */}
        <div className="absolute top-1/4 left-1/4 w-[50%] h-[50%] bg-[#c89666]/5 rounded-full blur-[150px] mix-blend-screen pointer-events-none -z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[50%] h-[50%] bg-[#f5d6c6]/5 rounded-full blur-[150px] mix-blend-screen pointer-events-none -z-10"></div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 max-w-3xl"
        >
          <span className="text-[9px] tracking-[0.4em] font-black uppercase text-[#c89666] bg-white/5 border border-white/5 px-6 py-2 rounded-full backdrop-blur-md">
            Atelier of Senses & Form
          </span>
          
          <motion.h1 
            variants={sentenceVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-tight flex flex-wrap justify-center gap-x-[0.3em] items-center"
          >
            <motion.span variants={wordVariants} className="text-white">
              The
            </motion.span>
            
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8e5e38] via-[#c89666] to-[#f5d6c6] italic font-light inline-flex">
              {Array.from(titleText).map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="inline-block select-none"
                  style={{ marginRight: char === " " ? "0.2em" : "0" }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <p className="text-xs md:text-sm text-white/40 font-light max-w-xl mx-auto leading-relaxed">
            Where raw 18K gold refinement meets hypnotic Cambodian Oud extracts. Designed for absolute statement presence.
          </p>
        </motion.div>
      </div>

      {/* 📱 Mobile-Only Sticky Header Row (Boutique layout spec) */}
      <div className="sticky top-0 z-40 bg-[#050404]/90 backdrop-blur-md border-b border-white/5 lg:hidden flex flex-col pt-2">
        {/* Row 2: Page Titles */}
        <div className="px-5 pt-2 pb-2 flex justify-between items-center">
          <h2 className="font-serif text-lg font-bold text-white tracking-tight">The Boutique</h2>
          <span className="text-[9px] tracking-widest uppercase font-black text-[#c89666]">
            Jewelry & Fragrances
          </span>
        </div>

        {/* Row 3: Sharp Gold Search Bar */}
        <div className="px-5 py-2.5 relative group">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search our selection..."
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-full px-5 py-3 text-[11px] font-light text-white placeholder-white/20 focus:outline-none focus:border-[#c89666]/75 transition-all relative z-10 animate-all duration-300"
          />
          <div className="absolute right-9 top-1/2 -translate-y-1/2 z-20 text-white/30 pointer-events-none">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>

        {/* Row 4: Category filter capsules with active gold-gradient underline */}
        <div className="px-5 pb-3 flex gap-6 overflow-x-auto no-scrollbar scroll-smooth relative">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-[10px] tracking-[0.2em] font-black uppercase flex-none py-2 relative transition-all ${
                  isActive ? "text-white" : "text-white/40"
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

      {/* 🖥️ Desktop Filters Bar (Only visible on larger screens) */}
      <section className="hidden lg:flex max-w-[1600px] mx-auto px-12 py-8 items-center justify-between z-20 relative border-b border-white/5 mb-8">
        {/* Categories (Left) */}
        <div className="flex gap-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-[10px] tracking-[0.3em] font-black uppercase py-2 relative transition-colors ${
                  isActive ? "text-white" : "text-white/40 hover:text-white"
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

        {/* Searching (Right) */}
        <div className="relative w-[300px] group">
          <div className="absolute inset-0 bg-[#c89666]/10 rounded-full blur-[8px] opacity-0 group-focus-within:opacity-30 transition-opacity duration-500"></div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search selection..."
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-full px-6 py-3 text-xs font-light text-white placeholder-white/20 focus:outline-none focus:border-[#c89666]/75 transition-all relative z-10"
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 text-white/30 group-focus-within:text-[#c89666] transition-colors pointer-events-none">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
      </section>

      {/* Masonry Product Catalog */}
      <section className="py-6 lg:py-12 px-5 md:px-12 max-w-[1600px] mx-auto relative z-10">
        {filteredProducts.length === 0 ? (
          /* High-End Empty State */
          <div className="max-w-md mx-auto text-center py-24 space-y-6">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-3xl mx-auto border border-white/10 shadow-lg text-[#c89666]">
              ✨
            </div>
            <h3 className="text-2xl font-serif text-white">Selection Empty</h3>
            <p className="text-xs text-white/40 font-light leading-relaxed">
              We couldn't find any premium accessories matching your search. Please adjust your filters or keywords.
            </p>
          </div>
        ) : (
          /* Organic Dynamic Heights Masonry Grid (Replicating other apps exactly!) */
          <div className="columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-8 space-y-4 md:space-y-8">
            {filteredProducts.map((item, index) => {
              // Organic varying heights just like other apps
              const heights = [
                "h-[250px] md:h-[400px]", 
                "h-[320px] md:h-[500px]", 
                "h-[280px] md:h-[450px]", 
                "h-[220px] md:h-[350px]", 
                "h-[350px] md:h-[550px]"
              ];
              const heightClass = heights[index % heights.length];

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: (index % 4) * 0.1 }}
                  className={`break-inside-avoid relative group cursor-pointer overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-[#110c0a]/40 border border-white/10 shadow-2xl transition-all duration-700 hover:shadow-[var(--primary)]/10 mb-4 md:mb-8 ${heightClass}`}
                >
                  <Link href={`/products/${item.id}`} className="block h-full w-full relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 grayscale-[0.1] group-hover:grayscale-0"
                    />

                    {/* Cinematic Warm Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050404] via-transparent to-transparent opacity-65 group-hover:opacity-90 transition-opacity duration-700 z-10"></div>

                    {/* Floating Metadata (Immersive Style) */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-700 z-20">
                      <span className="text-[7px] md:text-[10px] tracking-[0.3em] uppercase font-black text-[#c89666] mb-1 md:mb-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                        {item.tag}
                      </span>
                      <h3 className="text-xs md:text-2xl font-serif text-white leading-tight mb-1 md:mb-2 line-clamp-2">
                        {item.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <p className="text-[9px] md:text-base font-sans font-medium text-white/70 tracking-widest">
                          {item.price}
                        </p>
                        
                        {/* Subtle Arrow Indicator (Desktop Only) */}
                        <div className="hidden md:flex w-8 h-8 rounded-full border border-white/20 items-center justify-center opacity-0 group-hover:opacity-100 transition-all delay-200">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Quick Add (Glassmorphic Style in top right) */}
                    <div className="absolute top-3 right-3 md:top-6 md:right-6 z-20">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addToCart(item);
                        }}
                        className="w-8 h-8 md:w-12 md:h-12 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-[#c89666] hover:border-transparent transition-all duration-500 group/btn"
                        title="Add to selection bag"
                      >
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          className="md:group-hover/btn:scale-125 transition-transform"
                        >
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </button>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* Hide footer on mobile view, show only on desktop */}
      <div className="hidden lg:block">
        <Footer />
      </div>
    </main>
  );
}
