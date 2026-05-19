"use client";

import React from "react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden z-10">

      {/* Subtle Video Background Loop */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30 mix-blend-luminosity grayscale pointer-events-none"
        >
          <source src="/videos/vid1.mp4" type="video/mp4" />
        </video>
        {/* Deep luxury vignettes */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/40 via-transparent to-[#030303] z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-transparent to-[#030303] z-10" />
      </div>

      <div className="max-w-4xl mx-auto z-20 text-center space-y-16">

        {/* Core Monolith Title Lockup */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-[9px] tracking-[0.45em] font-black text-[#a78bfa]/60 uppercase"
          >
            THE GATEWAY PORTAL
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[95px] font-extralight tracking-[0.35em] text-white uppercase select-none leading-none"
          >
            FANCY LUSH
          </motion.h1>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="text-[10px] sm:text-xs font-black tracking-[0.8em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-[#a78bfa] to-[#6366f1] block pl-[0.8em]"
          >
            EMPIRE
          </motion.span>
        </div>

        {/* Minimalist Interactive Brand Index */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-3 max-w-xl mx-auto"
        >
          {[
            { name: "SPA", target: "#ecosystem", accent: "#c89666" },
            { name: "ATELIER", target: "#ecosystem", accent: "#a78bfa" },
            { name: "HAIRS", target: "#ecosystem", accent: "#ec4899" },
            { name: "DENTALS", target: "#ecosystem", accent: "#0d9488" }
          ].map((item) => (
            <a
              key={item.name}
              href={item.target}
              className="px-6 py-2.5 rounded-full bg-[#0a0a0c]/60 border border-white/5 hover:border-[#6366f1]/40 text-[10px] tracking-[0.25em] font-semibold text-white/50 hover:text-white hover:bg-white/5 transition-all duration-300 shadow-lg shadow-black/40"
              style={{
                "--hover-accent": item.accent
              } as React.CSSProperties}
            >
              {item.name}
            </a>
          ))}
        </motion.div>

        {/* Cinematic Vertical Scrolling Ribbon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="pt-12 flex flex-col items-center gap-4"
        >
          <span className="text-[8px] tracking-[0.4em] font-black text-white/30 uppercase">
            SCROLL TO ENTER
          </span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-[#6366f1]/50 to-transparent relative overflow-hidden">
            <span className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-transparent via-[#a78bfa] to-transparent animate-bounce" style={{ animationDuration: '2.5s' }}></span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
