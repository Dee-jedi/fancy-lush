"use client";

import React from 'react';
import { motion } from "framer-motion";

const reasons = [
  {
    title: "Clinical Perfection",
    description: "Every procedure is performed to the highest medical standards with obsessive attention to detail.",
    number: "01"
  },
  {
    title: "Advanced Tech",
    description: "Equipped with digital scanning and laser dentistry for faster, painless recovery.",
    number: "02"
  },
  {
    title: "Patient Comfort",
    description: "A serene environment designed to eliminate anxiety and provide a stress-free experience.",
    number: "03"
  }
];

export const WhyChooseUs = () => {
  return (
    <section className="py-24 md:py-40 bg-emerald-950 text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="flex flex-col items-center text-center space-y-12 md:space-y-24">
          
          <div className="space-y-6 md:space-y-10 max-w-3xl">
            <span className="text-[var(--secondary)] text-[10px] tracking-[0.5em] uppercase font-black">Our Difference</span>
            <h2 className="text-4xl md:text-7xl font-serif font-bold leading-tight">
              Setting a New <br />
              <span className="italic font-light text-[var(--secondary)]">Clinical Standard</span>
            </h2>
            <p className="text-base md:text-xl text-white/40 font-light leading-relaxed">
              Lush Dentals isn't just about beauty—it's about the intersection of medical excellence and patient well-being.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20 w-full">
            {reasons.map((reason, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                className="relative flex flex-col items-center text-center group"
              >
                <span className="text-8xl md:text-[120px] font-serif font-bold text-white/5 absolute -top-12 md:-top-20 group-hover:text-[var(--secondary)]/10 transition-colors duration-700">
                  {reason.number}
                </span>
                <div className="space-y-4 md:space-y-6 relative z-10">
                  <h3 className="text-2xl md:text-3xl font-serif font-bold">{reason.title}</h3>
                  <div className="w-12 h-[1px] bg-[var(--secondary)] mx-auto"></div>
                  <p className="text-white/50 font-light leading-relaxed text-sm md:text-base">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pt-12 md:pt-20 flex flex-col md:flex-row items-center gap-10 md:gap-20 border-t border-white/5 w-full justify-center"
          >
            <div className="text-center">
              <p className="text-4xl md:text-6xl font-serif font-bold text-[var(--secondary)] mb-2 tracking-tighter">2.5k+</p>
              <p className="text-[9px] tracking-[0.3em] uppercase font-black text-white/30">Active Patients</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-6xl font-serif font-bold text-[var(--secondary)] mb-2 tracking-tighter">100%</p>
              <p className="text-[9px] tracking-[0.3em] uppercase font-black text-white/30">Success Rate</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-6xl font-serif font-bold text-[var(--secondary)] mb-2 tracking-tighter">05+</p>
              <p className="text-[9px] tracking-[0.3em] uppercase font-black text-white/30">Specialists</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
