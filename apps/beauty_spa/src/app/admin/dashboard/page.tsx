"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/layout/Header';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '@lush/firebase';
import { AddProductModal } from '@/components/admin/AddProductModal';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const { user, role, loading } = useAuth();
  const router = useRouter();
  const [productCount, setProductCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!user || role !== 'admin') {
        router.push('/');
      } else {
        fetchProductCount();
      }
    }
  }, [user, role, loading, router]);

  const fetchProductCount = async () => {
    setFetching(true);
    try {
      // Try the counter document first (1 read)
      const counterDoc = await getDoc(doc(db, '_meta', 'productCount'));
      if (counterDoc.exists()) {
        setProductCount(counterDoc.data().count || 0);
      } else {
        // Fallback: count all docs and seed the counter doc
        const querySnapshot = await getDocs(collection(db, 'products'));
        const count = querySnapshot.size;
        setProductCount(count);
        // Seed counter doc so future loads only need 1 read
        await setDoc(doc(db, '_meta', 'productCount'), { count });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setFetching(false);
    }
  };

  if (loading || !user || role !== 'admin') {
    return <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center">
      <p className="text-gray-400 font-serif tracking-widest text-sm uppercase">Loading...</p>
    </div>;
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] text-gray-800">
      <Header />
      
      <section className="pt-48 pb-20 px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-8">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[var(--secondary)] text-xs tracking-[0.4em] font-black uppercase"
          >
            Admin Dashboard
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif font-medium text-[var(--primary)] leading-tight"
          >
            Store <span className="italic font-light text-[var(--secondary)]">Overview</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-12 p-12 bg-white rounded-[40px] shadow-sm border border-gray-100 flex flex-col items-center justify-center w-full max-w-md"
          >
            <p className="text-sm tracking-widest uppercase font-medium text-gray-400 mb-2">Total Products Listed</p>
            {fetching ? (
               <div className="w-16 h-16 border-4 border-gray-100 border-t-[var(--secondary)] rounded-full animate-spin"></div>
            ) : (
              <span className="text-7xl font-serif text-[var(--primary)]">{productCount}</span>
            )}
          </motion.div>
        </div>
      </section>

      {/* Floating Action Button */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-12 right-12 z-40 w-16 h-16 bg-[var(--primary)] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>

      <AddProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchProductCount}
      />
    </main>
  );
}
