"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export function FounderMessage() {
  return (
    <section className="py-24 md:py-32 bg-[#fcfbf9] relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center gap-12 md:gap-24">

        {/* Image Side */}
        <div className="w-full md:w-5/12 relative">
          <div className="relative h-[500px] md:h-[700px] w-full rounded-sm overflow-hidden z-10">
            <Image
              src="/founder.jpg"
              alt="Abidemi Olayioye - Founder & CEO"
              fill
              className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-1000"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 w-full h-full border border-[#d4af37]/30 z-0"></div>
        </div>

        {/* Text Side */}
        <div className="w-full md:w-7/12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#d4af37] block mb-6">Vision & Leadership</span>

            <h2 className="text-3xl md:text-5xl font-serif leading-tight mb-8 text-[#1a1a1a]">
              "To become Africa’s leading beauty, wellness, and aesthetics academy, raising <span className="italic text-[#8c8c8c]">globally competitive</span> professionals and entrepreneurs."
            </h2>

            <div className="space-y-6 text-[#595959] font-light text-sm md:text-base leading-relaxed max-w-xl">
              <p className="font-medium text-[#1a1a1a]">
                Our mission is to equip individuals with life-changing skills that promote financial independence and career success.
              </p>
              <p>
                Are you looking to learn a valuable skill in beauty, wellness, hair care, spa therapy, makeup artistry, cosmetics, or entrepreneurship? Do you know teenagers, relatives, or friends who want to build a successful future through practical, professional training?
              </p>
              <p>
                Whether you are a student, graduate, entrepreneur, stay-at-home parent, job seeker, or exploring a new career path, our programs are intricately designed for you. This is your opportunity to build a successful future through practical, professional training.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-[#1a1a1a]/10">
              <h3 className="font-serif text-2xl text-[#1a1a1a]">Abidemi Olayioye</h3>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8c8c8c] mt-2">Founder & CEO, Fancylush</p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
