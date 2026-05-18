"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/constants";
import Image from 'next/image';
import Link from 'next/link';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#050404] flex items-center justify-center text-white">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-serif">Product Not Found</h1>
          <Link href="/">
            <button className="px-8 py-3.5 bg-gradient-to-r from-[#8e5e38] via-[#c89666] to-[#f5d6c6] text-[#050404] text-[9px] tracking-widest font-black uppercase rounded-full shadow-lg">
              Back to Boutique
            </button>
          </Link>
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
    <main className="min-h-screen bg-[#050404] text-white pb-28 lg:pb-12">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 pt-36 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Product Image Frame */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl bg-[#110c0a]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#050404]/60 via-transparent to-transparent z-10 pointer-events-none"></div>
            <Image 
              src={product.image} 
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="w-full h-full object-cover transition-transform duration-[2s] ease-out hover:scale-105"
            />
            <div className="absolute top-8 left-8 z-20">
              <span className="bg-[#050404]/85 backdrop-blur-md px-5 py-2.5 rounded-full text-[8px] tracking-[0.25em] font-black uppercase text-[#c89666] border border-[#c89666]/35 shadow-md">
                {product.tag}
              </span>
            </div>
          </motion.div>

          {/* Product Details Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <Link href="/" className="text-[10px] tracking-widest uppercase font-black text-[#c89666] hover:opacity-75 transition-opacity inline-flex items-center gap-2">
                &larr; Back to Boutique
              </Link>
              <span className="text-[8px] tracking-[0.3em] font-black uppercase text-white/30 block">
                {product.category === "jewelry" ? "Fine Jewelry" : "Luxury Fragrance"}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight">{product.name}</h1>
              <p className="text-2xl font-serif italic font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8e5e38] via-[#c89666] to-[#f5d6c6]">
                {product.price}
              </p>
            </div>

            <p className="text-xs md:text-sm text-white/50 font-light leading-relaxed">
              {product.fullDescription}
            </p>

            {/* Specifications Grid */}
            <div className="bg-[#110c0a]/50 border border-white/5 rounded-[2rem] p-6 shadow-xl space-y-4">
              <h3 className="text-[9px] tracking-widest uppercase font-black text-[#c89666]">Atelier Specifications</h3>
              <div className="grid grid-cols-2 gap-6 text-[10px]">
                {product.category === "jewelry" ? (
                  <>
                    <div className="space-y-1">
                      <span className="text-white/30 block uppercase tracking-wider">Metal Type</span>
                      <span className="font-medium text-white/80">18K Solid Yellow Gold</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-white/30 block uppercase tracking-wider">Assembly</span>
                      <span className="font-medium text-white/80">Handmade in Atelier</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-1">
                      <span className="text-white/30 block uppercase tracking-wider">Concentration</span>
                      <span className="font-medium text-white/80">Eau de Parfum Extract</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-white/30 block uppercase tracking-wider">Longevity</span>
                      <span className="font-medium text-white/80">12+ Hours Sillage</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Shopping Action */}
            <div className="pt-6">
              <button 
                onClick={handleAddToCart}
                className={`px-16 py-4.5 text-[9px] tracking-widest font-black uppercase rounded-full shadow-2xl transition-all duration-500 hover:scale-105 active:scale-95 ${
                  added 
                    ? 'bg-emerald-500 text-white border-none' 
                    : 'bg-gradient-to-r from-[#8e5e38] via-[#c89666] to-[#f5d6c6] text-[#050404]'
                }`}
              >
                {added ? "ADDED TO BAG" : "ADD TO SELECTION BAG"}
              </button>
            </div>

          </motion.div>
        </div>
      </div>


      <div className="hidden lg:block">
        <Footer />
      </div>
    </main>
  );
}
