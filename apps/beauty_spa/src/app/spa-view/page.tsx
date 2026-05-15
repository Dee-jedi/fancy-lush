"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { CinematicVideo } from '@/components/spa-view/CinematicVideo';
import { Gallery } from '@/components/spa-view/Gallery';

export default function SpaView() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 bg-[var(--background)] overflow-x-hidden">
        {/* Hero Section with Video Background */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              poster="/images/spa-view/interior-1.png"
              className="absolute inset-0 w-full h-full object-cover brightness-[0.6] scale-105"
            >
              <source src="/videos/vid2.mp4" type="video/mp4" />
            </video>
            {/* Soft overlay gradient for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[var(--background)]/20" />
          </div>

          <div className="relative z-10 text-center px-6">
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-[var(--secondary)] text-[12px] tracking-[0.5em] uppercase font-black mb-4 block"
            >
              Visual Experience
            </motion.span>
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-5xl md:text-8xl font-serif text-white mb-8 tracking-tight"
            >
              The Spa <span className="italic">View</span>
            </motion.h1>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <div className="w-px h-24 bg-gradient-to-b from-[var(--secondary)] to-transparent mx-auto mt-12" />
            </motion.div>
          </div>
        </section>

        {/* Intro Section - Refactored to be cleaner without the photo */}
        <section className="max-w-4xl mx-auto px-6 py-24 md:py-40 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-serif text-[var(--primary)] mb-8 leading-tight">
              A Sanctuary of <br />
              <span className="text-[var(--secondary)] italic text-5xl md:text-7xl">Pure Serenity</span>
            </h2>
            <p className="text-xl text-[var(--foreground)]/70 leading-relaxed font-medium mb-12 mx-auto max-w-2xl">
              Step into a world where time stands still. Our spa is meticulously designed to provide the ultimate clinical-luxe experience, combining modern aesthetics with ancient healing principles.
            </p>
            <Button href="/book" variant="outline">
              Begin Your Journey
            </Button>
          </motion.div>
        </section>

        <CinematicVideo />
        
        <Gallery />

        {/* Call to Action */}
        <section className="bg-[var(--primary)] py-24 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
             <Image
              src="/images/spa-view/lounge.png"
              alt="Background"
              fill
              className="object-cover grayscale"
              sizes="100vw"
            />
          </div>
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">Ready to Experience It Yourself?</h2>
            <p className="text-white/70 text-lg mb-12 font-medium">Book your personalized treatment today and discover the Fancylush difference.</p>
            <Button href="/book" variant="secondary" size="lg">
              BOOK AN APPOINTMENT
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
