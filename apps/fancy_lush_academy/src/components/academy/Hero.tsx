"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center pt-32 pb-20 md:pt-20 md:pb-0 overflow-hidden">
      <div className="absolute inset-0 z-0 flex flex-col md:flex-row">
        <div className="absolute inset-0 md:relative md:w-[45%] lg:w-[40%] bg-[#fcfbf9]/93 md:bg-[#fcfbf9] z-10 md:z-0"></div>
        <div className="absolute inset-0 md:relative md:w-[55%] lg:w-[60%] h-full z-0">
          <Image
            src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2000"
            alt="Luxury Background"
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
            className="object-cover object-center scale-105"
          />
          <div className="absolute inset-0 hidden md:block bg-linear-to-r from-[#fcfbf9] via-[#fcfbf9]/50 to-transparent"></div>
        </div>
      </div>

      <div className="max-w-[1600px] w-full mx-auto px-6 md:px-16 relative z-20 flex flex-col justify-center">

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center space-x-4 mb-6 md:mb-8"
        >
          <div className="w-8 md:w-12 h-[1px] bg-[#d4af37]"></div>
          <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-bold text-[#d4af37]">Intake: July 1st</span>
        </motion.div>

        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[9rem] font-serif leading-[1.1] md:leading-[0.9] tracking-tight mb-8 md:mb-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="block text-[#1a1a1a]"
          >
            Learn The
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="block text-[#8c8c8c] italic font-light ml-4 sm:ml-12 md:ml-32"
          >
            Art Of
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="block text-[#1a1a1a]"
          >
            Luxury.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-base sm:text-lg md:text-xl text-[#595959] font-light max-w-sm sm:max-w-md lg:max-w-xl leading-[1.6] md:leading-[1.8] mb-10 md:mb-12 ml-2 sm:ml-6 md:ml-12 border-l border-[#d4af37]/30 pl-4 md:pl-6"
        >
          The premier institution for aesthetic excellence. Offering rigorous physical masterclasses in Ilorin and comprehensive virtual programs globally.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="ml-4 md:ml-12"
        >
          <Link href="/register" className="group flex items-center space-x-6 w-max">
            <div className="w-16 h-16 rounded-full border border-[#1a1a1a] flex items-center justify-center group-hover:bg-[#1a1a1a] group-hover:text-white transition-all duration-500">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </div>
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold group-hover:tracking-[0.3em] transition-all duration-500">Begin Your Journey</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
