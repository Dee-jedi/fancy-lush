"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "../ui/Button";
import { motion, AnimatePresence } from "framer-motion";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '#services' },
    { name: 'Cosmetics', href: '#products' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled ? 'bg-white/80 backdrop-blur-2xl h-24 border-b border-[var(--primary)]/5 shadow-sm' : 'bg-transparent h-28'
        }`}
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
              <Button variant="secondary" size="sm">
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
              className="fixed inset-0 bg-black/5 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-[85%] sm:w-[450px] bg-white z-[70] shadow-[-20px_0_60px_rgba(0,0,0,0.03)] p-8 md:p-12 flex flex-col justify-between"
            >
              <div className="relative h-full flex flex-col">
                {/* Drawer Header */}
                <div className="flex justify-between items-center mb-16">
                  <div className="flex flex-col">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-serif italic font-bold text-[var(--primary)] leading-none">F</span>
                      <span className="text-4xl font-sans font-light text-[var(--secondary)] leading-none ml-[-2px]">L</span>
                    </div>
                    <svg className="w-12 h-2 mt-1 text-[var(--secondary)]" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M 0 0 Q 50 8 100 0" stroke="currentColor" strokeWidth="3" fill="none" />
                    </svg>
                  </div>
                  
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="group"
                  >
                    <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:border-[var(--primary)] transition-all">
                      <svg width="14" height="14" viewBox="0 0 12 12" fill="none" className="text-gray-400 group-hover:text-[var(--primary)]">
                        <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </button>
                </div>

                <div className="mt-8 flex flex-col gap-10">
                {menuItems.map((item, i) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-serif text-[var(--foreground)]/40 hover:text-[var(--primary)] transition-all duration-300 tracking-tight"
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>

                <div className="pb-12 mt-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button variant="secondary" className="w-full py-6 text-xs tracking-[0.3em] rounded-2xl">
                      BOOK NOW
                    </Button>
                  </motion.div>
                  <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                    <p className="text-[10px] tracking-[0.2em] font-black uppercase text-gray-300">Fancylush Beauty & Spa</p>
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
