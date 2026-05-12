"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Button } from "../ui/Button";
import { motion } from "framer-motion";
import { PRODUCTS } from "@/constants";

export const Products = () => {
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);
  const innerCarousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measure = () => {
      if (innerCarousel.current && carousel.current) {
        setWidth(innerCarousel.current.scrollWidth - carousel.current.offsetWidth);
      }
    };
    const observer = new ResizeObserver(measure);
    if (innerCarousel.current) observer.observe(innerCarousel.current);
    const timer = setTimeout(measure, 500);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section id="products" className="py-40 bg-[#faf9f6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 mb-20">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <span className="text-[var(--secondary)] text-xs tracking-[0.4em] font-black uppercase">Cosmetic Line</span>
            <h2 className="text-6xl md:text-7xl font-serif font-medium text-[var(--primary)] leading-tight tracking-tight">
              The <span className="italic font-light text-[var(--secondary)]">Collection</span>
            </h2>
          </motion.div>
          <div className="hidden md:block">
             <p className="text-lg text-[var(--foreground)]/40 max-w-sm font-light leading-relaxed">
               Discover our range of dermatologist-approved formulas designed for a professional glow at home.
             </p>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div className="relative group">
        <motion.div ref={carousel} className="cursor-grab active:cursor-grabbing overflow-hidden">
          <motion.div 
            ref={innerCarousel}
            drag="x" 
            dragConstraints={{ right: 0, left: -width }}
            whileTap={{ cursor: "grabbing" }}
            className="flex gap-8 px-8"
          >
            {PRODUCTS.map((product, i) => (
              <motion.div 
                key={i} 
                className="min-w-[320px] md:min-w-[420px] bg-white rounded-[50px] overflow-hidden group border border-gray-100 hover:shadow-2xl transition-all duration-700 pointer-events-none sm:pointer-events-auto"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    draggable="false"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 select-none"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/80 backdrop-blur-md px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-[var(--primary)] border border-gray-100 shadow-sm">
                      {product.tag}
                    </span>
                  </div>
                </div>
                <div className="p-10 space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-serif font-medium text-[var(--primary)]">{product.name}</h3>
                    <span className="text-[var(--secondary)] font-bold">{product.price}</span>
                  </div>
                  <Button variant="secondary" className="w-full py-4 text-[10px] tracking-widest uppercase rounded-2xl shadow-lg pointer-events-auto">
                    Add to Cart
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Static Pagination Dots */}
        <div className="flex justify-center gap-2 mt-12">
          <div className="w-12 h-1.5 rounded-full bg-[var(--primary)]" />
          <div className="w-2 h-1.5 rounded-full bg-[var(--primary)]/10" />
          <div className="w-2 h-1.5 rounded-full bg-[var(--primary)]/10" />
        </div>

        {/* See More Button */}
        <div className="mt-20 text-center">
          <Button variant="outline" className="px-12 py-5 border-[var(--primary)]/10 text-[var(--primary)] font-bold">
            View Full Collection
          </Button>
        </div>
      </div>
    </section>
  );
};
