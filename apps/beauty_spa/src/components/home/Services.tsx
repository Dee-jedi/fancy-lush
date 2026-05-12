"use client";

import React, { useState } from 'react';
import { Button } from "../ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES } from "@/constants";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};

export const Services = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedServices = showAll ? SERVICES : SERVICES.slice(0, 4);

  return (
    <section id="services" className="py-40 px-8 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center text-center mb-28 space-y-8"
        >
          <span className="text-[var(--secondary)] text-xs tracking-[0.4em] font-black uppercase">Service Menu</span>
          <h2 className="text-6xl md:text-7xl font-serif font-medium text-[var(--primary)] leading-tight tracking-tight">
            Curated <span className="italic font-light text-[var(--secondary)]">Excellence</span>
          </h2>
          <p className="text-xl text-[var(--foreground)]/40 max-w-2xl font-light leading-relaxed">
            Every treatment at Fancylush is a bespoke experience tailored to your unique beauty and wellness needs.
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          <AnimatePresence mode="popLayout">
            {displayedServices.map((service, index) => (
              <motion.div 
                key={service.name} 
                variants={itemVariants}
                layout
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative"
              >
                <div className="bg-[#faf9f6] p-10 rounded-[40px] border border-gray-100 hover:border-[var(--secondary)]/30 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(46,16,101,0.05)] group-hover:bg-white overflow-hidden">
                  <div className="relative w-full h-48 mb-8 rounded-3xl overflow-hidden group-hover:-translate-y-2 transition-transform duration-500 shadow-sm bg-white">
                    <div className="absolute inset-0 bg-[var(--primary)]/5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <img 
                      src={service.image} 
                      alt={service.name}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute top-4 left-4 z-20 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center font-serif italic font-bold text-[var(--secondary)] shadow-sm border border-gray-100">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--primary)] mb-4 tracking-tight">{service.name}</h3>
                  <p className="text-base text-[var(--foreground)]/40 font-light leading-relaxed mb-8">{service.description}</p>
                  <a href="#" className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-[var(--secondary)] group-hover:text-[var(--primary)] transition-colors">
                    Reserve Now
                    <span className="h-[2px] w-6 bg-current transition-all group-hover:w-12"></span>
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-24 text-center">
          <Button 
            variant="outline" 
            size="md" 
            onClick={() => setShowAll(!showAll)}
            className="border-[var(--primary)]/10 text-[var(--primary)] font-bold hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 px-12 py-6 rounded-full"
          >
            {showAll ? "Show Less" : "Discover All Services"}
          </Button>
        </div>
      </div>
    </section>
  );
};
