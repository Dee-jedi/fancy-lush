"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
// Force TS language server re-evaluation
import { AddProductModal } from '@/components/admin/AddProductModal';

export const AdminFloatingButton = () => {
  const { role } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Only render for admins
  if (role !== 'admin') return null;

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-24 right-6 sm:bottom-8 sm:right-8 z-40 w-14 h-14 bg-linear-to-tr from-[#8e5e38] to-[#c89666] rounded-full shadow-[0_0_30px_rgba(156,123,92,0.3)] flex items-center justify-center text-[#050404] cursor-pointer hover:shadow-[0_0_40px_rgba(156,123,92,0.5)] transition-shadow border border-[#f5d6c6]/30"
        aria-label="Add new product"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </motion.button>

      <AddProductModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
          // Optional: Trigger a refresh or toast notification here
        }}
      />
    </>
  );
};
