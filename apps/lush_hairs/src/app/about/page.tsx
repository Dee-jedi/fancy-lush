"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@lush/ui";
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-(--background) overflow-hidden">
      <Header />

      {/* Hero Narrative Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Parallax Backdrop Styling Details */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#08080b]/75 z-10"></div>
          <Image
            src="/hair-texture.png"
            alt="Atelier Hair Texture"
            fill
            priority
            className="w-full h-full object-cover grayscale object-center opacity-70"
          />
          {/* Glowing Radial Vignette Mask */}
          <div className="absolute inset-0 bg-linear-to-t from-[#08080b] via-transparent to-[#08080b]/60 z-20"></div>
          <div className="absolute top-1/4 -left-1/4 w-[60%] h-[60%] bg-(--primary)/15 rounded-full blur-[150px] mix-blend-screen pointer-events-none z-10"></div>
          <div className="absolute bottom-1/4 -right-1/4 w-[60%] h-[60%] bg-(--secondary)/15 rounded-full blur-[150px] mix-blend-screen pointer-events-none z-10"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center z-30 relative pt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-6"
          >
            <span className="text-[10px] tracking-[0.4em] font-black uppercase text-(--primary) bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-md">
              Atelier of Bold Expression
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white tracking-tight">
              The <span className="text-transparent bg-clip-text bg-linear-to-r from-(--primary) via-pink-400 to-(--secondary) italic font-light">Lush Hairs</span> Story
            </h1>
            <p className="text-base md:text-lg text-white/50 font-light max-w-2xl mx-auto leading-relaxed">
              We believe your hair is your ultimate canvas. Sourced ethically from single donors, aligned with clinical precision, and crafted into works of sheer wearable art.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Narrative & Craft Section */}
      <section className="py-32 px-6 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Gallery Showcase Cards */}
          <div className="grid grid-cols-2 gap-6 relative">
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-(--primary)/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Gallery Card 1 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-4/5 rounded-[2.5rem] overflow-hidden group border border-white/5 shadow-2xl"
            >
              <div className="absolute inset-0 bg-linear-to-tr from-(--primary)/10 to-transparent z-10 mix-blend-overlay"></div>
              <Image
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800"
                alt="Bespoke Hair Wefts"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s] ease-out"
              />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-[#08080b]/90 p-6 z-20">
                <span className="text-[8px] tracking-[0.2em] font-black uppercase text-(--primary) block mb-1">Ethical Sourcing</span>
                <h4 className="text-white text-base font-serif">100% Raw Virgin</h4>
              </div>
            </motion.div>

            {/* Gallery Card 2 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-4/5 rounded-[2.5rem] overflow-hidden group border border-white/5 shadow-2xl mt-12"
            >
              <div className="absolute inset-0 bg-linear-to-tr from-(--secondary)/10 to-transparent z-10 mix-blend-overlay"></div>
              <Image
                src="https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=800"
                alt="Expert Lace Frontals"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s] ease-out"
              />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-[#08080b]/90 p-6 z-20">
                <span className="text-[8px] tracking-[0.2em] font-black uppercase text-(--secondary) block mb-1">Expert Craft</span>
                <h4 className="text-white text-base font-serif">HD Melt Lace</h4>
              </div>
            </motion.div>
          </div>

          {/* Narrative Content */}
          <div className="space-y-8 lg:pl-6">
            <span className="text-[10px] tracking-[0.4em] font-black uppercase text-(--primary)">Crafted Without Compromise</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
              Clinical Precision <br />
              <span className="italic text-white/40">Meets Pure Luxury</span>
            </h2>
            <p className="text-white/60 font-light leading-relaxed text-sm md:text-base">
              At Lush Hairs, our mission is to elevate the standard of luxury extensions. Every single bundle is hand-selected, cleaned with active organic infusions, and undergoes rigorous alignment testing to ensure raw single-donor cuticles flow in one uniform direction.
            </p>
            <p className="text-white/60 font-light leading-relaxed text-sm md:text-base">
              Our HD Lace frontals are carefully ventilated by veteran artisans, tying each strand with precision micro-knots to guarantee a melt-in lace interface that is completely invisible to the eye.
            </p>
            <div className="pt-6 flex flex-col sm:block">
              <Link href="/shop" className="w-full sm:w-auto inline-block">
                <Button
                  variant="primary"
                  rounded="full"
                  className="bg-linear-to-r from-(--primary) to-(--secondary) border-0 text-white px-10 py-4 text-[10px] tracking-widest font-black cursor-pointer w-full"
                >
                  EXPLORE STYLES
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Visionary Founder Section */}
      <section className="py-32 px-6 relative z-10 bg-white/1 border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Bio Story */}
          <div className="space-y-8 order-2 lg:order-1">
            <span className="text-[10px] tracking-[0.4em] font-black uppercase text-(--primary)">The Visionary</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
              Hadarah <br />
              <span className="italic text-white/40">Founder & CEO</span>
            </h2>
            <div className="relative p-8 rounded-4xl bg-white/2 border border-white/5 backdrop-blur-3xl shadow-xl">
              <div className="absolute top-6 left-6 text-6xl text-(--primary)/10 font-serif leading-none">“</div>
              <p className="text-white/80 font-light italic leading-relaxed relative z-10 pl-6 text-sm md:text-base">
                I wanted to create an experience where clinical precision meets uncompromised quality. Lush Hairs is more than a boutique; it is a commitment to your confidence, your power, and your unique expression.
              </p>
            </div>
          </div>

          {/* Profile Card */}
          <div className="order-1 lg:order-2 flex justify-center relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-(--primary)/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative aspect-square w-full max-w-md rounded-full overflow-hidden border-12 border-white/5 shadow-3xl z-10"
            >
              <div className="absolute inset-0 bg-linear-to-tr from-(--primary)/20 to-transparent z-10 mix-blend-overlay"></div>
              <Image
                src="/images/about_pic.jpg"
                alt="Founder Hadarah"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="w-full h-full object-cover grayscale object-top"
              />
            </motion.div>
          </div>

        </div>
      </section>

      {/* Connect module */}
      <section className="py-32 px-6 relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <span className="text-[10px] tracking-[0.4em] font-black uppercase text-(--primary)">Join the Atelier</span>
          <h2 className="text-4xl md:text-6xl font-serif text-white">Connect & <span className="italic text-white/40">Express Yourself</span></h2>
          <p className="text-white/50 font-light max-w-lg mx-auto text-xs md:text-sm leading-relaxed">
            Follow our visual diaries, peek behind the scenes at raw weft production, and share your signature bold look with us!
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-6">
            <button
              onClick={() => window.open('https://instagram.com')}
              className="group relative px-8 py-4 rounded-full overflow-hidden border border-white/10 hover:border-transparent bg-white/5 transition-all duration-500 hover:scale-105"
            >
              <div className="absolute inset-0 bg-linear-to-r from-pink-500 to-(--primary) opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
              <span className="relative z-10 text-[10px] font-black tracking-widest uppercase text-white">Instagram — @fancylush_hairs</span>
            </button>
            <button
              onClick={() => window.open('https://tiktok.com')}
              className="group relative px-8 py-4 rounded-full overflow-hidden border border-white/10 hover:border-transparent bg-white/5 transition-all duration-500 hover:scale-105"
            >
              <div className="absolute inset-0 bg-linear-to-r from-black to-(--secondary) opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
              <span className="relative z-10 text-[10px] font-black tracking-widest uppercase text-white">TikTok — @fancylush_hairs</span>
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
