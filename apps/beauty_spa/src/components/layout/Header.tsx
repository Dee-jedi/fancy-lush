"use client";

import React, { useState } from 'react';
import { Button } from "../ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, role, signInWithGoogle } = useAuth();

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Cosmetics', href: '/shop' },
    { name: 'About', href: '/about' },
  ];

  const mobileMenuItems = user && role === 'admin'
    ? [...menuItems, { name: 'Dashboard', href: '/admin/dashboard' }]
    : menuItems;

  // Disable scroll when menu is open
  React.useEffect(() => {
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
        className="fixed top-0 w-full z-50 transition-all duration-500 bg-white/80 backdrop-blur-2xl h-24 border-b border-[var(--primary)]/5 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex flex-col cursor-pointer z-[80]"
          >
            <span className={`text-2xl md:text-3xl font-serif font-bold tracking-[0.2em] leading-none text-[var(--primary)]`}>
              FANCYLUSH
            </span>
            <span className={`text-[9px] md:text-[10px] tracking-[0.6em] uppercase font-medium mt-2 ml-1 text-[var(--secondary)]`}>
              BEAUTY & SPA
            </span>
          </motion.div>
          
          {/* Desktop Nav */}
          <nav className="hidden xl:flex gap-12 text-[12px] font-medium uppercase tracking-widest text-[var(--foreground)]/60">
            {menuItems.map((item) => (
              <motion.a 
                key={item.name}
                href={item.href} 
                whileHover={{ color: "var(--primary)", scale: 1.05 }}
                className="hover:text-[var(--primary)] transition-all relative group py-2"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--secondary)] transition-all group-hover:w-full"></span>
              </motion.a>
            ))}
          </nav>
          
          <div className="flex items-center gap-6">
            <div className="hidden xl:block">
              <Button href="/book" variant="secondary" size="sm">
                BOOK NOW
              </Button>
            </div>

            {/* Hamburger Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="z-[80] w-12 h-12 flex flex-col items-center justify-center gap-1.5 focus:outline-none xl:hidden group"
            >
              <motion.span 
                animate={isOpen ? { rotate: 45, y: 8, backgroundColor: "#2e1065" } : { rotate: 0, y: 0, backgroundColor: "#2e1065" }}
                className={`w-8 h-[1.5px] rounded-full`}
              />
              <motion.span 
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className={`w-8 h-[1.5px] bg-[var(--primary)] rounded-full`}
              />
              <motion.span 
                animate={isOpen ? { rotate: -45, y: -8, backgroundColor: "#2e1065" } : { rotate: 0, y: 0, backgroundColor: "#2e1065" }}
                className={`w-8 h-[1.5px] rounded-full`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
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
              className="fixed right-0 top-24 bottom-0 w-[75%] sm:w-[400px] bg-white/80 backdrop-blur-2xl z-[70] shadow-[-20px_0_60px_rgba(0,0,0,0.03)] p-8 md:p-12 flex flex-col justify-between border-t border-gray-50 "
            >
              <div className="relative h-full flex flex-col pt-4">

                <div className={`mt-8 flex flex-col ${user && role === 'admin' ? 'gap-6' : 'gap-10'}`}>
                {mobileMenuItems.map((item, i) => {
                  const isActive = pathname === item.href;
                  return (
                    <div key={item.name} className="flex flex-col items-start gap-1">
                      <motion.a
                        href={item.href}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        onClick={() => setIsOpen(false)}
                        className={`${user && role === 'admin' ? 'text-3xl' : 'text-4xl'} font-serif ${isActive ? 'text-[var(--primary)]' : 'text-[var(--foreground)]/50'} hover:text-[var(--primary)] transition-all duration-300 tracking-tight`}
                      >
                        {item.name}
                      </motion.a>
                      {isActive && (
                        <motion.div 
                          layoutId="activeIndicator"
                          className="w-12 h-1 bg-[var(--secondary)] rounded-full mt-1"
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
                  >
                    <Button href="/book" variant="secondary" className="w-full py-6 text-xs tracking-[0.3em] rounded-2xl">
                      BOOK NOW
                    </Button>
                  </motion.div>
                  <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                    {user ? (
                      <p className="text-[10px] tracking-[0.2em] font-black uppercase text-gray-300">Fancylush Beauty & Spa</p>
                    ) : (
                      <p 
                        onClick={signInWithGoogle}
                        className="text-[10px] tracking-[0.2em] font-black uppercase text-gray-300 cursor-pointer hover:text-gray-400 transition-colors"
                      >
                        SIGNIN
                      </p>
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
