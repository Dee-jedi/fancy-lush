"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import Link from 'next/link';
import { Button } from "@lush/ui";
import { useAuth } from "@/context/AuthContext";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isShopPage = pathname === '/shop';
  const { user, role, signInWithGoogle, signOut } = useAuth();

  const baseMenuItems = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
  ];

  const menuItems = user && role === 'admin'
    ? [...baseMenuItems, { name: 'Dashboard', href: '/admin/dashboard' }]
    : baseMenuItems;

  // Disable scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-50 bg-[#030712]/60 backdrop-blur-xl h-24 border-b border-white/5 shadow-sm items-center ${
          isShopPage ? 'hidden lg:flex' : 'flex'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-full w-full flex items-center justify-between">
          <Link href="/" className="flex flex-col z-[80] cursor-pointer">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex flex-col"
            >
              <span className="text-2xl md:text-3xl font-serif font-bold tracking-wider leading-none text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
                LUSH HAIRS
              </span>
              <span className="text-[9px] tracking-[0.4em] uppercase font-medium mt-1.5 text-white/40">
                Unleash Beauty
              </span>
            </motion.div>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden lg:flex gap-12 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
            {menuItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className={`hover:text-[var(--primary)] transition-all relative group py-2 cursor-pointer ${
                  pathname === item.href ? 'text-[var(--primary)]' : ''
                }`}
              >
                <motion.span 
                  whileHover={{ color: "var(--primary)", scale: 1.05 }}
                  className="block"
                >
                  {item.name}
                </motion.span>
                <span className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] transition-all ${
                  pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:block">
              <Button 
                onClick={() => router.push('/book')} 
                variant="primary" 
                size="sm" 
                rounded="full"
                className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] border-0 text-white px-8 py-3 tracking-[0.3em] font-black cursor-pointer"
              >
                BOOK STYLIST
              </Button>
            </div>
 
            {/* Hamburger Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="z-[80] w-12 h-12 flex flex-col items-center justify-center gap-1.5 focus:outline-none lg:hidden group"
            >
              <motion.span 
                animate={isOpen ? { rotate: 45, y: 8, backgroundColor: "#fb7185" } : { rotate: 0, y: 0, backgroundColor: "#ffffff" }}
                className="w-8 h-[1.5px] rounded-full transition-colors"
              />
              <motion.span 
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-8 h-[1.5px] bg-white rounded-full"
              />
              <motion.span 
                animate={isOpen ? { rotate: -45, y: -8, backgroundColor: "#fb7185" } : { rotate: 0, y: 0, backgroundColor: "#ffffff" }}
                className="w-8 h-[1.5px] rounded-full transition-colors"
              />
            </button>
          </div>
        </div>
      </motion.header>
 
      {/* Mobile Menu / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed top-24 bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              className="fixed right-0 top-24 bottom-0 w-[75%] sm:w-[400px] bg-[var(--background)]/90 backdrop-blur-2xl z-[70] shadow-[-20px_0_60px_rgba(0,0,0,0.5)] p-8 md:p-12 flex flex-col justify-between border-l border-white/5"
            >
              <div className="relative h-full flex flex-col pt-4">
                <div className="mt-8 flex flex-col gap-6">
                  {menuItems.map((item, i) => {
                    const isActive = pathname === item.href;
                    return (
                      <div key={item.name} className="flex flex-col items-start gap-1">
                        <Link 
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`text-3xl font-serif cursor-pointer ${isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]' : 'text-white/70'} hover:text-[var(--primary)] transition-all duration-300 tracking-tight`}
                        >
                          <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="block"
                          >
                            {item.name}
                          </motion.span>
                        </Link>
                        {isActive && (
                          <motion.div 
                            layoutId="activeIndicator"
                            className="w-12 h-px bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-full mt-1"
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
 
                <div className="pb-12 mt-auto space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button onClick={() => {
                      router.push('/book');
                      setIsOpen(false);
                    }} variant="primary" className="w-full py-6 text-xs tracking-[0.3em] rounded-2xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] border-0 cursor-pointer">
                      BOOK STYLIST
                    </Button>
                  </motion.div>
                  
                  <div className="pt-8 border-t border-white/10 text-center">
                    {user ? (
                      <div className="space-y-3">
                        <p className="text-[9px] tracking-[0.2em] font-medium uppercase text-white/40">
                          Logged in as <span className="text-white/70 font-bold">{user.displayName || user.email}</span>
                        </p>
                        <button
                          onClick={() => {
                            signOut();
                            setIsOpen(false);
                          }}
                          className="text-[9px] tracking-[0.2em] font-black uppercase text-[var(--primary)] hover:text-rose-400 transition-colors cursor-pointer focus:outline-none"
                        >
                          SIGN OUT
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          signInWithGoogle();
                          setIsOpen(false);
                        }}
                        className="text-[9px] tracking-[0.2em] font-black uppercase text-white/30 hover:text-white/60 transition-colors cursor-pointer focus:outline-none"
                      >
                        SIGN IN WITH GOOGLE
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
