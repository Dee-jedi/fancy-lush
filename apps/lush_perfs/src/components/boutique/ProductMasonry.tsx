"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useSearch } from '@/context/SearchContext';

interface ProductMasonryProps {
  products: any[];
}

export function ProductMasonry({ products }: ProductMasonryProps) {
  const { addToCart } = useCart();
  const { loading } = useSearch();

  if (loading && products.length === 0) {
    return (
      <section className="py-6 lg:py-12 px-5 md:px-12 max-w-[1600px] mx-auto relative z-10">
        <div className="columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
            const heights = [
              "h-[250px] md:h-[400px]",
              "h-[320px] md:h-[500px]",
              "h-[280px] md:h-[450px]",
              "h-[220px] md:h-[350px]",
              "h-[350px] md:h-[550px]"
            ];
            const heightClass = heights[i % heights.length];
            return (
              <div
                key={`skeleton-${i}`}
                className={`break-inside-avoid relative overflow-hidden rounded-3xl md:rounded-[2.5rem] bg-[#110c0a] border border-white/5 mb-4 md:mb-8 animate-pulse ${heightClass}`}
              >
                <div className="absolute inset-0 bg-white/5"></div>
                <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 space-y-2">
                  <div className="w-16 h-2 md:h-3 bg-white/10 rounded-full"></div>
                  <div className="w-3/4 h-4 md:h-6 bg-white/10 rounded-full"></div>
                  <div className="w-1/3 h-3 md:h-4 bg-white/10 rounded-full mt-2"></div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 lg:py-12 px-5 md:px-12 max-w-[1600px] mx-auto relative z-10">
      {products.length === 0 ? (
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
        /* Organic Dynamic Heights Masonry Grid */
        <div className="columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-8">
          {products.map((item, index) => {
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
                className={`break-inside-avoid relative group cursor-pointer overflow-hidden rounded-3xl md:rounded-[2.5rem] bg-[#110c0a] border border-white/5 shadow-2xl transition-all duration-700 hover:shadow-[#c89666]/10 mb-4 md:mb-8 ${heightClass}`}
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
                  <div className="absolute inset-0 bg-linear-to-t from-[#050404]/80 via-[#050404]/20 to-transparent opacity-65 group-hover:opacity-90 transition-opacity duration-700 z-10"></div>

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
                        {String(item.price).startsWith('₦') ? item.price : `₦${item.price}`}
                      </p>

                      {/* Subtle Arrow Indicator (Desktop Only) */}
                      <div className="hidden md:flex w-8 h-8 rounded-full border border-white/20 items-center justify-center opacity-0 group-hover:opacity-100 transition-all delay-200">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
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
                      className="w-8 h-8 md:w-12 md:h-12 bg-white/5 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-[#c89666] hover:text-[#050404] hover:border-transparent transition-all duration-500 group/btn"
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
  );
}
