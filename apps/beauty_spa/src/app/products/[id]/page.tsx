"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS } from "@/constants";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import Link from 'next/link';

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart, totalItems } = useCart();
  const product = PRODUCTS.find(p => p.id === id);

  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-serif">Product Not Found</h1>
          <Button href="/">Back to Home</Button>
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
    <main className="min-h-screen bg-[#faf9f6]">
      <Header />
      
      <div className="max-w-7xl mx-auto px-8 pt-48 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Product Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-square rounded-[60px] overflow-hidden shadow-2xl"
          >
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
            />
            <div className="absolute top-10 left-10">
              <span className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-full text-[10px] tracking-[0.2em] font-black uppercase text-[var(--primary)] shadow-sm">
                {product.tag}
              </span>
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <Link href="/" className="text-[10px] tracking-widest uppercase font-black text-[var(--secondary)] hover:opacity-70 transition-opacity">
                &larr; Back to Collection
              </Link>
              <h1 className="text-6xl md:text-7xl font-serif text-[var(--primary)] leading-tight">{product.name}</h1>
              <p className="text-2xl font-serif italic text-[var(--secondary)]">{product.price}</p>
            </div>

            <p className="text-xl text-[var(--foreground)]/60 font-light leading-relaxed">
              {product.fullDescription}
            </p>

            <div className="pt-8">
              <Button 
                onClick={handleAddToCart}
                className={`px-20 py-8 text-xs tracking-[0.4em] rounded-3xl shadow-xl transition-all duration-500 w-full sm:w-auto ${added ? 'bg-green-500 border-none' : ''}`}
              >
                {added ? "ADDED TO CART" : "ADD TO CART"}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
