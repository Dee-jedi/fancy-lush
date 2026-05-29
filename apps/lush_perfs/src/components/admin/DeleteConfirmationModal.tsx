"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  productName: string;
}

export const DeleteConfirmationModal = ({ isOpen, onClose, productId, productName }: DeleteConfirmationModalProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!db) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'boutique_products', productId));
      // Optional: Delete images from storage here if needed
      onClose();
      router.push('/');
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-120 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#050404]/90 backdrop-blur-md"
          />
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            className="relative bg-[#110c0a] border border-red-500/30 rounded-[24px] p-8 max-w-sm w-full shadow-2xl"
          >
            <h3 className="text-xl font-serif text-[white] mb-2">Delete Product</h3>
            <p className="text-sm text-[white]/60 mb-6">
              Are you sure you want to delete <strong className="text-[white]">{productName}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={onClose}
                className="flex-1 py-3 bg-[white]/5 hover:bg-[white]/10 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 py-3 bg-red-500/20 hover:bg-red-500/40 text-red-500 border border-red-500/50 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
