"use client";

import React, { useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { STATS } from "@/constants";

interface StatItemProps {
  value: string;
  label: string;
}

const StatItem = ({ value, label }: StatItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const numValue = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
  const suffix = value.replace(/[0-9.]/g, '');
  const hasDecimal = value.includes('.');
  
  const count = useMotionValue(0);
  const displayValue = useTransform(count, (latest) => 
    hasDecimal ? latest.toFixed(1) : Math.round(latest)
  );

  React.useEffect(() => {
    if (isInView) {
      animate(count, numValue, { duration: 2.5, ease: "easeOut" });
    }
  }, [isInView, numValue, count]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-2"
    >
      <div className="text-5xl md:text-6xl font-serif text-[var(--primary)] flex items-baseline justify-center">
        <motion.span>{displayValue}</motion.span>
        <span className="text-3xl ml-1">{suffix}</span>
      </div>
      <p className="text-[10px] tracking-[0.3em] font-black uppercase text-[var(--foreground)]/20">{label}</p>
    </motion.div>
  );
};

export const Stats = () => {
  return (
    <div className="border-y border-gray-100 py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        {STATS.map((stat, i) => (
          <StatItem key={i} value={stat.value} label={stat.label} />
        ))}
      </div>
    </div>
  );
};
