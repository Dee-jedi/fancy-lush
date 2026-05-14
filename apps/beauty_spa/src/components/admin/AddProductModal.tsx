"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { useAddProduct } from '@/hooks/useAddProduct';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AddProductModal = ({ isOpen, onClose, onSuccess }: AddProductModalProps) => {
  const { loading, formData, setFormData, setImageFile, handleSubmit } = useAddProduct(onSuccess, onClose);

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
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-lg bg-white rounded-[32px] p-6 md:p-8 z-[110] shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-3xl font-serif text-[var(--primary)] mb-6">Add New Product</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium tracking-widest text-gray-500 uppercase mb-2">Product Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--secondary)] text-gray-800"
                  placeholder="e.g. Lavender Body Oil"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium tracking-widest text-gray-500 uppercase mb-2">Category Tag</label>
                  <input 
                    type="text" 
                    required
                    value={formData.tag}
                    onChange={(e) => setFormData({...formData, tag: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--secondary)] text-gray-800"
                    placeholder="e.g. Skin Care"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium tracking-widest text-gray-500 uppercase mb-2">Price (₦)</label>
                  <input 
                    type="number" 
                    required
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--secondary)] text-gray-800"
                    placeholder="e.g. 12000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium tracking-widest text-gray-500 uppercase mb-2">Short Description</label>
                <input 
                  type="text" 
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--secondary)] text-gray-800"
                  placeholder="Appears on shop grid"
                />
              </div>

              <div>
                <label className="block text-xs font-medium tracking-widest text-gray-500 uppercase mb-2">Full Description</label>
                <textarea 
                  required
                  rows={3}
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({...formData, fullDescription: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--secondary)] text-gray-800 resize-none"
                  placeholder="Detailed description for the product page"
                />
              </div>

              <div>
                <label className="block text-xs font-medium tracking-widest text-gray-500 uppercase mb-2">Product Image</label>
                <input 
                  type="file" 
                  accept="image/*"
                  required
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[var(--primary)]/10 file:text-[var(--primary)] hover:file:bg-[var(--primary)]/20"
                />
              </div>

              <div className="pt-6">
                
                <Button variant="primary" className="w-full py-3" type="submit" disabled={loading}>
                  {loading ? 'SAVING...' : 'SAVE'}
                </Button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
