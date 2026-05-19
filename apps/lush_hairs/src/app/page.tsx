"use client";

import React from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@lush/ui";
import { motion } from "framer-motion";
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] overflow-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 px-6">
        {/* Radical Background Glows */}
        <div className="absolute top-1/4 -left-1/4 w-[60%] h-[60%] bg-[var(--primary)]/15 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-[60%] h-[60%] bg-[var(--secondary)]/15 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>

        {/* Subtle Model Underlay */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            src="/hero-model.png"
            className="w-full h-full object-cover object-center lg:object-right mix-blend-luminosity grayscale"
          />
          {/* Gradient masking to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)] via-[var(--background)]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-[var(--background)]/40"></div>
        </div>

        <div className="max-w-4xl mx-auto z-10 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-10"
          >
            <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] animate-pulse"></span>
              <span className="text-[10px] tracking-[0.4em] uppercase font-black text-white/80">New Collection Live</span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-[120px] font-serif font-bold tracking-tighter leading-[0.8] text-white">
              Unleash <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] via-pink-400 to-[var(--secondary)] italic font-light">
                Your Bold.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
              Premium extensions, flawless frontals, and expertly crafted wigs. Step into a world where your hair is your ultimate canvas.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 pt-8 justify-center">
              <Button
                onClick={() => window.location.href = '/shop'}
                variant="primary"
                size="lg"
                rounded="full"
                className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] border-0 text-white shadow-xl hover:shadow-[var(--primary)]/20 transition-all duration-700 px-12 py-5 text-[14px] tracking-[0.4em] font-bold"
              >
                ENTER BOUTIQUE
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Collections Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="space-y-4">
              <span className="text-[var(--primary)] text-[10px] tracking-[0.4em] uppercase font-black">Curated Edits</span>
              <h2 className="text-5xl md:text-6xl font-serif text-white">The <span className="italic text-white/50">Signature</span> Collections</h2>
            </div>
            <Link href="/shop" className="text-[11px] tracking-[0.3em] uppercase font-black text-white/60 hover:text-[var(--primary)] transition-colors pb-2 border-b border-white/10">
              View All Collections —
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "The Frontal Edit", tag: "Invisible Lace", image: "/frontal-edit.png" },
              { title: "Signature Wigs", tag: "Expertly Crafted", image: "/wigs-edit.png" }
            ].map((collection, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative aspect-[16/10] rounded-[40px] overflow-hidden group cursor-pointer"
              >
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="absolute inset-0 p-10 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                  <span className="text-[10px] tracking-[0.3em] uppercase font-black text-[var(--primary)] mb-2">{collection.tag}</span>
                  <h3 className="text-3xl md:text-4xl font-serif text-white mb-6">{collection.title}</h3>
                  <Button variant="outline" className="w-fit px-8 border-white/20 text-white rounded-full text-[10px] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity delay-100">EXPLORE COLLECTION</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Lookbook / Gallery (Masonry style from beauty_spa) */}
      <section className="py-32 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 space-y-4">
            <span className="text-[var(--primary)] text-[10px] tracking-[0.4em] uppercase font-black">The Lookbook</span>
            <h2 className="text-5xl md:text-6xl font-serif text-white">Visual <span className="italic text-white/50">Storytelling</span></h2>
          </div>

          <div className="columns-2 md:columns-3 gap-6 space-y-6">
            {[
              { src: "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=2000&auto=format&fit=crop", h: "h-[400px]" },
              { src: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2070&auto=format&fit=crop", h: "h-[300px]" },
              { src: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=2072&auto=format&fit=crop", h: "h-[500px]" },
              { src: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?q=80&w=2070&auto=format&fit=crop", h: "h-[350px]" },
              { src: "https://images.unsplash.com/photo-1560869713-7d0a29430863?q=80&w=2070&auto=format&fit=crop", h: "h-[450px]" },
              { src: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=2070&auto=format&fit=crop", h: "h-[400px]" }
            ].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1 }}
                className={`break-inside-avoid relative rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl ${img.h}`}
              >
                <img src={img.src} alt="Gallery" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/60 to-transparent"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Prestige / Social Proof Section */}
      <section className="py-20 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "Styles Crafted", value: "5000+" },
              { label: "Global Shipping", value: "24/7" },
              { label: "Client Satisfaction", value: "99%" },
              { label: "Years Excellence", value: "10+" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-2"
              >
                <p className="text-4xl md:text-5xl font-serif text-white tracking-tighter">{stat.value}</p>
                <p className="text-[9px] tracking-[0.3em] uppercase font-black text-[var(--primary)]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <span className="text-[var(--primary)] text-[10px] tracking-[0.4em] uppercase font-black">The Standard</span>
            <h2 className="text-5xl md:text-6xl font-serif text-white">Crafted for <span className="italic text-white/50">Excellence</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Virgin Human Hair", desc: "100% unprocessed, double-drawn bundles for unmatched volume.", icon: "✨" },
              { title: "HD Lace Frontals", desc: "Ultra-thin, transparent lace that melts perfectly into your skin.", icon: "🎭" },
              { title: "Expert Coloring", desc: "Custom vibrant dyes and highlights that maintain hair integrity.", icon: "🎨" }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group p-10 rounded-[30px] bg-white/[0.02] border border-white/5 hover:border-[var(--primary)]/30 transition-colors"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-2xl mb-8 group-hover:bg-gradient-to-br from-[var(--primary)]/20 to-[var(--secondary)]/20 transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-serif text-white mb-4">{feature.title}</h3>
                <p className="text-white/50 font-light leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
