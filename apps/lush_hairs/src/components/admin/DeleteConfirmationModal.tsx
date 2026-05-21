"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { doc, deleteDoc, setDoc, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useSearch } from '@/context/SearchContext';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  product: any;
  onClose: () => void;
}

export const DeleteConfirmationModal = ({ isOpen, product, onClose }: DeleteConfirmationModalProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { removeProductFromCache } = useSearch();

  if (!product) return null;

  const handleDelete = async () => {
    if (!db || !product) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'hair_products', product.id));
      // Decrement product counter
      await setDoc(doc(db, '_meta', 'hairProductCount'), { count: increment(-1) }, { merge: true });
      
      // Evict from cache
      removeProductFromCache(product.id);
      
      router.push('/shop');
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product: " + (error instanceof Error ? error.message : "Unknown error"));
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Glassmorphic Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
          />
          
          {/* Modal Centering Wrapper */}
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 pointer-events-none">
            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto w-full max-w-sm bg-[#090d16]/95 backdrop-blur-2xl rounded-[32px] p-8 border border-white/10 shadow-[0_0_50px_rgba(239,68,68,0.15)] text-center relative"
            >
              {/* Premium Trash/Alert Icon */}
              <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </div>
              
              <span className="text-[8px] tracking-[0.4em] font-black uppercase text-red-500 block mb-1">
                Danger Zone
              </span>
              <h2 className="text-2xl font-serif text-white mb-3">
                Remove <span className="italic text-red-400">Premium Hair?</span>
              </h2>
              <p className="text-white/60 text-xs font-light leading-relaxed mb-8">
                Are you sure you want to permanently delete <strong className="text-white font-medium">{product.name}</strong> from the boutique inventory? This action cannot be undone.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleDelete}
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white text-[10px] tracking-[0.2em] font-black uppercase rounded-2xl transition-all cursor-pointer shadow-lg disabled:opacity-50"
                >
                  {loading ? 'DELETING FROM BOUTIQUE...' : 'DELETE PRODUCT'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] tracking-[0.2em] font-black uppercase text-white transition-all cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
