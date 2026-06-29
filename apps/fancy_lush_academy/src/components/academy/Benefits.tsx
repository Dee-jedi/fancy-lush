"use client";

import React from "react";
import { motion } from "framer-motion";

export function Benefits() {
  const benefits = [
    { title: "World-Class Curriculum", desc: "Internationally relevant education ranging from fundamental basics to Master Certification.", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
    { title: "Clinical Mastery", desc: "Prioritizing practical hands-on training, live client sessions, and state-of-the-art equipment exposure.", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" },
    { title: "Business Incubation", desc: "Advanced coaching in entrepreneurship, branding, social media marketing, and client acquisition.", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { title: "Global Opportunities", desc: "Industry-recognized certification, internships, and direct mentorship from industry elite.", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#1a1a1a] text-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="text-center mb-16 md:mb-24">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#d4af37] block mb-4">The FL Standard</span>
          <h2 className="text-3xl md:text-5xl font-serif">What Makes Us Different</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (idx % 5) * 0.1 }}
              className="border border-white/5 bg-white/[0.02] p-6 hover:bg-white/[0.05] hover:border-[#d4af37]/30 transition-all duration-500 rounded-sm flex flex-col items-start"
            >
              <div className="w-10 h-10 rounded-full border border-[#d4af37]/50 flex items-center justify-center mb-6 text-[#d4af37]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={benefit.icon}></path>
                </svg>
              </div>
              <h3 className="text-base font-serif mb-3">{benefit.title}</h3>
              <p className="text-white/50 text-xs font-light leading-relaxed">
                {benefit.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
