"use client";

import React from 'react';
import { motion } from "framer-motion";
import Link from 'next/link';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@lush/ui";
import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050404] text-[white] pb-28 lg:pb-12">
      <Header />

      {/* Hero Narrative Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Cinematic Parallax Backdrop */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#050404]/85 z-10"></div>
          <Image
            src="/images/perf_hero.png"
            alt="Atelier Gold Crafting"
            fill
            priority
            className="w-full h-full object-cover object-center opacity-90"
          />
          {/* Radial Glowing vignette mask */}
          <div className="absolute inset-0 bg-linear-to-t from-[#050404] via-transparent to-[#050404]/70 z-20"></div>
          <div className="absolute top-1/4 left-1/4 w-[60%] h-[60%] bg-[#c89666]/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none z-10"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center z-30 relative pt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="space-y-6"
          >
            <span className="inline-block mb-6 text-[9px] tracking-[0.4em] font-black uppercase text-[#c89666] bg-[white]/5 border border-[white]/5 px-6 py-2 rounded-full backdrop-blur-md mt-20">
              Atelier of Senses & Form
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-[white] tracking-tight">
              The <span className="text-transparent bg-clip-text bg-linear-to-r from-[#8e5e38] via-[#c89666] to-[#f5d6c6] italic font-light">Lush Atelier</span> Story
            </h1>
            <p className="text-xs md:text-sm text-[white]/50 font-light max-w-xl mx-auto leading-relaxed">
              We believe accessories are personal signposts of confidence. Solid 18K gold hand-carved to catch the light, and masterclass fragrance oils crafted to linger.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Narrative & Craft Section */}
      <section className="py-24 px-6 md:px-12 relative z-10 border-t border-[white]/5 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Gallery Showcase Cards */}
          <div className="grid grid-cols-2 gap-6 relative">
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#c89666]/5 rounded-full blur-3xl pointer-events-none"></div>

            {/* Gallery Card 1 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-4/5 rounded-[2.5rem] overflow-hidden group border border-[white]/5 shadow-2xl bg-[#110c0a]"
            >
              <div className="absolute inset-0 bg-linear-to-tr from-[#c89666]/10 to-transparent z-10 mix-blend-overlay"></div>
              <Image
                src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800"
                alt="Goldsmithing refinery"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s] ease-out"
              />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-[#050404]/90 p-6 z-20">
                <span className="text-[8px] tracking-[0.2em] font-black uppercase text-[#c89666] block mb-1">Fine Goldsmithing</span>
                <h4 className="text-[white] text-sm font-serif">18K Solid Casts</h4>
              </div>
            </motion.div>

            {/* Gallery Card 2 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-4/5 rounded-[2.5rem] overflow-hidden group border border-[white]/5 shadow-2xl mt-12 bg-[#110c0a]"
            >
              <div className="absolute inset-0 bg-linear-to-tr from-[#f5d6c6]/10 to-transparent z-10 mix-blend-overlay"></div>
              <Image
                src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800"
                alt="Oud oil distillation"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s] ease-out"
              />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-[#050404]/90 p-6 z-20">
                <span className="text-[8px] tracking-[0.2em] font-black uppercase text-[#f5d6c6] block mb-1">Olfactory Alchemy</span>
                <h4 className="text-[white] text-sm font-serif">Concentrated Oud Extracts</h4>
              </div>
            </motion.div>
          </div>

          {/* Narrative Content */}
          <div className="space-y-8 lg:pl-6">
            <span className="text-[9px] tracking-[0.4em] font-black uppercase text-[#c89666]">Crafted Without Compromise</span>
            <h2 className="text-3xl md:text-4xl font-serif text-[white] leading-tight">
              Clinical Quality Sourcing <br />
              <span className="italic text-[white]/40">Meets Opulent Expression</span>
            </h2>
            <p className="text-[white]/60 font-light leading-relaxed text-xs md:text-sm">
              At Lush Atelier, we treat jewelry crafting and fragrance formulation with clinical precision. Our gold is refined to solid 18-karat purity, alloyed for rich warm hues, and set with hand-selected diamonds. Every link is custom assembled to sit on the neck with flawless structural presence.
            </p>
            <p className="text-[white]/60 font-light leading-relaxed text-xs md:text-sm">
              For our fragrance extracts, we collaborate with veteran perfumers to source Cambodian Oud resin and Turkish roses. These raw organic materials undergo meticulous molecular distillation, aging, and concentration checks to guarantee longevity and a deep velvet silage that is unique to you.
            </p>
            <div className="pt-6 flex flex-col sm:block">
              <Link href="/" className="w-full sm:w-auto inline-block">
                <button className="w-full px-8 py-3.5 rounded-full bg-linear-to-r from-[#8e5e38] via-[#c89666] to-[#f5d6c6] hover:scale-105 transition-transform text-[#050404] text-[9px] tracking-widest font-black uppercase shadow-lg">
                  Explore Boutique
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Visionary Founder Section */}
      <section className="py-24 px-6 md:px-12 relative z-10 bg-[white]/0.5 border-y border-[white]/5 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Profile Card */}
          <div className="flex justify-center relative order-1 lg:order-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#c89666]/5 rounded-full blur-[100px] pointer-events-none z-0"></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative aspect-square w-full max-w-sm rounded-full overflow-hidden border-12 border-[white]/5 shadow-3xl z-10"
            >
              <div className="absolute inset-0 bg-linear-to-tr from-[#c89666]/20 to-transparent z-10 mix-blend-overlay"></div>
              <Image
                src="/images/about_pic.jpg"
                alt="Founder Hadarah"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="w-full h-full object-cover object-[center_15%]"
              />
            </motion.div>
          </div>

          {/* Bio Story */}
          <div className="space-y-8 order-2 lg:order-0">
            <span className="text-[9px] tracking-[0.4em] font-black uppercase text-[#c89666]">The Visionary</span>
            <h2 className="text-3xl md:text-4xl font-serif text-[white] leading-tight">
              Hadarah <br />
              <span className="italic text-[white]/40">Founder & CEO</span>
            </h2>
            <div className="relative p-8 rounded-4xl bg-[white]/1 border border-[white]/5 backdrop-blur-3xl shadow-xl">
              <div className="absolute top-6 left-6 text-6xl text-[#c89666]/10 font-serif leading-none">“</div>
              <p className="text-[white]/80 font-light italic leading-relaxed relative z-10 pl-6 text-xs md:text-sm">
                I wanted to create an experience where clinical precision meets uncompromised quality. Lush Accessories represents the ultimate personal signature—glistening fine jewelry to frame your appearance, and opulent fragrance notes to announce your presence.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Footer (Visible on Mobile & Desktop) */}
      <Footer />
    </main>
  );
}

