"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS } from "@/constants";

export const Testimonials = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 md:py-40 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col items-center text-center mb-16 md:mb-24 space-y-4 md:space-y-6">
          <span className="text-[var(--secondary)] text-[9px] md:text-[10px] tracking-[0.4em] uppercase font-black">Patient Trust</span>
          <h2 className="text-4xl md:text-7xl font-serif font-bold text-[var(--primary)] leading-tight">
            Real Stories, <br className="md:hidden" /><span className="italic font-light text-[var(--secondary)]">Real Results</span>
          </h2>
        </div>

        <div className="relative min-h-[400px] md:h-[400px] flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute w-full max-w-4xl text-center space-y-10 md:space-y-16 px-4"
            >
              <div className="relative">
                <span className="absolute -top-12 -left-4 md:-left-8 text-8xl md:text-[120px] font-serif text-[var(--primary)]/5 opacity-50 select-none">“</span>
                <p className="text-lg md:text-4xl text-[var(--foreground)]/70 font-light leading-relaxed italic font-serif px-4 md:px-12 relative z-10">
                  {TESTIMONIALS[index].quote}
                </p>
                <span className="absolute -bottom-20 -right-4 md:-right-8 text-8xl md:text-[120px] font-serif text-[var(--primary)]/5 opacity-50 select-none">”</span>
              </div>
              
              <div className="flex flex-col items-center gap-4 md:gap-6">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[var(--primary)]/5 border border-emerald-900/5 flex items-center justify-center font-serif italic text-[var(--primary)] text-3xl md:text-4xl shadow-sm">
                  {TESTIMONIALS[index].initial}
                </div>
                <div className="space-y-1">
                  <p className="text-[var(--primary)] font-bold text-xl md:text-2xl tracking-tight">{TESTIMONIALS[index].author}</p>
                  <p className="text-[8px] md:text-[10px] tracking-[0.2em] text-[var(--foreground)]/30 uppercase font-black">{TESTIMONIALS[index].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Custom Pagination */}
        <div className="flex justify-center gap-3 md:gap-4 mt-12 md:mt-20">
          {TESTIMONIALS.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setIndex(i)}
              className={`h-1 md:h-1.5 rounded-full transition-all duration-700 ${
                i === index ? 'bg-[var(--secondary)] w-10 md:w-12' : 'bg-emerald-900/10 w-2 md:w-3 hover:bg-emerald-900/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
