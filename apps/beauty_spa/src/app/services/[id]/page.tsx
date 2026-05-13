"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import { SERVICES } from "@/constants";
import { Button } from "@/components/ui/Button";
import Link from 'next/link';

export default function ServiceDetail() {
  const { id } = useParams();
  const router = useRouter();
  
  const service = SERVICES.find(s => s.id === id);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-8 text-center">
        <h1 className="text-4xl font-serif text-[var(--primary)] mb-6">Service Not Found</h1>
        <Button href="/services" variant="primary">Back to Services</Button>
      </div>
    );
  }

  const relatedServices = SERVICES.filter(s => s.id !== id).slice(0, 3);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img 
            src={service.image} 
            alt={service.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </motion.div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6 max-w-4xl"
          >
            <Link 
              href="/services"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-[10px] tracking-[0.3em] font-black uppercase mb-8"
            >
              <svg width="18" height="8" viewBox="0 0 18 8" fill="none" className="rotate-180">
                <path d="M17.3536 4.35355C17.5488 4.15829 17.5488 3.84171 17.3536 3.64645L14.1716 0.464466C13.9763 0.269204 13.6597 0.269204 13.4645 0.464466C13.2692 0.659728 13.2692 0.976311 13.4645 1.17157L16.2929 4L13.4645 6.82843C13.2692 7.02369 13.2692 7.34027 13.4645 7.53553C13.6597 7.7308 13.9763 7.7308 14.1716 7.53553L17.3536 4.35355ZM0 4.5H17V3.5H0V4.5Z" fill="currentColor"/>
              </svg>
              Back to menu
            </Link>
            <h1 className="text-6xl md:text-8xl font-serif text-white leading-tight italic">
              {service.name}
            </h1>
            <div className="flex flex-wrap justify-center gap-6 mt-12">
              <div className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full">
                <span className="text-[10px] tracking-widest text-white/60 uppercase block mb-1">Price Starts at</span>
                <span className="text-xl font-bold text-white tracking-widest">{service.price}</span>
              </div>
              <div className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full">
                <span className="text-[10px] tracking-widest text-white/60 uppercase block mb-1">Duration</span>
                <span className="text-xl font-bold text-white tracking-widest">{service.duration}</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ height: "100%" }}
          animate={{ height: "0%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-[var(--primary)] z-[100]"
        />
      </section>

      {/* Content Section */}
      <section className="py-32 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <span className="text-[var(--secondary)] text-xs tracking-[0.4em] font-black uppercase">Service Details</span>
              <h2 className="text-5xl font-serif text-[var(--primary)] leading-tight">
                About the <span className="italic">Experience</span>
              </h2>
            </div>
            <p className="text-xl text-[var(--foreground)]/60 font-light leading-relaxed">
              {service.fullDescription}
            </p>
            <div className="pt-8 flex justify-center">
              <Button 
                href={`/book?service=${service.id}`} 
                className="px-12 py-4 min-w-[240px] flex flex-col items-center leading-tight gap-1"
              >
                <span className="text-[10px] tracking-[0.4em] uppercase font-black opacity-60">Book</span>
                <span className="text-lg font-serif italic">Reservation</span>
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-[60px] overflow-hidden shadow-2xl"
          >
            <img 
              src={service.image} 
              alt={service.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-32 bg-[#faf9f6] px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h3 className="text-4xl font-serif text-[var(--primary)]">Other Recommendations</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {relatedServices.map((item) => (
              <Link key={item.id} href={`/services/${item.id}`} className="group cursor-pointer">
                <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                </div>
                <h4 className="text-2xl font-serif text-[var(--primary)] mb-2">{item.name}</h4>
                <p className="text-[10px] tracking-widest uppercase text-[var(--foreground)]/40 font-bold">{item.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
