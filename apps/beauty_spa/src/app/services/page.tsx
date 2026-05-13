"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { SERVICES } from "@/constants";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-48 pb-20 px-8 bg-[#faf9f6]">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[var(--secondary)] text-xs tracking-[0.4em] font-black uppercase"
          >
            Our Menu
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-serif font-medium text-[var(--primary)] leading-tight tracking-tight"
          >
            The <span className="italic font-light text-[var(--secondary)]">Collection</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-[var(--foreground)]/40 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Explore our curated selection of bespoke treatments, each designed to rejuvenate your spirit and enhance your natural beauty.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          {SERVICES.map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/services/${service.id}`} className="block group">
                <div className="relative aspect-[16/9] rounded-[40px] overflow-hidden mb-10 shadow-lg">
                  <img 
                    src={service.image} 
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700" />
                </div>
                <div className="flex items-baseline justify-between gap-4 mb-4">
                  <h2 className="text-2xl md:text-3xl font-serif font-medium text-[var(--primary)] tracking-tight leading-tight group-hover:text-[var(--secondary)] transition-colors">{service.name}</h2>
                  <span className="text-[var(--secondary)] font-serif italic text-lg md:text-xl whitespace-nowrap">{service.price}</span>
                </div>
                <p className="text-lg text-[var(--foreground)]/60 font-light leading-relaxed mb-8">
                  {service.description}
                </p>
              </Link>
              
              <div className="pt-4 flex items-center justify-between border-t border-gray-50 mt-4">
                <Button href={`/book?service=${service.id}`} variant="outline" size="sm" className="px-8 py-4">
                  Book Treatment
                </Button>
                <div className="h-[1px] flex-grow ml-8 bg-gray-100 hidden sm:block" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-40 px-8 bg-[var(--primary)] text-white text-center">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-4xl md:text-5xl font-serif italic font-light leading-snug">
            Ready to experience true tranquility?
          </h2>
          <Button 
            href="/" 
            className="!bg-white !text-[#2e1065] hover:bg-white/90 px-16 py-7 border-none shadow-2xl transition-all duration-700 hover:scale-110 active:scale-95"
          >
            Return Home
          </Button>
        </div>
      </section>
    </main>
  );
}
