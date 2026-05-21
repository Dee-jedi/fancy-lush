"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import Link from 'next/link';
import { formatPrice } from '@/utils/formatPrice';
import { useSearch } from '@/context/SearchContext';
import Image from 'next/image';

export default function ShopPage() {
  const { addToCart } = useCart();
  const { 
    searchQuery, 
    setSearchQuery, 
    filteredProducts,
    loading,
    loadingMore,
    hasMore,
    fetchMoreProducts
  } = useSearch();

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          fetchMoreProducts();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [loading, hasMore, loadingMore, fetchMoreProducts]);

  return (
    <main className="min-h-screen bg-[var(--background)] overflow-x-hidden">
      {/* Default Header - Auto-hidden on mobile inside /shop */}
      <Header />
      
      {/* 📱 Mobile Sticky Controls - Hidden on Desktop */}
      <div className="sticky top-0 z-40 bg-[#08080b]/95 backdrop-blur-xl border-b border-white/5 pb-5 pt-6 px-6 lg:hidden flex flex-col gap-4 shadow-2xl">
        {/* Title Section */}
        <div>
          <span className="text-[7px] tracking-[0.4em] font-black uppercase text-[var(--primary)] block mb-0.5">The Boutique</span>
          <h1 className="text-2xl font-serif text-white">Premium Extensions</h1>
        </div>

        {/* Glowing Search Bar */}
        <div className="relative w-full group">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-full blur-[6px] opacity-0 group-focus-within:opacity-20 transition-opacity duration-300"></div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search extensions..."
            className="w-full bg-[#030712] border border-white/20 rounded-full px-5 py-3.5 text-[11px] font-light text-white placeholder-white/30 focus:outline-none focus:border-[var(--primary)]/70 transition-all relative z-10"
          />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 z-20 text-white/30 pointer-events-none">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
      </div>

      {/* 💻 Desktop Hero Section - Hidden on Mobile */}
      <section className="pt-48 pb-10 px-6 relative overflow-hidden hidden lg:block">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--primary)]/10 rounded-full blur-[150px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-6 z-10 relative">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] tracking-[0.4em] font-black uppercase text-[var(--primary)]"
          >
            The Collection
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif text-white"
          >
            Premium <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">Extensions</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/50 max-w-2xl font-light"
          >
            Explore our curated selection of raw virgin hair, flawless frontals, and luxury care products.
          </motion.p>
        </div>
      </section>

      {/* 💻 Desktop Search Bar - Centered and Gorgeous */}
      <section className="max-w-xl mx-auto px-6 mb-8 relative z-30 hidden lg:block">
        <div className="relative w-full group">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-full blur-[10px] opacity-10 group-focus-within:opacity-30 transition-opacity duration-500"></div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search our luxury collection..."
            className="w-full bg-white/[0.02] border border-white/10 rounded-full px-8 py-4.5 text-sm font-light text-white placeholder-white/30 focus:outline-none focus:border-[var(--primary)]/70 transition-all relative z-10 backdrop-blur-2xl"
          />
          <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 text-white/30 group-focus-within:text-[var(--primary)] transition-colors pointer-events-none">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="py-6 lg:py-12 px-4 md:px-8 max-w-[1600px] mx-auto relative z-10">
        {loading ? (
          /* Premium Shimmer Skeleton Grid */
          <div className="columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-8 space-y-4 md:space-y-8">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div 
                key={idx}
                className={`break-inside-avoid relative rounded-[1.5rem] md:rounded-[2.5rem] bg-white/[0.02] border border-white/5 overflow-hidden animate-pulse mb-4 md:mb-8 ${
                  ["h-[250px] md:h-[400px]", "h-[320px] md:h-[500px]", "h-[280px] md:h-[450px]", "h-[220px] md:h-[350px]"][idx % 4]
                }`}
              >
                <div className="absolute bottom-0 inset-x-0 p-4 md:p-8 space-y-3">
                  <div className="h-4 md:h-6 bg-white/5 rounded-xl w-3/4 animate-[shimmer_2s_infinite]"></div>
                  <div className="h-3 md:h-4 bg-white/5 rounded-lg w-1/4 animate-[shimmer_2s_infinite]"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          /* Luxury Empty State */
          <div className="max-w-md mx-auto text-center py-24 space-y-4">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-3xl mx-auto border border-white/10">
              ✨
            </div>
            <h3 className="text-2xl font-serif text-white">No Products Found</h3>
            <p className="text-sm text-white/40 font-light leading-relaxed">
              We couldn't find any products matching your search query. Try searching for something else!
            </p>
          </div>
        ) : (
          <>
            <div className="columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-8 space-y-4 md:space-y-8">
              {filteredProducts.map((product, index) => {
                // Organic varying heights like the spa gallery
                const heights = ["h-[250px] md:h-[400px]", "h-[320px] md:h-[500px]", "h-[280px] md:h-[450px]", "h-[220px] md:h-[350px]", "h-[350px] md:h-[550px]"];
                const heightClass = heights[index % heights.length];

                return (
                  <motion.div 
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (index % 4) * 0.1, duration: 0.8 }}
                    className={`break-inside-avoid relative group cursor-pointer overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-white/5 border border-white/10 shadow-2xl transition-all duration-700 hover:shadow-[var(--primary)]/10 mb-4 md:mb-8 ${heightClass}`}
                  >
                    <Link href={`/products/${product.id}`} className="block h-full w-full relative">
                      <Image 
                        src={product.image} 
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                      />
                      
                      {/* Cinematic Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700"></div>
                      
                      {/* Floating Metadata (Immersive Style) */}
                      <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                        <h3 className="text-sm md:text-3xl font-serif text-white leading-tight mb-1 md:mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <p className="text-[10px] md:text-base font-sans font-medium text-white/70 tracking-widest">
                            {formatPrice(product.price)}
                          </p>
                          
                          {/* Subtle Arrow Indicator (Desktop Only) */}
                          <div className="hidden md:flex w-8 h-8 rounded-full border border-white/20 items-center justify-center opacity-0 group-hover:opacity-100 transition-all delay-200">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Quick Add (Glassmorphic Style) */}
                      <div className="absolute top-3 right-3 md:top-6 md:right-6 z-20">
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToCart(product);
                          }}
                          className="w-8 h-8 md:w-12 md:h-12 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-[var(--primary)] hover:border-transparent transition-all duration-500 group/btn"
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

            {/* Scroll Anchor & Spinner */}
            <div ref={observerRef} className="h-16 w-full flex items-center justify-center mt-12 mb-6">
              {loadingMore && (
                <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full border border-white/10 backdrop-blur-md">
                  <div className="w-5 h-5 border-2 border-white/10 border-t-[var(--primary)] rounded-full animate-spin"></div>
                  <span className="text-[10px] tracking-[0.2em] font-black uppercase text-white/50 animate-pulse">Loading Premium Extensions...</span>
                </div>
              )}
            </div>
          </>
        )}
      </section>

      {/* Hide footer on mobile view, show only on desktop */}
      <div className="hidden lg:block">
        <Footer />
      </div>
    </main>
  );
}
