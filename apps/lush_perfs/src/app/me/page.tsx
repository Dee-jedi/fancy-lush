"use client";

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Image from 'next/image';

export default function ProfilePage() {
  const { user, signInWithGoogle, signOut, role } = useAuth();

  return (
    <main className="min-h-screen bg-[#050404] text-[white] pb-28 lg:pb-12">
      <Header />
      <div className="max-w-md mx-auto px-6 pt-36 pb-24 text-center space-y-8">
        <h1 className="text-3xl font-serif text-[#c89666]">My Atelier</h1>
        
        {user ? (
          <div className="space-y-6">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-[#c89666]/30">
              {user.photoURL ? (
                <Image src={user.photoURL} alt="Profile" width={96} height={96} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-[white]/5 flex items-center justify-center text-3xl font-serif">
                  {user.displayName?.charAt(0) || 'U'}
                </div>
              )}
            </div>
            
            <div>
              <h2 className="text-xl font-serif">{user.displayName}</h2>
              <p className="text-[white]/50 text-sm mt-1">{user.email}</p>
              {role === 'admin' && (
                <span className="inline-block mt-3 px-3 py-1 bg-[#c89666]/10 text-[#c89666] border border-[#c89666]/30 rounded-full text-[10px] tracking-widest font-black uppercase">
                  Atelier Admin
                </span>
              )}
            </div>

            <div className="pt-8">
              <button 
                onClick={signOut}
                className="w-full py-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="w-24 h-24 mx-auto rounded-full bg-[white]/5 flex items-center justify-center text-[white]/20 border border-[white]/10">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <p className="text-[white]/60 font-light text-sm max-w-[250px] mx-auto leading-relaxed">
              Sign in to access your bespoke selections, order history, and exclusive Atelier privileges.
            </p>
            <div className="pt-4">
              <button 
                onClick={signInWithGoogle}
                className="w-full py-4 bg-linear-to-r from-[#8e5e38] via-[#c89666] to-[#f5d6c6] text-[#050404] rounded-full text-[10px] font-black uppercase tracking-widest transition-transform hover:scale-105 cursor-pointer shadow-lg"
              >
                Sign In with Google
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="hidden lg:block">
        <Footer />
      </div>
    </main>
  );
}
