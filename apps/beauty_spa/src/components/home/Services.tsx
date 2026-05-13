"use client";

import React, { useState } from 'react';
import { Button } from "../ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES } from "@/constants";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
} as const;

export const Services = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedServices = showAll ? SERVICES : SERVICES.slice(0, 4);

  return (
    <section id="services" className="py-40 px-8 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
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
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                layout
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative"
              >
                <Link href={`/services/${service.id}`}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[40px] cursor-pointer">
                    <img 
                      src={service.image} 
                      alt={service.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/90 via-[var(--primary)]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                    
                    <div className="absolute bottom-0 left-0 p-10 w-full transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                      <h3 className="text-3xl font-serif text-white mb-3">{service.name}</h3>
                      <p className="text-white/70 text-sm font-light leading-relaxed max-w-[240px]">
                        {service.description}
                      </p>
                      
                      <div className="mt-8 flex items-center gap-3 text-white text-[10px] tracking-[0.3em] font-black uppercase opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <span>Learn More</span>
                        <svg width="18" height="8" viewBox="0 0 18 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.3536 4.35355C17.5488 4.15829 17.5488 3.84171 17.3536 3.64645L14.1716 0.464466C13.9763 0.269204 13.6597 0.269204 13.4645 0.464466C13.2692 0.659728 13.2692 0.976311 13.4645 1.17157L16.2929 4L13.4645 6.82843C13.2692 7.02369 13.2692 7.34027 13.4645 7.53553C13.6597 7.7308 13.9763 7.7308 14.1716 7.53553L17.3536 4.35355ZM0 4.5H17V3.5H0V4.5Z" fill="currentColor"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-24 text-center">
          <Button 
            variant="outline" 
            size="md" 
            href="/services"
            className="border-[var(--primary)]/10 text-[var(--primary)] font-bold hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 px-12 py-6 rounded-full"
          >
            {showAll ? "Show Less" : "Discover All Services"}
          </Button>
        </div>
      </div>
    </section>
  );
};
