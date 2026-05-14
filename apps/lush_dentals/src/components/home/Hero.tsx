"use client";

import React from 'react';
import { motion } from "framer-motion";
import Image from 'next/image';
import { Button } from "../ui/Button";

export const Hero = () => {
  return (
    <section className="relative pt-32 md:pt-44 pb-20 md:pb-32 px-6 md:px-8 overflow-hidden min-h-screen flex items-center bg-white">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[70%] h-[70%] bg-emerald-50 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-emerald-50/50 rounded-full blur-[100px] opacity-40"></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative">
        <div className="flex flex-col items-center text-center space-y-10 md:space-y-16">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-emerald-50 border border-emerald-900/5 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse"></span>
            <span className="text-[var(--primary)] text-[9px] md:text-[10px] tracking-[0.4em] uppercase font-black">
              State-of-the-Art Dental Care
            </span>
          </motion.div>

          {/* Main Headline */}
          <div className="space-y-6 md:space-y-10 max-w-5xl">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold tracking-tighter leading-[0.95] text-[var(--primary)]">
              Transforming <span className="italic font-light text-[var(--foreground)] opacity-30">Your</span> <br />
              Smile, <span className="text-[var(--secondary)] relative">
                Life
                <svg className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-2 md:h-4 text-[var(--secondary)]/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </span> & Confidence
            </h1>
            
            <p className="text-base md:text-xl text-[var(--foreground)]/60 max-w-2xl mx-auto font-light leading-relaxed px-4">
              Where clinical precision meets aesthetic artistry. Join over 700 happy patients who trust Lush Dentals for their lifelong beautiful smiles.
            </p>
          </div>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full sm:w-auto px-6">
            <Button size="lg" href="/book" className="shadow-2xl shadow-emerald-900/20 w-full sm:w-auto">
              BOOK APPOINTMENT
            </Button>
            <Button variant="outline" size="lg" href="/services" className="w-full sm:w-auto">
              EXPLORE SERVICES
            </Button>
          </div>

          {/* Immersive Image Section */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="w-full max-w-6xl mt-12 md:mt-20 relative px-4"
          >
            <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl border border-emerald-900/5 group">
              <Image 
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2000&auto=format&fit=crop" 
                alt="Modern Dental Clinic" 
                fill
                sizes="100vw"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-transparent"></div>
              
              {/* Floating Info Cards - Desktop only */}
              <div className="absolute bottom-8 left-8 right-8 hidden md:flex justify-between items-end">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-[30px] max-w-xs text-white">
                  <p className="text-xs tracking-widest uppercase font-black mb-2 opacity-60">Professional Team</p>
                  <p className="text-sm font-light leading-relaxed">Our specialists are trained in the latest dental techniques and technologies.</p>
                </div>
                <div className="bg-[var(--secondary)] p-6 rounded-[30px] shadow-xl text-emerald-950 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest uppercase font-black opacity-60">Certified Care</p>
                    <p className="text-lg font-serif font-bold italic">Safe & Painless</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
