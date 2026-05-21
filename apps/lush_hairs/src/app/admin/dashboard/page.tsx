"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useSearch } from '@/context/SearchContext';
import { Header } from '@/components/layout/Header';
import { AddProductModal } from '@/components/admin/AddProductModal';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';


export default function AdminDashboard() {
  const { user, role, loading } = useAuth();
  const { products } = useSearch();
  const router = useRouter();
  const [productCount, setProductCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Safeguard access: only admins allowed
  useEffect(() => {
    if (!loading) {
      if (!user || role !== 'admin') {
        router.push('/');
      }
    }
  }, [user, role, loading, router]);

  // Read product count from cached SearchContext products + meta doc fallback
  useEffect(() => {
    if (loading || !user || role !== 'admin') return;

    // Use the already-cached products from SearchContext
    if (products.length > 0) {
      setProductCount(products.length);
      setFetching(false);
      return;
    }

    // Fallback: read count from _meta doc (1 single read)
    const fetchCount = async () => {
      if (!db) { setFetching(false); return; }
      try {
        const metaDoc = await getDoc(doc(db, '_meta', 'hairProductCount'));
        if (metaDoc.exists()) {
          setProductCount(metaDoc.data().count || 0);
        }
      } catch (error) {
        console.error("Error reading product count:", error);
      } finally {
        setFetching(false);
      }
    };
    fetchCount();
  }, [user, role, loading, products.length]);

  if (loading || !user || role !== 'admin') {
    return (
      <main className="min-h-screen bg-[#030712] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-white/10 border-t-[var(--primary)] rounded-full animate-spin mx-auto"></div>
          <p className="text-white/40 font-serif tracking-[0.2em] text-xs uppercase">Verifying Credentials...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full max-w-full bg-[#030712] text-white overflow-x-hidden flex flex-col justify-between relative">
      <div className="w-full max-w-full overflow-hidden relative">
        <Header />
        
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--primary)]/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[var(--secondary)]/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>

        <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto w-full relative z-10">
          <div className="space-y-16">
            
            {/* Header / Actions Info */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch border-b border-white/5 pb-16">
              <div className="lg:col-span-2 space-y-3 flex flex-col justify-center">
                <span className="text-[10px] tracking-[0.4em] font-black uppercase text-[var(--primary)] block">
                  Concierge Panel
                </span>
                <h1 className="text-4xl md:text-6xl font-serif text-white">
                  Boutique <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">Dashboard</span>
                </h1>
                <p className="text-xs text-white/40 font-light max-w-lg">
                  Manage your boutique collection, audit product specifications, and easily publish new luxury hair products to your active catalog.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                {/* Stats Card */}
                <div className="bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-[32px] p-6 backdrop-blur-2xl transition-all relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/10 to-[var(--secondary)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  <p className="text-[9px] tracking-widest uppercase font-black text-white/40 mb-2">Total Hair Products Listed</p>
                  {fetching ? (
                    <div className="w-8 h-8 border-2 border-white/10 border-t-[var(--primary)] rounded-full animate-spin"></div>
                  ) : (
                    <span className="text-5xl font-serif text-white tracking-tighter">
                      {productCount}
                    </span>
                  )}
                </div>

                {/* Add New Product Trigger Card */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full text-left bg-gradient-to-r from-[var(--primary)]/10 to-[var(--secondary)]/10 hover:from-[var(--primary)]/20 hover:to-[var(--secondary)]/20 border border-[var(--primary)]/25 rounded-[32px] p-6 backdrop-blur-2xl transition-all hover:scale-[1.02] cursor-pointer flex flex-col justify-center gap-2 group relative overflow-hidden"
                >
                  <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-white/5 rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-500 text-white/10 text-4xl">
                    +
                  </div>
                  <span className="text-[9px] tracking-[0.2em] font-black uppercase text-[var(--primary)]">Publishing Tool</span>
                  <h3 className="text-lg font-serif text-white">Add New Product</h3>
                  <p className="text-[10px] text-white/40 font-light">Upload specifications and up to 4 preview angles.</p>
                </button>
              </div>
            </div>

          </div>
        </section>
      </div>



      <AddProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => { setProductCount(prev => prev + 1); }} // Update count optimistically
      />
    </main>
  );
}
