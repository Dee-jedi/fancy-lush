"use client";

import React from "react";
import { motion } from "framer-motion";

export function Marquee() {
  return (
    <div className="py-8 bg-[#1a1a1a] text-white overflow-hidden flex whitespace-nowrap">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="flex space-x-12 text-[10px] tracking-[0.4em] uppercase font-bold items-center"
      >
        <span>Spa & Esthetics</span> <span className="text-[#d4af37]">✦</span>
        <span>Frontal Installations</span> <span className="text-[#d4af37]">✦</span>
        <span>Oud Extraction</span> <span className="text-[#d4af37]">✦</span>
        <span>Virtual Classes</span> <span className="text-[#d4af37]">✦</span>
        <span>Ilorin Masterclass</span> <span className="text-[#d4af37]">✦</span>
        <span>Spa & Esthetics</span> <span className="text-[#d4af37]">✦</span>
        <span>Frontal Installations</span> <span className="text-[#d4af37]">✦</span>
        <span>Oud Extraction</span> <span className="text-[#d4af37]">✦</span>
        <span>Virtual Classes</span> <span className="text-[#d4af37]">✦</span>
      </motion.div>
    </div>
  );
}
