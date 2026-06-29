"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.png"
          alt="Luxury Academy Interior"
          fill
          sizes="100vw"
          priority
          style={{ objectFit: "cover", objectPosition: "center right" }}
        />
        {/* Wide, multi-stop gradient so the image gently fades into the text area */}
        <div className="absolute inset-0 bg-[#fcfbf9]/70 md:bg-transparent md:bg-linear-to-b from-[#fcfbf9]/80 via-transparent to-[#fcfbf9]/80"></div>
        {/* Mobile: full overlay so text is readable */}
        <div className="absolute inset-0 md:hidden bg-[#fcfbf9]/60"></div>
      </div>

      <div className="max-w-[1600px] w-full mx-auto px-6 md:px-16 relative z-20 flex flex-col justify-center items-center text-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center space-x-4 mb-6 md:mb-8"
        >
          <div className="w-8 md:w-12 h-px bg-[#d4af37]"></div>
          <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-bold text-[#d4af37]">Intake: 31st July, 2026</span>
          <div className="w-8 md:w-12 h-px bg-[#d4af37]"></div>
        </motion.div>

        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[8rem] font-serif leading-[1.2] md:leading-none tracking-tight mb-8 md:mb-12 flex flex-wrap justify-center items-baseline gap-x-3 md:gap-x-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[#1a1a1a]"
          >
            Learn.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#8c8c8c] italic font-light"
          >
            Earn.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[#1a1a1a] flex items-center"
          >
            Lead<span className="text-[#d4af37]">.</span>
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-base sm:text-lg md:text-xl text-[#595959] font-light max-w-sm sm:max-w-md lg:max-w-2xl leading-[1.6] md:leading-[1.8] mb-10 md:mb-12"
        >
          Transforming Passion into Profitable Beauty Careers. A premier training institution offering internationally relevant education in Beauty, Spa, Wellness, Aesthetics, Hair, Nails, Permanent Makeup, and Entrepreneurship.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Link href="/register" className="group flex flex-col items-center space-y-4">
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
