"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Button } from "../ui/Button";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import Link from 'next/link';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@lush/firebase';
import { formatPrice } from '@/utils/formatPrice';

export const Products = () => {
  const { addToCart } = useCart();
  const [width, setWidth] = useState(0);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const carousel = useRef<HTMLDivElement>(null);
  const innerCarousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(
          collection(db, 'products'),
          orderBy('createdAt', 'desc'),
          limit(6)
        );
        const querySnapshot = await getDocs(q);
        const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching landing products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
  }, [products]);

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
            dragElastic={0.2}
            whileTap={{ cursor: "grabbing" }}
            className="flex gap-8 px-8 xl:px-[calc((100vw-1280px)/2+32px)] py-12 touch-pan-y"
          >
            {loading ? (
              <div className="flex gap-8 px-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex-none w-[280px] md:w-[360px] aspect-square bg-gray-100 rounded-[40px] animate-pulse" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="w-full text-center py-20 text-gray-400 font-serif italic">New arrivals coming soon.</div>
            ) : products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.05 }}
              className="flex-none w-[280px] md:w-[360px] bg-white rounded-[40px] overflow-hidden group border border-gray-100/50 shadow-sm hover:shadow-xl transition-all duration-700 py-0"
            >
              <Link href={`/products/${product.id}`} className="block">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    draggable="false"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 select-none"
                  />
                  <div className="absolute top-5 left-5">
                    <span className="bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-[var(--primary)] border border-gray-100 shadow-sm">
                      {product.tag}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-center gap-4">
                    <h3 className="text-xl font-serif font-medium text-[var(--primary)] group-hover:text-[var(--secondary)] transition-colors duration-500 truncate">
                      {product.name}
                    </h3>
                    <span className="text-[var(--secondary)] font-bold font-serif italic whitespace-nowrap tracking-tight">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
            {/* Spacer for right margin */}
            <div className="min-w-[32px] md:min-w-[100px] h-full" />
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
          <Button 
            href="/shop"
            variant="outline" 
            className="px-12 py-5 border-[var(--primary)]/10 text-[var(--primary)] font-bold"
          >
            View Full Collection
          </Button>
        </div>
      </div>
    </section>
  );
};
