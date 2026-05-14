import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { doc, deleteDoc, setDoc, increment } from 'firebase/firestore';
import { db } from '@lush/firebase';
import { useRouter } from 'next/navigation';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  product: any;
  onClose: () => void;
}

export const DeleteConfirmationModal = ({ isOpen, product, onClose }: DeleteConfirmationModalProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!product) return null;

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'products', product.id));
      // Decrement product counter
      await setDoc(doc(db, '_meta', 'productCount'), { count: increment(-1) }, { merge: true });
      router.push('/shop');
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-sm bg-white rounded-[32px] p-8 z-[110] shadow-2xl text-center"
          >
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </div>
            
            <h2 className="text-2xl font-serif text-[var(--primary)] mb-2">Delete Product?</h2>
            <p className="text-gray-500 text-sm mb-8">
              Are you sure you want to delete <strong>{product.name}</strong>? This action cannot be undone.
            </p>

            <div className="flex">
             
              <button 
                onClick={handleDelete}
                disabled={loading}
                className="w-full py-4 bg-red-500 hover:bg-red-600 text-white text-[12px] tracking-[0.2em] font-black uppercase rounded-3xl transition-colors disabled:opacity-50"
              >
                {loading ? 'DELETING...' : 'DELETE'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
