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
    <section className="py-40 bg-[#faf9f6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col items-center text-center mb-20 space-y-6">
          <span className="text-[var(--secondary)] text-xs tracking-[0.4em] font-black uppercase">Voices of Fancylush</span>
          <h2 className="text-5xl md:text-6xl font-serif font-medium text-[var(--primary)] leading-tight">
            Real Stories, <span className="italic font-light text-[var(--secondary)]">Real Results</span>
          </h2>
        </div>

        <div className="relative h-[400px] md:h-[300px] flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
              className="absolute max-w-4xl text-center space-y-10"
            >
              <p className="text-2xl md:text-3xl text-[var(--foreground)]/60 font-light leading-relaxed italic font-serif">
                "{TESTIMONIALS[index].quote}"
              </p>
              
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[var(--primary)]/5 border border-[var(--primary)]/10 flex items-center justify-center font-serif italic text-[var(--primary)] text-3xl shadow-sm">
                  {TESTIMONIALS[index].initial}
                </div>
                <div>
                  <p className="text-[var(--primary)] font-bold text-xl">{TESTIMONIALS[index].author}</p>
                  <p className="text-[10px] tracking-widest text-[var(--foreground)]/30 uppercase font-black">{TESTIMONIALS[index].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-16">
          {TESTIMONIALS.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index ? 'bg-[var(--secondary)] w-8' : 'bg-[var(--primary)]/10 w-2'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
