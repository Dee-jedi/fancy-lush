"use client";

import React from 'react';
import { motion } from "framer-motion";
import Image from 'next/image';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-emerald-950/40 z-10"></div>
          <Image 
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2000&auto=format&fit=crop" 
            alt="Dental Clinic" 
            fill
            sizes="100vw"
            className="w-full h-full object-cover scale-105"
            priority
          />
        </div>
        <div className="relative z-20 text-center px-6">
          <motion.span 
            initial={{ opacity: 1 }}
            className="text-[10px] tracking-[0.5em] uppercase font-bold text-white/80 mb-6 block"
          >
            Our Story
          </motion.span>
          <motion.h1 
            initial={{ opacity: 1 }}
            className="text-5xl md:text-8xl font-serif text-white font-bold leading-tight"
          >
            The Lush <br/><span className="italic font-light">Heritage</span>
          </motion.h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 md:py-40 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-32 items-center">
            <div className="space-y-8 md:space-y-12 text-center lg:text-left">
              <div className="space-y-4 md:space-y-6">
                <span className="text-[var(--secondary)] text-[10px] tracking-[0.5em] uppercase font-black block">Clinical Excellence</span>
                <h2 className="text-4xl md:text-7xl font-serif font-bold text-[var(--primary)] leading-tight">
                  Beautiful Smiles <br className="hidden md:block" /> 
                  <span className="italic font-light text-[var(--secondary)]">That Last</span>
                </h2>
              </div>
              <p className="text-base md:text-xl text-[var(--foreground)]/60 font-light leading-relaxed">
                Founded with a vision to redefine dental care, Lush Dentals brings a touch of luxury to clinical excellence. We believe that visiting the dentist shouldn't be a chore, but an experience that leaves you feeling refreshed and confident.
              </p>
              <div className="pt-6 flex flex-col md:flex-row gap-8 justify-center lg:justify-start">
                <div>
                  <p className="text-3xl md:text-5xl font-serif font-bold text-[var(--primary)]">100%</p>
                  <p className="text-[9px] tracking-widest uppercase font-black opacity-30 mt-1">Success Rate</p>
                </div>
                <div>
                  <p className="text-3xl md:text-5xl font-serif font-bold text-[var(--primary)]">700+</p>
                  <p className="text-[9px] tracking-widest uppercase font-black opacity-30 mt-1">Happy Patients</p>
                </div>
              </div>
            </div>

            {/* Asymmetrical Image Grid */}
            <div className="grid grid-cols-2 gap-4 md:gap-8">
              <div className="space-y-4 md:space-y-8">
                <div className="relative rounded-[30px] md:rounded-[40px] shadow-xl w-full aspect-[3/4] overflow-hidden">
                  <Image src="https://images.unsplash.com/photo-1445527815219-ecbfec67492e?q=80&w=800&auto=format&fit=crop" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" alt="Clinic" />
                </div>
                <div className="bg-[var(--secondary)] p-6 md:p-10 rounded-[30px] md:rounded-[40px] text-emerald-950 text-center">
                  <p className="text-3xl md:text-5xl font-serif font-bold mb-1">05+</p>
                  <p className="text-[8px] md:text-[10px] tracking-widest font-black uppercase opacity-60">Years of Care</p>
                </div>
              </div>
              <div className="space-y-4 md:space-y-8 pt-8 md:pt-16">
                <div className="bg-[var(--primary)] p-6 md:p-10 rounded-[30px] md:rounded-[40px] text-white text-center">
                  <p className="text-3xl md:text-5xl font-serif font-bold mb-1">05+</p>
                  <p className="text-[8px] md:text-[10px] tracking-widest font-black uppercase opacity-60">Specialists</p>
                </div>
                <div className="relative rounded-[30px] md:rounded-[40px] shadow-xl w-full aspect-[3/4] overflow-hidden">
                  <Image src="https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=800&auto=format&fit=crop" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" alt="Service" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 md:py-40 bg-emerald-50/30">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center space-y-12 md:space-y-16">
          <div className="space-y-6">
            <span className="text-[var(--secondary)] text-[10px] tracking-[0.5em] uppercase font-black">Founder's Vision</span>
            <h2 className="text-4xl md:text-7xl font-serif font-bold text-[var(--primary)] leading-tight italic font-light">"Dental care is the art of <br className="hidden md:block" /> preserving confidence."</h2>
          </div>
          <div className="flex flex-col items-center gap-4 md:gap-6">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white border border-emerald-900/5 flex items-center justify-center font-serif italic text-[var(--primary)] text-3xl md:text-4xl shadow-sm">H</div>
            <div className="space-y-1">
              <p className="text-[var(--primary)] font-bold text-xl md:text-2xl tracking-tight">Hadarah</p>
              <p className="text-[9px] tracking-[0.3em] text-[var(--foreground)]/30 uppercase font-black">Founder & CEO</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
