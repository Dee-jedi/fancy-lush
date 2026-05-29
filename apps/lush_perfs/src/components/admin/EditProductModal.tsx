"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  onSuccess: () => void;
}

export const EditProductModal = ({ isOpen, onClose, product, onSuccess }: EditProductModalProps) => {
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(product?.price || '');
  const [description, setDescription] = useState(product?.description || '');

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return;
    setLoading(true);
    try {
      const productRef = doc(db, 'boutique_products', product.id);
      await updateDoc(productRef, {
        price,
        description,
        fullDescription: description || product.fullDescription,
        // search terms could be regenerated here if name/description change, keeping it simple
      });
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
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
            className="relative bg-[#110c0a] border border-[#c89666]/30 rounded-[24px] p-8 max-w-md w-full shadow-2xl"
          >
            <h3 className="text-xl font-serif text-[white] mb-6">Edit <span className="text-[#c89666]">{product.name}</span></h3>
            
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-[9px] font-black tracking-widest text-[white]/40 uppercase mb-2">Price</label>
                <input 
                  type="text" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-[white]/5 border border-[white]/10 rounded-2xl px-4 py-3 text-xs text-[white] focus:outline-none focus:border-[#c89666]/70"
                />
              </div>
              <div>
                <label className="block text-[9px] font-black tracking-widest text-[white]/40 uppercase mb-2">Description</label>
                <textarea 
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[white]/5 border border-[white]/10 rounded-2xl px-4 py-3 text-xs text-[white] focus:outline-none focus:border-[#c89666]/70 resize-none"
                />
              </div>
              
              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 bg-[white]/5 hover:bg-[white]/10 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-linear-to-r from-[#8e5e38] to-[#c89666] text-[#050404] rounded-full text-[10px] font-black uppercase tracking-widest transition-colors cursor-pointer disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
