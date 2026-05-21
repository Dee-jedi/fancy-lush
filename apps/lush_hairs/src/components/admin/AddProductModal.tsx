"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@lush/ui';
import { useAddProduct } from '@/hooks/useAddProduct';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AddProductModal = ({ isOpen, onClose, onSuccess }: AddProductModalProps) => {
  const { loading, formData, setFormData, imageFiles, setImageFiles, handleSubmit } = useAddProduct(onSuccess, onClose);
  const [previews, setPreviews] = useState<(string | null)[]>([null, null, null, null]);
  const [isMobile, setIsMobile] = useState(false);

  // Generate preview URLs for selected image files
  useEffect(() => {
    const newPreviews = imageFiles.map(file => file ? URL.createObjectURL(file) : null);
    setPreviews(newPreviews);
    
    return () => {
      newPreviews.forEach(url => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [imageFiles]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lock body scroll when modal is open to prevent background scrolling on mobile
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  const modalVariants = {
    hidden: { 
      opacity: isMobile ? 1 : 0, 
      y: isMobile ? "100%" : 30, 
      scale: isMobile ? 1 : 0.98 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: isMobile 
        ? { type: 'spring', damping: 30, stiffness: 300 }
        : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
    },
    exit: { 
      opacity: isMobile ? 0.8 : 0, 
      y: isMobile ? "100%" : 20, 
      scale: isMobile ? 1 : 0.98,
      transition: { duration: 0.25, ease: 'easeInOut' }
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
          
          {/* Modal Centering Wrapper (Bottom sheet on mobile, Centered modal on desktop) */}
          <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-3 sm:p-4 pointer-events-none">
            {/* Modal Card */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="pointer-events-auto w-full sm:max-w-md md:max-w-lg bg-[#090d16]/95 backdrop-blur-2xl rounded-[24px] sm:rounded-[32px] p-5 sm:p-6 md:p-8 border border-white/10 shadow-[0_0_50px_rgba(139,92,246,0.15)] max-h-[90vh] sm:max-h-[85vh] overflow-y-auto relative"
            >
              {/* Sleek Mobile Pull Handle */}
              <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-4 block sm:hidden" />

              {/* Close Button */}
              <button 
                type="button"
                onClick={onClose}
                className="absolute top-5 right-5 sm:top-6 sm:right-6 text-white/40 hover:text-white transition-colors cursor-pointer p-1 rounded-full hover:bg-white/5 z-20"
                aria-label="Close modal"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            {/* Header */}
            <div className="mb-5 sm:mb-6 relative">
              <span className="text-[8px] tracking-[0.4em] font-black uppercase text-[var(--primary)] block mb-1">
                Boutique Inventory
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-white leading-tight">
                Add Premium <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">Hair Extension</span>
              </h2>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Product Name */}
              <div>
                <label className="block text-[8px] sm:text-[9px] font-black tracking-widest text-white/40 uppercase mb-1.5 sm:mb-2">Product Name *</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 sm:px-5 sm:py-4 text-xs font-light text-white placeholder-white/20 focus:outline-none focus:border-[var(--primary)]/70 transition-colors"
                  placeholder="e.g. Midnight Body Wave"
                />
              </div>

              {/* Price Input */}
              <div>
                <label className="block text-[8px] sm:text-[9px] font-black tracking-widest text-white/40 uppercase mb-1.5 sm:mb-2">Price (₦) *</label>
                <input 
                  type="number" 
                  required
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 sm:px-5 sm:py-4 text-xs font-light text-white placeholder-white/20 focus:outline-none focus:border-[var(--primary)]/70 transition-colors"
                  placeholder="e.g. 120500"
                />
              </div>

              {/* Color & Size Grid - Stacked on Mobile, side-by-side on desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[8px] sm:text-[9px] font-black tracking-widest text-white/40 uppercase mb-1.5 sm:mb-2">Color (Optional)</label>
                  <input 
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({...formData, color: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 sm:px-5 sm:py-4 text-xs font-light text-white placeholder-white/20 focus:outline-none focus:border-[var(--primary)]/70 transition-colors"
                    placeholder="e.g. Platinum Blonde"
                  />
                </div>
                <div>
                  <label className="block text-[8px] sm:text-[9px] font-black tracking-widest text-white/40 uppercase mb-1.5 sm:mb-2">Size / Length (Optional)</label>
                  <input 
                    type="text"
                    value={formData.size}
                    onChange={(e) => setFormData({...formData, size: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 sm:px-5 sm:py-4 text-xs font-light text-white placeholder-white/20 focus:outline-none focus:border-[var(--primary)]/70 transition-colors"
                    placeholder="e.g. 24 inches or 13x4"
                  />
                </div>
              </div>

              {/* Product Description */}
              <div>
                <label className="block text-[8px] sm:text-[9px] font-black tracking-widest text-white/40 uppercase mb-1.5 sm:mb-2">Product Description (Optional)</label>
                <textarea 
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-[20px] px-4 py-3 sm:px-5 sm:py-4 text-xs font-light text-white placeholder-white/20 focus:outline-none focus:border-[var(--primary)]/70 transition-colors resize-none"
                  placeholder="e.g. Premium 24-inch virgin human hair with natural luster. Sourced from single-donor, offers styling flexibility..."
                />
              </div>

              {/* Product Images - 4 Slots */}
              <div>
                <label className="block text-[8px] sm:text-[9px] font-black tracking-widest text-white/40 uppercase mb-1.5 sm:mb-2">
                  Product Images / Angles (Cover + up to 3 angles)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[0, 1, 2, 3].map((index) => {
                    const isCover = index === 0;
                    const preview = previews[index];
                    
                    return (
                      <div 
                        key={index} 
                        className={`relative aspect-[4/5] rounded-2xl border border-dashed transition-all overflow-hidden flex flex-col items-center justify-center bg-white/[0.01] ${
                          preview 
                            ? 'border-white/20' 
                            : isCover 
                              ? 'border-[var(--primary)]/40 hover:border-[var(--primary)]/70 bg-[var(--primary)]/[0.02]' 
                              : 'border-white/10 hover:border-white/30'
                        }`}
                      >
                        {preview ? (
                          <>
                            <img 
                              src={preview} 
                              alt={`Slot ${index + 1}`} 
                              className="w-full h-full object-cover" 
                            />
                            {/* Hover overlay with trash icon */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedFiles = [...imageFiles];
                                  updatedFiles[index] = null;
                                  setImageFiles(updatedFiles);
                                }}
                                className="p-3 bg-red-500 hover:bg-red-600 rounded-full text-white transition-colors cursor-pointer shadow-lg"
                                aria-label="Remove image"
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                  <polyline points="3 6 5 6 21 6"></polyline>
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <input 
                              type="file" 
                              accept="image/*"
                              required={isCover}
                              onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                if (file) {
                                  const updatedFiles = [...imageFiles];
                                  updatedFiles[index] = file;
                                  setImageFiles(updatedFiles);
                                }
                              }}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div className="text-center p-3 space-y-1.5 pointer-events-none">
                              <span className={`text-[16px] block ${isCover ? 'text-[var(--primary)]' : 'text-white/40'}`}>
                                {isCover ? '📸' : '➕'}
                              </span>
                              <p className={`text-[9px] font-bold uppercase tracking-wider ${isCover ? 'text-white/80' : 'text-white/40'}`}>
                                {isCover ? 'Cover Image *' : `Angle ${index + 1}`}
                              </p>
                              <p className="text-[7px] text-white/30 font-light">
                                {isCover ? 'Primary showcase' : 'Optional view'}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons - Stacked on mobile, side-by-side on desktop */}
              <div className="pt-3 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:flex-1 py-3.5 sm:py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] tracking-[0.2em] font-black uppercase text-white transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <Button 
                  variant="primary" 
                  className="w-full sm:flex-1 py-3.5 sm:py-4 rounded-2xl text-[10px] tracking-[0.2em] font-black uppercase bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] border-0 text-white cursor-pointer" 
                  type="submit" 
                  disabled={loading}
                >
                  {loading ? 'UPLOADING...' : 'SAVE PRODUCT'}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </>
    )}
  </AnimatePresence>
  );
};
