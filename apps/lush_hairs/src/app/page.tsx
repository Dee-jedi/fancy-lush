"use client";

import React from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@lush/ui";
import { motion } from "framer-motion";
import Link from 'next/link';
import Image from 'next/image';
import { useSearch } from '@/context/SearchContext';

export default function Home() {
  const { products, loading } = useSearch();
  const lookbookProducts = products.slice(0, 6);
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
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            <Image
              src="/hero-model.png"
              alt="Lush Hairs hero model"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center lg:object-right mix-blend-luminosity grayscale"
            />
          </motion.div>
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
              <Link href="/shop">
                <Button
                  variant="primary"
                  size="lg"
                  rounded="full"
                  className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] border-0 text-white shadow-xl hover:shadow-[var(--primary)]/20 transition-all duration-700 px-12 py-5 text-[14px] tracking-[0.4em] font-bold cursor-pointer"
                >
                  ENTER BOUTIQUE
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Signature Collections Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="space-y-4">
              <span className="text-[var(--primary)] text-[10px] tracking-[0.4em] uppercase font-black">Curated Edits</span>
              <h2 className="text-5xl md:text-6xl font-serif text-white">The <span className="italic text-white/50">Signature</span> Collections</h2>
            </div>
            <Link href="/shop" className="text-[11px] tracking-[0.3em] uppercase font-black text-white/60 hover:text-[var(--primary)] transition-colors pb-2 border-b border-white/10">
              View All Products —
            </Link>
          </div>

          <div className="columns-2 md:columns-3 gap-6 space-y-6">
            {loading ? (
              /* Shimmer skeletons */
              Array.from({ length: 6 }).map((_, idx) => (
                <div 
                  key={idx}
                  className={`break-inside-avoid relative rounded-[2rem] bg-white/[0.02] border border-white/5 overflow-hidden animate-pulse ${
                    ["h-[400px]", "h-[300px]", "h-[500px]", "h-[350px]", "h-[450px]", "h-[400px]"][idx % 6]
                  }`}
                >
                  <div className="absolute bottom-0 inset-x-0 p-8 space-y-3">
                    <div className="h-5 bg-white/5 rounded-xl w-3/4 animate-[shimmer_2s_infinite]"></div>
                    <div className="h-3 bg-white/5 rounded-lg w-1/4 animate-[shimmer_2s_infinite]"></div>
                  </div>
                </div>
              ))
            ) : lookbookProducts.length === 0 ? (
              /* Fallback default curated collections (defensive check) */
              [
                { src: "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=2000&auto=format&fit=crop", h: "h-[400px]", name: "Lace Frontal", price: 120000 },
                { src: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2070&auto=format&fit=crop", h: "h-[300px]", name: "HD Frontal Wig", price: 180000 },
                { src: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=2072&auto=format&fit=crop", h: "h-[500px]", name: "Curly Wave Bundle", price: 150000 },
                { src: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?q=80&w=2070&auto=format&fit=crop", h: "h-[350px]", name: "Bone Straight Special", price: 220000 },
                { src: "https://images.unsplash.com/photo-1560869713-7d0a29430863?q=80&w=2070&auto=format&fit=crop", h: "h-[450px]", name: "Bespoke Custom Blend", price: 250000 },
                { src: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=2070&auto=format&fit=crop", h: "h-[400px]", name: "Luxury Platinum Angle", price: 300000 }
              ].map((img, i) => {
                const isPink = i % 2 === 0;
                const glowClass = isPink
                  ? "border-2 border-pink-500/20 hover:border-pink-500/60 shadow-[0_0_15px_rgba(251,113,133,0.12)] hover:shadow-[0_0_25px_rgba(251,113,133,0.4)]"
                  : "border-2 border-purple-500/20 hover:border-purple-500/60 shadow-[0_0_15px_rgba(139,92,246,0.12)] hover:shadow-[0_0_25px_rgba(139,92,246,0.4)]";

                return (
                  <Link key={i} href="/shop" className="block break-inside-avoid">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (i % 3) * 0.1 }}
                      className={`relative rounded-[2rem] overflow-hidden group cursor-pointer transition-all duration-700 ${glowClass} ${img.h}`}
                    >
                      <Image 
                        src={img.src} 
                        alt={img.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.2s] group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/70 via-[var(--background)]/10 to-transparent opacity-40 group-hover:opacity-75 transition-opacity duration-700"></div>
                    </motion.div>
                  </Link>
                );
              })
            ) : (
              /* Real Firebase Shoppable Collections */
              lookbookProducts.map((product, i) => {
                const heights = ["h-[400px]", "h-[300px]", "h-[500px]", "h-[350px]", "h-[450px]", "h-[400px]"];
                const h = heights[i % heights.length];
                const isPink = i % 2 === 0;
                const glowClass = isPink
                  ? "border-2 border-pink-500/20 hover:border-pink-500/60 shadow-[0_0_15px_rgba(251,113,133,0.12)] hover:shadow-[0_0_25px_rgba(251,113,133,0.4)]"
                  : "border-2 border-purple-500/20 hover:border-purple-500/60 shadow-[0_0_15px_rgba(139,92,246,0.12)] hover:shadow-[0_0_25px_rgba(139,92,246,0.4)]";

                return (
                  <Link key={product.id} href={`/products/${product.id}`} className="block break-inside-avoid">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (i % 3) * 0.1 }}
                      className={`relative rounded-[2rem] overflow-hidden group cursor-pointer transition-all duration-700 ${glowClass} ${h}`}
                    >
                      <Image 
                        src={product.image} 
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.2s] group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/70 via-[var(--background)]/10 to-transparent opacity-40 group-hover:opacity-75 transition-opacity duration-700"></div>
                    </motion.div>
                  </Link>
                );
              })
            )}
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
