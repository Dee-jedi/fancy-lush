"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import Link from 'next/link';
import { PRODUCTS } from '@/constants';
import { formatPrice } from '@/utils/formatPrice';

export default function ShopPage() {
  const { addToCart } = useCart();

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-48 pb-20 px-6 relative overflow-hidden">
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

      {/* Masonry Grid */}
      <section className="py-20 px-4 md:px-8 max-w-[1600px] mx-auto">
        <div className="columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-8 space-y-4 md:space-y-8">
          {PRODUCTS.map((product, index) => {
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
                <Link href={`/products/${product.id}`} className="block h-full w-full">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                  />
                  
                  {/* Cinematic Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700"></div>
                  
                  {/* Floating Metadata (Immersive Style) */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                    <span className="text-[7px] md:text-[10px] tracking-[0.3em] uppercase font-black text-[var(--primary)] mb-1 md:mb-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                      {product.tag}
                    </span>
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
      </section>

      <Footer />
    </main>
  );
}
