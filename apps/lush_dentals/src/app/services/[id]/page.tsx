"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/constants";
import Image from 'next/image';
import Link from 'next/link';

export default function ServiceDetailPage() {
  const { id } = useParams();
  const service = SERVICES.find(s => s.id === id);

  if (!service) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-serif">Service Not Found</h1>
          <Button href="/services">Back to Services</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fdfb]">
      <Header />
      
      <div className="max-w-7xl mx-auto px-8 pt-48 pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl"
          >
            <Image 
              src={service.image} 
              alt={service.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
            />
            <div className="absolute top-10 left-10">
              <span className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-full text-[10px] tracking-[0.4em] font-black uppercase text-[var(--primary)] shadow-sm">
                {service.tag}
              </span>
            </div>
          </motion.div>

          {/* Details */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <Link href="/services" className="text-[10px] tracking-[0.4em] uppercase font-black text-[var(--secondary)] hover:opacity-70 transition-opacity">
                &larr; Back to Services
              </Link>
              <h1 className="text-6xl md:text-8xl font-serif font-bold text-[var(--primary)] leading-[0.95] tracking-tighter">{service.name}</h1>
            </div>

            <p className="text-xl text-[var(--foreground)]/60 font-light leading-relaxed">
              {service.fullDescription}
            </p>

            <div className="pt-8 space-y-10">
              <div className="p-8 bg-emerald-50 rounded-[40px] border border-emerald-900/5">
                <h4 className="text-xs font-black tracking-[0.3em] uppercase text-[var(--primary)] mb-6">Service Features</h4>
                <ul className="space-y-4">
                  {["Painless Procedure", "State-of-the-art Equipment", "Certified Experts", "Post-treatment Care"].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-[var(--foreground)]/70">
                      <div className="w-5 h-5 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <span className="text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <Button size="lg" href="/book" className="shadow-xl">
                  BOOK APPOINTMENT
                </Button>
                <Button variant="outline" size="lg" href="/services" className="font-bold">
                  OTHER SERVICES
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
