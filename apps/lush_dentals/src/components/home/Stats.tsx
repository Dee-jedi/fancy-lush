"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { STATS } from "@/constants";

const Counter = ({ value }: { value: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  // Parse the number from the string (e.g. "700+" -> 700)
  const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(numericValue);
    }
  }, [isInView, numericValue, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        (ref.current as HTMLElement).textContent = Math.floor(latest).toLocaleString() + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

export const Stats = () => {
  return (
    <section className="py-20 md:py-32 bg-white border-y border-emerald-900/5">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
              className="space-y-2 md:space-y-4"
            >
              <h3 className="text-4xl md:text-7xl font-serif font-bold text-[var(--primary)] tracking-tighter">
                <Counter value={stat.value} />
              </h3>
              <p className="text-[8px] md:text-[10px] tracking-[0.3em] uppercase font-black text-[var(--foreground)]/30">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
