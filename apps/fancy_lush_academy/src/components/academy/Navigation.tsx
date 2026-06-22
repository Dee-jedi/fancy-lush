"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const links = [
    { name: "Home", path: "/" },
    { name: "Programs", path: "/programs" },
    { name: "Campus & Welfare", path: "/campus" },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#fcfbf9]/80 backdrop-blur-xl border-b border-[#1a1a1a]/5 transition-all duration-500">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 py-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-serif tracking-[0.2em] font-medium uppercase text-[#1a1a1a] cursor-pointer">
            FL <span className="text-[#d4af37] italic">Schools</span>
          </Link>
          
          <button 
            onClick={toggleDrawer}
            className="flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none z-[60]"
          >
            <span className={`block w-6 h-[1.5px] bg-[#1a1a1a] transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-[7.5px]' : ''}`}></span>
            <span className={`block w-6 h-[1.5px] bg-[#1a1a1a] transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-[1.5px] bg-[#1a1a1a] transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-[7.5px]' : ''}`}></span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleDrawer}
              className="fixed inset-0 bg-[#1a1a1a]/60 backdrop-blur-md z-[55]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[80%] md:w-[400px] bg-[#fcfbf9] z-[58] shadow-2xl flex flex-col px-8 py-32"
            >
              <div className="flex flex-col space-y-8">
                {links.map((link, idx) => (
                  <Link 
                    key={idx} 
                    href={link.path}
                    onClick={toggleDrawer}
                    className="text-3xl font-serif text-[#1a1a1a] hover:text-[#d4af37] transition-colors relative w-fit group"
                  >
                    {link.name}
                    <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#d4af37] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ))}
              </div>
              
              <div className="mt-auto pt-10 border-t border-[#1a1a1a]/10">
                <p className="text-[#8c8c8c] text-xs uppercase tracking-widest text-center mb-6">Enrollment closes June 30th</p>
                <Link 
                  href="/register"
                  onClick={toggleDrawer}
                  className="block w-full text-center px-8 py-5 bg-[#1a1a1a] text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#d4af37] transition-colors rounded-sm"
                >
                  Apply Today
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
