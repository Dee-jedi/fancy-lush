"use client";

import React from 'react';
import { motion } from "framer-motion";
import Image from 'next/image';
import { SERVICES } from "@/constants";
import Link from 'next/link';

export const Services = () => {
  return (
    <section className="py-24 md:py-40 bg-white px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Centered Header for Mobile & Desktop */}
        <div className="flex flex-col items-center text-center space-y-6 md:space-y-8 mb-16 md:mb-28">
          <motion.div 
            initial={{ opacity: 1 }}
            className="inline-flex items-center gap-4"
          >
            <span className="h-[1px] w-8 md:w-12 bg-[var(--secondary)]"></span>
            <span className="text-[var(--secondary)] text-[10px] tracking-[0.4em] uppercase font-black">Our Expertise</span>
            <span className="h-[1px] w-8 md:w-12 bg-[var(--secondary)]"></span>
          </motion.div>
          
          <h2 className="text-4xl md:text-7xl font-serif font-bold text-[var(--primary)] leading-tight max-w-4xl">
            Precision Dentistry, <br className="hidden md:block"/> 
            <span className="italic font-light text-[var(--foreground)] opacity-30">Tailored to You</span>
          </h2>
          
          <p className="text-sm md:text-lg text-[var(--foreground)]/40 max-w-xl font-light leading-relaxed">
            From preventive checkups to complex aesthetic transformations, we offer the full spectrum of dental excellence.
          </p>
        </div>

        {/* Unique Featured Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 auto-rows-[300px] md:auto-rows-[400px]">
          {SERVICES.slice(0, 5).map((service, index) => {
            // Layout logic: 1st is large (span 8), 2nd is small (span 4), 3rd/4/5 are span 4
            const isLarge = index === 0;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative overflow-hidden rounded-[30px] md:rounded-[50px] border border-emerald-900/5 ${
                  isLarge ? 'md:col-span-8 md:row-span-1' : 'md:col-span-4'
                }`}
              >
                <Link href={`/services/${service.id}`} className="block h-full w-full relative">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-950/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                    <span className="text-[8px] md:text-[10px] tracking-[0.3em] uppercase font-black text-[var(--secondary)] mb-2 md:mb-4 block">
                      {service.tag}
                    </span>
                    <h3 className={`font-serif text-white mb-2 md:mb-4 leading-tight ${isLarge ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl'}`}>
                      {service.name}
                    </h3>
                    <p className={`text-white/60 font-light leading-relaxed transition-all duration-500 line-clamp-2 md:line-clamp-none ${
                      isLarge ? 'text-sm md:text-base max-w-md' : 'text-xs md:text-sm'
                    }`}>
                      {service.description}
                    </p>
                    
                    <div className="mt-6 md:mt-8 flex items-center gap-3 text-white text-[9px] tracking-[0.2em] font-black uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      <span>View Procedure</span>
                      <svg width="18" height="8" viewBox="0 0 18 8" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 4h16m-4-3l4 3-4 3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
        
        {/* View All CTA */}
        <div className="mt-16 md:mt-24 text-center">
          <Link 
            href="/services" 
            className="inline-flex items-center gap-4 text-[11px] md:text-xs tracking-[0.4em] font-black uppercase text-[var(--primary)] group"
          >
            <span>View All Clinical Services</span>
            <div className="w-10 h-10 rounded-full border border-emerald-900/10 flex items-center justify-center group-hover:bg-[var(--primary)] group-hover:text-white transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};
