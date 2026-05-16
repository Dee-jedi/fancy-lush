"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@lush/ui";
import { useCart } from "@/context/CartContext";
import Link from 'next/link';
import { PRODUCTS } from '@/constants';
import { formatPrice } from '@/utils/formatPrice';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    // Simulating a fetch. Will hook up to Firebase later.
    const foundProduct = PRODUCTS.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white/10 border-t-[var(--primary)] rounded-full animate-spin"></div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-serif text-white">Product Not Found</h1>
          <Button onClick={() => window.location.href='/shop'} variant="outline" className="text-white border-white/20">Back to Collection</Button>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[var(--background)] overflow-hidden">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Product Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative w-full aspect-[4/5] rounded-[40px] overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary)]/20 to-[var(--secondary)]/20 mix-blend-overlay z-10"></div>
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute top-8 left-8 z-20">
              <span className="bg-black/50 backdrop-blur-xl px-6 py-2 rounded-full text-[10px] tracking-[0.3em] font-black uppercase text-white border border-white/10">
                {product.tag}
              </span>
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-10 relative"
          >
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-r from-[var(--primary)]/10 to-[var(--secondary)]/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
            
            <div className="space-y-4">
              <Link href="/shop" className="inline-flex items-center gap-2 text-[10px] tracking-widest uppercase font-black text-white/40 hover:text-[var(--primary)] transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back to Collection
              </Link>
              <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight">{product.name}</h1>
              <p className="text-3xl font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
                {formatPrice(product.price)}
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl">
              <p className="text-lg text-white/70 font-light leading-relaxed">
                {product.fullDescription}
              </p>
            </div>

            <div className="pt-4">
              <Button 
                onClick={handleAddToCart}
                variant="primary"
                size="lg"
                rounded="full"
                className={`w-full py-5 md:py-8 text-[13px] md:text-[14px] tracking-[0.3em] md:tracking-[0.4em] font-black uppercase transition-all duration-500 ${
                  added ? 'bg-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)]' : 'bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] shadow-xl'
                }`}
              >
                {added ? "ADDED TO CART ✓" : "ADD TO CART"}
              </Button>
            </div>
            
            <div className="flex items-center gap-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs text-white/50">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                Ships Globally
              </div>
              <div className="flex items-center gap-2 text-xs text-white/50">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                Secure Checkout
              </div>
            </div>
            
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
