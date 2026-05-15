"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/layout/Header';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { AddProductModal } from '@/components/admin/AddProductModal';
import { ReviewList } from '@/components/admin/ReviewList';
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
      const counterDoc = await getDoc(doc(db, '_meta', 'productCount'));
      if (counterDoc.exists()) {
        setProductCount(counterDoc.data().count || 0);
      } else {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const count = querySnapshot.size;
        setProductCount(count);
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
      
      <section className="pt-48 pb-32 px-8">
        <div className="max-w-7xl mx-auto space-y-24">
          
          {/* Header Section */}
          <div className="flex flex-col items-center text-center space-y-8">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[var(--secondary)] text-xs tracking-[0.4em] font-black uppercase"
            >
              Concierge Control
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-serif font-medium text-[var(--primary)] leading-tight"
            >
              Business <span className="italic font-light text-[var(--secondary)]">Intelligence</span>
            </motion.h1>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 gap-8 w-full max-w-md mt-12">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="p-10 bg-white rounded-[40px] shadow-sm border border-gray-100 flex flex-col items-center justify-center"
              >
                <p className="text-[10px] tracking-widest uppercase font-black text-gray-400 mb-2">Total Products Listed</p>
                {fetching ? (
                  <div className="w-10 h-10 border-2 border-gray-100 border-t-[var(--secondary)] rounded-full animate-spin"></div>
                ) : (
                  <span className="text-6xl font-serif text-[var(--primary)]">{productCount}</span>
                )}
              </motion.div>
            </div>
          </div>

          {/* Main Content: Reviews List */}
          <div className="max-w-5xl mx-auto">
            <ReviewList />
          </div>
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
