"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Image from 'next/image';
import Link from 'next/link';
import { EditProductModal } from '@/components/admin/EditProductModal';
import { DeleteConfirmationModal } from '@/components/admin/DeleteConfirmationModal';
import { ImageModal } from '@/components/ui/ImageModal';

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { role } = useAuth();
  const [added, setAdded] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      if (db) {
        try {
          const cleanId = decodeURIComponent(id as string).trim();
          const docRef = doc(db, 'boutique_products', cleanId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProduct({ id: docSnap.id, ...docSnap.data() });
          } else {
            setProduct(null);
          }
        } catch (error) {
          console.error("Error fetching product:", error);
          setProduct(null);
        }
      } else {
        setProduct(null);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050404] pb-28 lg:pb-12">
        <Header />
        <div className="max-w-7xl mx-auto px-6 pt-36 pb-24 animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Skeleton */}
            <div className="aspect-4/5 rounded-[3rem] bg-[#110c0a] border border-[white]/5 w-full"></div>
            
            {/* Text Details Skeleton */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="h-3 bg-white/10 rounded w-24"></div>
                <div className="h-2 bg-white/10 rounded w-16"></div>
                <div className="h-12 bg-white/10 rounded w-3/4"></div>
                <div className="h-8 bg-white/10 rounded w-1/3"></div>
              </div>
              <div className="space-y-2 pt-4">
                <div className="h-3 bg-white/10 rounded w-full"></div>
                <div className="h-3 bg-white/10 rounded w-5/6"></div>
                <div className="h-3 bg-white/10 rounded w-4/6"></div>
              </div>
              <div className="bg-[#110c0a]/50 border border-[white]/5 rounded-4xl p-6 space-y-4">
                <div className="h-2 bg-white/10 rounded w-32"></div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="h-8 bg-white/10 rounded w-full"></div>
                  <div className="h-8 bg-white/10 rounded w-full"></div>
                </div>
              </div>
              <div className="pt-6">
                <div className="h-12 bg-white/10 rounded-full w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-[#050404] flex items-center justify-center text-[white]">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-serif">Product Not Found</h1>
          <Link href="/">
            <button className="px-8 py-3.5 bg-linear-to-r from-[#8e5e38] via-[#c89666] to-[#f5d6c6] text-[#050404] text-[9px] tracking-widest font-black uppercase rounded-full shadow-lg cursor-pointer">
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

  const refreshProduct = async () => {
    if (!db) return;
    const docSnap = await getDoc(doc(db, 'boutique_products', product.id));
    if (docSnap.exists()) {
      setProduct({ id: docSnap.id, ...docSnap.data() });
    }
  };

  return (
    <main className="min-h-screen bg-[#050404] text-[white] pb-28 lg:pb-12">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 pt-36 pb-24">


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Product Image Frame */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            onClick={() => setIsImageModalOpen(true)}
            className="relative aspect-4/5 rounded-[3rem] overflow-hidden border border-[white]/5 shadow-2xl bg-[#110c0a] cursor-zoom-in"
          >
            <div className="absolute inset-0 bg-linear-to-t from-[#050404]/60 via-transparent to-transparent z-10 pointer-events-none"></div>
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
                {product.tag || 'Boutique'}
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
              <span className="text-[8px] tracking-[0.3em] font-black uppercase text-[white]/30 block">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[white] leading-tight">{product.name}</h1>
              <p className="text-2xl font-serif italic font-black text-transparent bg-clip-text bg-linear-to-r from-[#8e5e38] via-[#c89666] to-[#f5d6c6]">
                {String(product.price).startsWith('₦') ? product.price : `₦${product.price}`}
              </p>
            </div>

            <p className="text-xs md:text-sm text-[white]/50 font-light leading-relaxed">
              {product.fullDescription}
            </p>

            {/* Specifications Grid */}
            <div className="bg-[#110c0a]/50 border border-[white]/5 rounded-4xl p-6 shadow-xl space-y-4">
              <h3 className="text-[9px] tracking-widest uppercase font-black text-[#c89666]">Atelier Specifications</h3>
              <div className="grid grid-cols-2 gap-6 text-[10px]">
                <div className="space-y-1">
                  <span className="text-[white]/30 block uppercase tracking-wider">Category</span>
                  <span className="font-medium text-[white]/80 capitalize">{product.category}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[white]/30 block uppercase tracking-wider">Availability</span>
                  <span className="font-medium text-emerald-400">In Stock</span>
                </div>
              </div>
            </div>

            {/* Shopping Action */}
            <div className="pt-6 space-y-4">
              <button 
                onClick={handleAddToCart}
                className={`w-full py-4.5 text-[9px] tracking-widest font-black uppercase rounded-full shadow-2xl transition-all duration-500 hover:scale-105 active:scale-95 cursor-pointer ${
                  added 
                    ? 'bg-emerald-500 text-[white] border-none' 
                    : 'bg-linear-to-r from-[#8e5e38] via-[#c89666] to-[#f5d6c6] text-[#050404]'
                }`}
              >
                {added ? "ADDED TO BAG" : "ADD TO SELECTION BAG"}
              </button>

              {role === 'admin' && (
                <div className="flex gap-4 pt-4 border-t border-[white]/5">
                  <button 
                    onClick={() => setIsEditOpen(true)}
                    className="flex-1 py-3.5 bg-[white]/5 hover:bg-[white]/10 rounded-full text-[9px] tracking-[0.2em] font-black uppercase text-[white] transition-colors cursor-pointer border border-[white]/10"
                  >
                    EDIT PRODUCT
                  </button>
                  <button 
                    onClick={() => setIsDeleteOpen(true)}
                    className="flex-1 py-3.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-full text-[9px] tracking-[0.2em] font-black uppercase text-red-500 transition-colors cursor-pointer"
                  >
                    DELETE PRODUCT
                  </button>
                </div>
              )}
            </div>

          </motion.div>
        </div>
      </div>

      <div className="hidden lg:block">
        <Footer />
      </div>

      <EditProductModal 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        product={product} 
        onSuccess={refreshProduct} 
      />
      <DeleteConfirmationModal 
        isOpen={isDeleteOpen} 
        onClose={() => setIsDeleteOpen(false)} 
        productId={product.id} 
        productName={product.name} 
      />

      <ImageModal 
        isOpen={isImageModalOpen} 
        onClose={() => setIsImageModalOpen(false)} 
        imageSrc={product.image} 
        altText={product?.name || 'Product Image'} 
      />
    </main>
  );
}
