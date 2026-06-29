"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ACADEMY_SCHOOLS } from "@/constants/academyData";

export function SchoolsPreview() {
  const featuredSchools = ACADEMY_SCHOOLS.slice(0, 4);

  return (
    <section className="py-24 md:py-32 bg-[#fcfbf9] text-[#1a1a1a]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#d4af37] block mb-4">Our Faculties</span>
            <h2 className="text-3xl md:text-5xl font-serif mb-6">12 Specialized Schools</h2>
            <p className="text-[#595959] font-light leading-relaxed">
              From advanced skincare to cosmetic dentistry and beauty entrepreneurship. We offer comprehensive, specialized training to help you master every dimension of the modern beauty industry.
            </p>
          </div>
          <Link href="/programs" className="mt-8 md:mt-0 group flex items-center space-x-4 w-max shrink-0">
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold">View All Programs</span>
            <div className="w-10 h-10 rounded-full border border-[#1a1a1a] flex items-center justify-center group-hover:bg-[#1a1a1a] group-hover:text-white transition-all duration-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredSchools.map((school, idx) => (
            <Link href={`/programs/${school.id}`} key={idx} className="block">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative h-[300px] md:h-[400px] w-full rounded-sm overflow-hidden mb-6">
                  <Image 
                    src={school.image}
                    alt={school.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                </div>
                <h3 className="text-xl font-serif mb-2 group-hover:text-[#d4af37] transition-colors">{school.name}</h3>
                <p className="text-sm font-light text-[#8c8c8c] line-clamp-2">{school.description}</p>
              </motion.div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
