"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from 'next/link';
import Image from 'next/image';

interface Service {
  id: string;
  name: string;
  image: string;
  price: string;
  duration: string;
  fullDescription: string;
}

export default function ServiceDetailClient({ service, specialists, relatedServices }: { service: Service, specialists: any[], relatedServices: Service[] }) {
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
          <Image 
            src={service.image} 
            alt={service.name}
            fill
            priority
            className="object-cover"
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
            <Image 
              src={service.image} 
              alt={service.name}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Specialist Section - Only for Massage */}
      {service.id.includes('massage') && (
        <section className="py-32 px-8 bg-white border-t border-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24 space-y-4">
              <span className="text-[var(--secondary)] text-xs tracking-[0.4em] font-black uppercase">Expertise</span>
              <h2 className="text-5xl md:text-6xl font-serif text-[var(--primary)]">Meet our <span className="italic">Specialists</span></h2>
              <div className="w-20 h-px bg-[var(--secondary)] mx-auto mt-8" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {specialists.map((specialist: any, idx: number) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="group"
                >
                  <Link href={`/specialists/${specialist.id}`}>
                    <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden mb-8 shadow-xl cursor-pointer text-white">
                      <Image src={specialist.image} alt={specialist.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                      <div className="absolute bottom-8 left-8 right-8">
                         <p className="font-serif text-2xl mb-1">{specialist.name}</p>
                         <p className="text-[var(--secondary)] text-[10px] tracking-widest uppercase font-black">{specialist.specialty}</p>
                      </div>
                    </div>
                  </Link>
                  
                  <div className="space-y-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} width="12" height="12" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        ))}
                      </div>
                      <span className="text-xs font-bold text-[var(--primary)]">{specialist.rating}</span>
                      <span className="text-[10px] text-gray-400 font-medium">({specialist.reviews.length} reviews)</span>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed italic line-clamp-2">"{specialist.bio}"</p>
                    <Link 
                      href={`/specialists/${specialist.id}`}
                      className="inline-block text-[10px] tracking-widest uppercase font-black text-[var(--secondary)] border-b border-[var(--secondary)]/20 pb-1 hover:border-[var(--secondary)] transition-all"
                    >
                      Read Reviews
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

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
                  <Image 
                    src={item.image} 
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
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
