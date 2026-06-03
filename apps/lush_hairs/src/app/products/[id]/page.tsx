"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@lush/ui";
import { useCart } from "@/context/CartContext";
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/utils/formatPrice';
import { db } from '@/lib/firebase';
import { doc, getDoc, deleteDoc, setDoc, increment } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { EditProductModal } from '@/components/admin/EditProductModal';
import { DeleteConfirmationModal } from '@/components/admin/DeleteConfirmationModal';
import { useSearch } from '@/context/SearchContext';
import { ImageModal } from '@/components/ui/ImageModal';

const REVALIDATE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { user, role } = useAuth();
  const { products } = useSearch();
  const productsRef = useRef(products);
  productsRef.current = products;
  const lastFetchedRef = useRef<number>(0);
  const cachedInitialItem = products.find((p: any) => p.id === id);
  const [product, setProduct] = useState<any>(cachedInitialItem || null);
  const [activeImage, setActiveImage] = useState<string>(cachedInitialItem?.images?.[0] || cachedInitialItem?.image || '');
  const [loading, setLoading] = useState(!cachedInitialItem);
  const [added, setAdded] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const fetchProduct = async (showLoader = true) => {
    if (!db || !id) {
      setLoading(false);
      return;
    }
    
    if (showLoader) {
      setLoading(true);
    }
    
    try {
      const docRef = doc(db, 'hair_products', id as string);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProduct({ id: docSnap.id, ...data });
        setActiveImage(prev => prev || data.images?.[0] || data.image || '');
        lastFetchedRef.current = Date.now();
      } else {
        setProduct(null);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      if (showLoader) {
        setProduct(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cachedItem = productsRef.current.find(p => p.id === id);
    if (cachedItem) {
      setProduct(cachedItem);
      setActiveImage(cachedItem.images?.[0] || cachedItem.image || '');
      setLoading(false);
      // Only revalidate if cache is stale (older than 5 minutes)
      const isStale = Date.now() - lastFetchedRef.current > REVALIDATE_TTL_MS;
      if (isStale) {
        fetchProduct(false);
      }
    } else {
      // Cache miss: show full loader
      fetchProduct(true);
    }
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-(--background) flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white/10 border-t-(--primary) rounded-full animate-spin"></div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-(--background) flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-serif text-white">Product Not Found</h1>
          <Link href="/shop">
            <Button variant="outline" className="text-white border-white/20 cursor-pointer">Back to Collection</Button>
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

  const handleDeleteProduct = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-(--background) overflow-hidden">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Product Image & Gallery */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setIsImageModalOpen(true)}
              className="relative w-full aspect-4/5 rounded-[40px] overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] group cursor-zoom-in"
            >
              <div className="absolute inset-0 bg-linear-to-tr from-(--primary)/20 to-(--secondary)/20 mix-blend-overlay z-10"></div>
              {activeImage && (
                <Image 
                  key={activeImage}
                  src={activeImage} 
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              )}
            </motion.div>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 overflow-x-auto py-2 scrollbar-none"
              >
                {product.images.map((imgUrl: string, idx: number) => {
                  const isActive = activeImage === imgUrl;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(imgUrl)}
                      className={`relative w-20 h-20 rounded-2xl overflow-hidden border transition-all duration-300 shrink-0 cursor-pointer ${
                        isActive 
                          ? 'border-(--primary) shadow-[0_0_15px_rgba(139,92,246,0.3)] scale-[1.05]' 
                          : 'border-white/10 hover:border-white/30 hover:scale-[1.02]'
                      }`}
                    >
                      <Image 
                        src={imgUrl} 
                        alt={`${product.name} angle ${idx + 1}`}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                      {isActive && (
                        <div className="absolute inset-0 border-2 border-(--primary) rounded-2xl pointer-events-none" />
                      )}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </div>

          {/* Product Details */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-10 relative"
          >
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-linear-to-r from-(--primary)/10 to-(--secondary)/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
            
            <div className="space-y-4">
              <Link href="/shop" className="inline-flex items-center gap-2 text-[10px] tracking-widest uppercase font-black text-white/40 hover:text-(--primary) transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back to Collection
              </Link>
              <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight">{product.name}</h1>
              
              <div className="flex flex-wrap items-center gap-6">
                <p className="text-3xl font-sans font-bold text-transparent bg-clip-text bg-linear-to-r from-(--primary) to-(--secondary)">
                  {formatPrice(product.price)}
                </p>

                {product.color && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs text-white/80 font-medium">
                    <span className="w-2 h-2 rounded-full bg-linear-to-r from-(--primary) to-(--secondary)"></span>
                    Color: <span className="font-bold text-white">{product.color}</span>
                  </div>
                )}

                {product.size && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs text-white/80 font-medium">
                    <span className="w-2 h-2 rounded-full bg-linear-to-r from-(--primary) to-(--secondary)"></span>
                    Size / Length: <span className="font-bold text-white">{product.size}</span>
                  </div>
                )}
              </div>
            </div>

            {product.fullDescription && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl">
                <p className="text-lg text-white/70 font-light leading-relaxed">
                  {product.fullDescription}
                </p>
              </div>
            )}

            <div className="pt-4">
              <Button 
                onClick={handleAddToCart}
                variant="primary"
                size="lg"
                rounded="full"
                className={`w-full py-5 md:py-8 text-[13px] md:text-[14px] tracking-[0.3em] md:tracking-[0.4em] font-black uppercase transition-all duration-500 ${
                  added ? 'bg-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)]' : 'bg-linear-to-r from-(--primary) to-(--secondary) shadow-xl'
                }`}
              >
                {added ? "ADDED TO CART ✓" : "ADD TO CART"}
              </Button>
            </div>

            {user && role === 'admin' && (
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-center gap-6 text-[10px] tracking-[0.2em] font-black w-full">
                <button 
                  onClick={() => setIsEditModalOpen(true)}
                  className="text-white/40 hover:text-(--primary) transition-all cursor-pointer hover:scale-105 duration-300"
                >
                  EDIT PRODUCT
                </button>
                <span className="text-white/10">|</span>
                <button 
                  onClick={handleDeleteProduct}
                  className="text-red-500/60 hover:text-red-500 transition-all cursor-pointer hover:scale-105 duration-300"
                >
                  DELETE PRODUCT
                </button>
              </div>
            )}
            
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
      {/* Hide footer on mobile view, show only on desktop */}
      <div className="hidden lg:block">
        <Footer />
      </div>

      <EditProductModal 
        isOpen={isEditModalOpen} 
        product={product} 
        onClose={() => setIsEditModalOpen(false)} 
        onSuccess={fetchProduct} 
      />

      <DeleteConfirmationModal 
        isOpen={isDeleteModalOpen} 
        product={product} 
        onClose={() => setIsDeleteModalOpen(false)} 
      />

      <ImageModal 
        isOpen={isImageModalOpen} 
        onClose={() => setIsImageModalOpen(false)} 
        imageSrc={activeImage} 
        altText={product?.name || 'Product Image'} 
      />
    </main>
  );
}
