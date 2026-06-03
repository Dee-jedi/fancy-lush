"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background selection:bg-(--secondary) selection:text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2000&auto=format&fit=crop"
            alt="Spa Interior"
            className="w-full h-full object-cover scale-105"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-20 text-center px-6"
        >
          <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold text-white/80 mb-6 block">
            Our Story
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight">
            The FancyLush <br /><span className="italic font-light">Experience</span>
          </h1>
        </motion.div>
      </section>

      {/* The Sanctuary (Spa Gallery) */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-(--primary) mb-8">A Sanctuary of Serenity</h2>
          <p className="text-lg text-(--foreground)/60 font-light leading-relaxed">
            Founded on the belief that true beauty radiates from a place of inner peace, FancyLush Spa was designed to be your ultimate retreat from the bustling world. Every detail, from the ambient lighting to the curated aromatherapy blends, is meticulously chosen to transport you into a state of total relaxation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-4/5 rounded-[40px] overflow-hidden group"
          >
            <img src="/images/sanctuary-1.jpg" alt="Treatment Room" loading="lazy" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-4/5 rounded-[40px] overflow-hidden group md:mt-24"
          >
            <img src="/images/sanctuary-2.jpg" alt="Relaxation Area" loading="lazy" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
          </motion.div>
        </div>
      </section>

      {/* The Owner Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square rounded-full overflow-hidden border-12 border-background"
            >
              <img
                src="/images/about_pic.jpg"
                alt="Owner of FancyLush"
                loading="lazy"
                className="w-full h-full object-cover object-[center_15%]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-(--secondary) mb-4 block">
                Meet The Visionary
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-(--primary) mb-8">The Face Behind The Glow</h2>
              <p className="text-lg text-(--foreground)/60 font-light leading-relaxed mb-6">
                With over a decade of expertise in holistic wellness and clinical esthetics, the founder of FancyLush embarked on a mission to redefine luxury skincare.
              </p>
              <p className="text-lg text-(--foreground)/60 font-light leading-relaxed mb-10">
                "I wanted to create a space where clinical results meet profound relaxation. FancyLush is more than a spa; it's a commitment to your confidence, well-being, and absolute comfort."
              </p>
              <div className="pt-4 border-t border-(--primary)/10 inline-block">
                <span className="font-serif italic text-3xl text-(--primary)">Hadarah</span>
                <span className="block text-xs tracking-widest text-(--foreground)/40 uppercase mt-2">Founder & CEO</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Socials / Footer Section */}
      <section className="py-40 px-6 text-center bg-(--primary) text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-serif mb-12">Connect With Us</h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
            <a href="https://tiktok.com/@fancylush_spa" target="_blank" rel="noreferrer" className="group flex flex-col items-center">
              <div className="w-20 h-20 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-(--primary) transition-all duration-500 mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </div>
              <span className="font-serif text-xl tracking-widest">@fancylush_spa</span>
            </a>

            <a href="https://instagram.com/fancylush_spa" target="_blank" rel="noreferrer" className="group flex flex-col items-center">
              <div className="w-20 h-20 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-(--primary) transition-all duration-500 mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
              <span className="font-serif text-xl tracking-widest">@fancylush_spa</span>
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
