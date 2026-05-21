"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Button } from "../ui/Button";
import { useAuth } from "@/context/AuthContext";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, role, signInWithGoogle, signOut } = useAuth();

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
  ];

  // If user is admin, append Dashboard to navigation
  const activeMenuItems = user && role === 'admin'
    ? [...menuItems, { name: 'Dashboard', href: '/admin/dashboard' }]
    : menuItems;

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
        className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-2xl h-24 border-b border-emerald-900/5 shadow-sm flex items-center"
      >
        <div className="max-w-7xl mx-auto px-6 h-full w-full flex items-center justify-between">
          <motion.a 
            href="/"
            whileHover={{ scale: 1.02 }}
            className="flex flex-col z-[80] cursor-pointer"
          >
            <span className="text-2xl md:text-3xl font-serif font-bold tracking-[0.1em] leading-none text-[var(--primary)]">
              LUSH <span className="text-[var(--secondary)]">DENTALS</span>
            </span>
            <span className="text-[9px] tracking-[0.4em] uppercase font-medium mt-1.5 ml-0.5 text-[var(--foreground)]/40">
              Transforming Smiles
            </span>
          </motion.a>
          
          {/* Desktop Nav */}
          <nav className="hidden lg:flex gap-12 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--foreground)]/60">
            {activeMenuItems.map((item) => (
              <motion.a 
                key={item.name}
                href={item.href} 
                whileHover={{ color: "var(--primary)", scale: 1.05 }}
                className={`hover:text-[var(--primary)] transition-all relative group py-2 ${
                  pathname === item.href ? 'text-[var(--primary)]' : ''
                }`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-[var(--secondary)] transition-all ${
                  pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </motion.a>
            ))}
          </nav>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:block">
              <Button href="/book" variant="primary" size="sm">
                BOOK APPOINTMENT
              </Button>
            </div>

            {/* Desktop Auth Button */}
            <div className="hidden lg:block z-[80]">
              {user ? (
                <div className="flex items-center gap-3">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.displayName || "User"} 
                      className="w-8 h-8 rounded-full border border-emerald-500/20 shadow-sm" 
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
                      {(user.displayName || user.email || "U")[0].toUpperCase()}
                    </div>
                  )}
                  <button 
                    onClick={signOut} 
                    className="text-[10px] tracking-widest font-bold uppercase text-[var(--foreground)]/40 hover:text-rose-500 transition-colors cursor-pointer focus:outline-none"
                  >
                    SIGN OUT
                  </button>
                </div>
              ) : (
                <button 
                  onClick={signInWithGoogle}
                  className="text-[10px] tracking-widest font-bold uppercase text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer focus:outline-none"
                >
                  SIGN IN
                </button>
              )}
            </div>
            
            {/* Hamburger Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="z-[80] w-12 h-12 flex flex-col items-center justify-center gap-1.5 focus:outline-none lg:hidden group"
            >
              <motion.span 
                animate={isOpen ? { rotate: 45, y: 8, backgroundColor: "#16a07a" } : { rotate: 0, y: 0, backgroundColor: "#16a07a" }}
                className="w-8 h-[1.5px] rounded-full"
              />
              <motion.span 
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-8 h-[1.5px] bg-[var(--primary)] rounded-full"
              />
              <motion.span 
                animate={isOpen ? { rotate: -45, y: -8, backgroundColor: "#16a07a" } : { rotate: 0, y: 0, backgroundColor: "#16a07a" }}
                className="w-8 h-[1.5px] rounded-full"
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
              className="fixed top-24 bottom-0 left-0 right-0 bg-black/10 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              className="fixed right-0 top-24 bottom-0 w-[75%] sm:w-[400px] bg-white/80 backdrop-blur-2xl z-[70] shadow-[-20px_0_60px_rgba(0,0,0,0.03)] p-8 md:p-12 flex flex-col justify-between border-t border-gray-50"
            >
              <div className="relative h-full flex flex-col pt-4">
                <div className="mt-8 flex flex-col gap-10">
                  {activeMenuItems.map((item, i) => {
                    const isActive = pathname === item.href;
                    return (
                      <div key={item.name} className="flex flex-col items-start gap-1">
                        <motion.a
                          href={item.href}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1, duration: 0.5 }}
                          onClick={() => setIsOpen(false)}
                          className={`text-2xl md:text-3xl font-serif font-bold uppercase tracking-wider ${isActive ? 'text-[var(--primary)]' : 'text-[var(--foreground)]/40'} hover:text-[var(--primary)] transition-all duration-300`}
                        >
                          {item.name}
                        </motion.a>
                        {isActive && (
                          <motion.div 
                            layoutId="activeIndicator"
                            className="w-8 h-[2px] bg-[var(--secondary)] rounded-full mt-1"
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="pb-12 mt-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-center w-full"
                  >
                    <Button href="/book" variant="primary" className="px-8 py-4 text-[11px] font-black tracking-[0.2em] rounded-full shadow-md hover:scale-[1.02] transition-transform">
                      BOOK APPOINTMENT
                    </Button>
                  </motion.div>
                  
                  {/* Mobile Drawer Auth Actions */}
                  <div className="mt-10 pt-6 border-t border-emerald-900/5 flex flex-col items-center gap-2">
                    {user ? (
                      <>
                        <div className="flex items-center gap-2">
                          {user.photoURL && (
                            <img 
                              src={user.photoURL} 
                              alt={user.displayName || "User"} 
                              className="w-6 h-6 rounded-full border border-emerald-500/20" 
                            />
                          )}
                          <span className="text-[10px] tracking-[0.1em] font-bold text-emerald-950/40 uppercase">
                            {user.displayName || user.email}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            signOut();
                            setIsOpen(false);
                          }}
                          className="text-[9px] tracking-[0.2em] font-black uppercase text-rose-500 hover:text-rose-600 transition-colors mt-1 cursor-pointer focus:outline-none"
                        >
                          SIGN OUT
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          signInWithGoogle();
                          setIsOpen(false);
                        }}
                        className="text-[10px] tracking-[0.2em] font-black uppercase text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer focus:outline-none"
                      >
                        SIGN IN
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
