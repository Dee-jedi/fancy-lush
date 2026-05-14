"use client";

import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import Link from 'next/link';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@lush/firebase';
import { formatPrice } from '@/utils/formatPrice';

export default function ShopPage() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-[#faf9f6]">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-48 pb-20 px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-8">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[var(--secondary)] text-xs tracking-[0.4em] font-black uppercase"
          >
            The Boutique
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-serif font-medium text-[var(--primary)] leading-tight"
          >
            Luxury <span className="italic font-light text-[var(--secondary)]">Essentials</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-[var(--foreground)]/40 max-w-2xl font-light leading-relaxed"
          >
            Extend your spa experience with our exclusive range of high-performance skincare and beauty products.
          </motion.p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {loading ? (
            <div className="col-span-full flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-gray-100 border-t-[var(--secondary)] rounded-full animate-spin"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="col-span-full text-center py-20 text-gray-400 font-serif text-xl italic">No products available yet.</div>
          ) : products.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/products/${product.id}`} className="group block">
                <div className="relative aspect-square rounded-[40px] overflow-hidden mb-8 bg-white border border-gray-100 shadow-sm group-hover:shadow-xl transition-all duration-700">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  {/* Quick Add to Cart Button */}
                  <div className="absolute top-6 right-6 z-10">
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg text-[var(--primary)] hover:bg-[var(--secondary)] hover:text-white transition-all duration-300 border border-white/40"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="space-y-2 text-center">
                  <p className="text-[10px] tracking-[0.2em] uppercase font-black text-[var(--secondary)]">{product.tag}</p>
                  <h3 className="text-xl font-serif text-[var(--primary)]">{product.name}</h3>
                  <p className="font-serif italic text-[var(--foreground)]/60">{formatPrice(product.price)}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Minimal Footer */}
      <section className="py-20 border-t border-gray-100 text-center">
        <Button variant="outline" href="/" className="px-12">
          Return Home
        </Button>
      </section>
    </main>
  );
}
