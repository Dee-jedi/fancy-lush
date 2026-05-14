"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Button } from "../ui/Button";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
  ];

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
            {menuItems.map((item) => (
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

            {/* Hamburger Button - EXACT COPY from Beauty Spa logic */}
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

      {/* Mobile Menu / Drawer - EXACT COPY from Beauty Spa logic */}
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
                  {menuItems.map((item, i) => {
                    const isActive = pathname === item.href;
                    return (
                      <div key={item.name} className="flex flex-col items-start gap-1">
                        <motion.a
                          href={item.href}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1, duration: 0.5 }}
                          onClick={() => setIsOpen(false)}
                          className={`text-4xl font-serif ${isActive ? 'text-[var(--primary)]' : 'text-[var(--foreground)]/50'} hover:text-[var(--primary)] transition-all duration-300 tracking-tight`}
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
                    <Button href="/book" variant="primary" className="w-full py-6 text-xs tracking-[0.3em] rounded-2xl">
                      BOOK APPOINTMENT
                    </Button>
                  </motion.div>
                  <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                    <p className="text-[10px] tracking-[0.2em] font-black uppercase text-gray-300">Lush Dentals Clinic</p>
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
