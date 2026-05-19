"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import Link from 'next/link';
import { formatPrice } from '@/utils/formatPrice';
import { useInfiniteProducts } from '@/hooks/useInfiniteProducts';
import { useSearch } from '@/context/SearchContext';

export default function ShopPage() {
  const { addToCart } = useCart();
  const { products, loading, loadingMore, hasMore, observerRef } = useInfiniteProducts(12);
  const { searchQuery, setSearchQuery } = useSearch();

  // Instant luxury client-side search filtering
  const filteredProducts = products.filter(product => {
    if (!searchQuery.trim()) return true;
    const queryText = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(queryText) ||
      product.tag.toLowerCase().includes(queryText)
    );
  });

  return (
    <main className="min-h-screen bg-[#faf9f6]">
      {/* Unified Luxury Sticky Header (Slim, space-saving, and highly premium) */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#faf9f6]/90 backdrop-blur-2xl border-b border-gray-100/40 px-6 py-4 flex flex-col gap-3 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          {/* Minimal Back Button & Brand */}
          <Link href="/" className="flex items-center gap-2 group">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--primary)] group-hover:-translate-x-1 transition-transform">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase font-black text-[var(--primary)] mt-0.5">
              Fancylush
            </span>
          </Link>

          {/* Elegant Page Tag */}
          <span className="text-[8px] md:text-[9px] tracking-[0.2em] font-black uppercase text-[var(--secondary)] bg-[var(--secondary)]/10 px-2.5 py-1 rounded-full">
            Boutique
          </span>
        </div>

        {/* Slim, Minimalist Search Input */}
        <div className="relative w-full max-w-xl mx-auto mt-1">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[var(--secondary)]/60">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search boutique essentials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-2.5 bg-black/[0.02] border border-black/[0.04] rounded-full text-[var(--primary)] placeholder-gray-400 text-xs focus:outline-none focus:bg-white focus:border-[var(--secondary)] focus:ring-0 transition-all duration-300 font-light shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-[var(--secondary)] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>
      </header>

      {/* Product Grid (pt-36 provides the perfect, clean breathing room below the slim sticky header) */}
      <section className="pt-36 pb-24 px-4 md:px-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-gray-100 border-t-[var(--secondary)] rounded-full animate-spin"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-32 text-gray-400 font-serif text-xl italic">
            {searchQuery ? "No matching luxury essentials found." : "No products available yet."}
          </div>
        ) : (
          /* Fixed: Removed space-y-6 md:space-y-12 to prevent column alignment bugs. Vertical margins are managed purely by child margins. */
          <div className="max-w-7xl mx-auto columns-2 lg:columns-3 xl:columns-4 gap-3 md:gap-8">
            {filteredProducts.map((product, index) => {
              // Proportional and substantial heights, boosted so the smallest cards are robust and the tallest cards have beautiful visual impact
              const heights = [
                "h-[250px] md:h-[380px]",
                "h-[180px] md:h-[260px]",
                "h-[300px] md:h-[450px]",
                "h-[210px] md:h-[310px]",
                "h-[270px] md:h-[400px]",
                "h-[190px] md:h-[280px]",
                "h-[320px] md:h-[480px]",
                "h-[230px] md:h-[340px]",
                "h-[280px] md:h-[420px]"
              ];
              const heightClass = heights[index % heights.length];

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % 4) * 0.1 }}
                  className="break-inside-avoid relative group cursor-pointer flex flex-col mb-6 md:mb-10"
                >
                  <Link href={`/products/${product.id}`} className="block w-full">
                    {/* Image Card Container (Tighter Pinterest Proportions) */}
                    <div className={`relative w-full overflow-hidden rounded-[24px] md:rounded-[40px] bg-white border border-gray-100/50 shadow-sm group-hover:shadow-xl transition-all duration-700 ${heightClass}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />

                      {/* Floating Category Pill Badge (Wider max-width for cleaner category display) */}
                      <div className="absolute top-3 left-3 md:top-5 md:left-5 z-20">
                        <span className="bg-white/95 backdrop-blur-md px-2 md:px-3 py-1 md:py-1.5 rounded-full text-[7px] md:text-[9px] font-black uppercase tracking-[0.1em] md:tracking-[0.2em] text-[var(--primary)] border border-gray-100 shadow-sm block max-w-[80px] md:max-w-[120px] truncate text-center">
                          {product.tag}
                        </span>
                      </div>

                      {/* Quick Add to Cart Button */}
                      <div className="absolute top-3 right-3 md:top-6 md:right-6 z-20">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToCart(product);
                          }}
                          className="w-8 h-8 md:w-12 md:h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg text-[var(--primary)] hover:bg-[var(--secondary)] hover:text-white transition-all duration-300 border border-white/40 group/btn"
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
                            className="md:group-hover/btn:scale-110 transition-transform"
                          >
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* High-Contrast, Larger Text Details Below Card */}
                    <div className="pt-3 md:pt-5 px-1.5 flex justify-between items-start gap-4 w-full">
                      {/* Left Column: Truncated Product Name */}
                      <div className="min-w-0 flex-1 text-left">
                        <h3 className="text-[13px] md:text-xl font-serif text-[var(--primary)] group-hover:text-[var(--secondary)] transition-colors duration-500 truncate w-full leading-snug">
                          {product.name}
                        </h3>
                      </div>

                      {/* Right Column: Price aligned on one line in beautiful bold rose gold */}
                      <span className="text-[11px] md:text-lg font-serif font-bold italic text-[var(--secondary)] whitespace-nowrap pt-0.5">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Infinite Scroll Trigger & Bottom Spinner (Deferred during searches) */}
        {!searchQuery && (
          <div ref={observerRef} className="py-16 flex flex-col items-center justify-center w-full mt-10">
            {loadingMore && (
              <div className="w-10 h-10 border-4 border-gray-100 border-t-[var(--secondary)] rounded-full animate-spin"></div>
            )}
            {!hasMore && products.length > 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                className="text-[9px] md:text-[11px] tracking-[0.3em] uppercase font-black text-[var(--primary)] text-center"
              >
                All luxury essentials loaded
              </motion.p>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
