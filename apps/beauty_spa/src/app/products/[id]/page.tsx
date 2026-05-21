"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import Link from 'next/link';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@lush/firebase';
import { useAuth } from '@/context/AuthContext';
import { EditProductModal } from '@/components/admin/EditProductModal';
import { DeleteConfirmationModal } from '@/components/admin/DeleteConfirmationModal';
import { formatPrice } from '@/utils/formatPrice';
export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart, totalItems } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user, role } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    if (!id || typeof id !== 'string') return;
    try {
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct({ id: docSnap.id, ...docSnap.data() });
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const [added, setAdded] = useState(false);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf9f6] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-100 border-t-[var(--secondary)] rounded-full animate-spin"></div>
      </main>
    );
  }

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
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
            />
            {product.tag && (
              <div className="absolute top-10 left-10">
                <span className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-full text-[10px] tracking-[0.2em] font-black uppercase text-[var(--primary)] shadow-sm">
                  {product.tag}
                </span>
              </div>
            )}
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
              <p className="text-2xl font-serif italic text-[var(--secondary)]">{formatPrice(product.price)}</p>
            </div>

            <p className="text-xl text-[var(--foreground)]/60 font-light leading-relaxed">
              {product.fullDescription}
            </p>

            <div className="pt-8 inline-flex flex-col w-full sm:w-auto">
              <Button 
                onClick={handleAddToCart}
                className={`px-20 py-8 text-xs tracking-[0.4em] rounded-3xl shadow-xl transition-all duration-500 w-full sm:w-auto ${added ? 'bg-green-500 border-none' : ''}`}
              >
                {added ? "ADDED TO CART" : "ADD TO CART"}
              </Button>

              {user && role === 'admin' && (
                <div className="my-6 flex items-center justify-center gap-6 text-xs tracking-[0.2em] font-black w-full">
                  <button 
                    onClick={() => setIsEditModalOpen(true)}
                    className="text-gray-500 hover:text-[var(--secondary)] transition-colors"
                  >
                    Edit Product
                  </button>
                  <span className="text-gray-300">|</span>
                  <button 
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="text-red-400 hover:text-red-600 transition-colors"
                  >
                    Delete Product
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
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
    </main>
  );
}
