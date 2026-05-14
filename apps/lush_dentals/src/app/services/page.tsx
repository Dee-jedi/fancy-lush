"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SERVICES } from "@/constants";
import Link from 'next/link';

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#f8fdfb]">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-48 pb-20 px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-8">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[var(--secondary)] text-xs tracking-[0.5em] uppercase font-black"
          >
            Clinical Menu
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-serif font-bold text-[var(--primary)] leading-tight"
          >
            Our Dental <span className="italic font-light text-[var(--foreground)] opacity-40">Services</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-[var(--foreground)]/40 max-w-2xl font-light leading-relaxed"
          >
            From preventive care to advanced cosmetic transformations, we provide professional dental solutions for every smile.
          </motion.p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24 px-8 pb-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {SERVICES.map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/services/${service.id}`} className="group block">
                <div className="relative aspect-square rounded-[50px] overflow-hidden mb-8 bg-white border border-emerald-900/5 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                  <img 
                    src={service.image} 
                    alt={service.name}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </div>
                <div className="space-y-4 px-4 text-center">
                  <p className="text-[10px] tracking-[0.4em] uppercase font-black text-[var(--secondary)]">{service.tag}</p>
                  <h3 className="text-3xl font-serif text-[var(--primary)] group-hover:text-[var(--secondary)] transition-colors duration-500">{service.name}</h3>
                  <p className="text-[var(--foreground)]/50 font-light leading-relaxed text-sm">
                    {service.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
