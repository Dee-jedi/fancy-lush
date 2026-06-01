"use client";

import React from 'react';
import { motion } from "framer-motion";
import Image from 'next/image';
import { Button } from "../ui/Button";

export const Hero = () => {
  return (
    <section className="relative pt-16 md:pt-24 bg-(--background) overflow-hidden">

      {/* Background emerald glow top-right */}
      <div className="absolute top-0 right-0 w-1/2 h-3/5 bg-(--primary)/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30%] h-2/5 bg-(--secondary)/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">

        {/* Top label row — centered */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-4 pt-16 md:pt-24 mb-8"
        >
          <span className="h-px w-12 bg-(--secondary)" />
          <span className="text-(--secondary) text-[10px] tracking-[0.4em] uppercase font-black">
            Lush Dentals Ilorin
          </span>
          <span className="h-px w-12 bg-(--secondary)" />
        </motion.div>

        {/* Main Headline — centered */}
        <div className="flex flex-col items-center text-center gap-8 md:gap-10">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[100px] font-serif font-bold tracking-tighter leading-[0.92] text-(--primary)"
          >
            Transforming{" "}
            <span className="italic font-light text-(--foreground) opacity-30">Your</span>{" "}
            Smile.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-8 max-w-xl"
          >
            <p className="text-(--foreground)/60 font-light leading-relaxed text-base md:text-lg">
              World-class cosmetic and restorative dental care in Ilorin — where clinical precision meets a passion for beautiful, healthy smiles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/book" size="lg" className="w-full sm:w-auto">
                BOOK APPOINTMENT
              </Button>
              <Button href="/services" variant="outline" size="lg" className="w-full sm:w-auto">
                EXPLORE SERVICES
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Full-width Immersive Image Below */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 md:mt-20 relative"
        >
          <div className="relative w-full aspect-16/8 md:aspect-21/8 rounded-t-[40px] md:rounded-t-[60px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2000&auto=format&fit=crop"
              alt="Lush Dentals Modern Clinic"
              fill
              sizes="100vw"
              className="object-cover object-top"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-(--background)/30 via-transparent to-transparent" />

            {/* Stats row overlaid on image bottom */}
            <div className="absolute bottom-0 left-0 right-0 hidden md:flex items-end justify-between p-10 md:p-14">
              {[
                { value: '700+', label: 'Happy Patients' },
                { value: '1,200+', label: 'Procedures Done' },
                { value: '6', label: 'Expert Dentists' },
                { value: '2', label: 'Clinic Locations' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="text-center bg-white/10 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-2xl"
                >
                  <p className="text-3xl font-serif font-bold text-white tracking-tighter">{stat.value}</p>
                  <p className="text-[9px] tracking-widest uppercase font-black text-white/50 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
