"use client";

import React from "react";
import { Hero } from "../components/academy/Hero";
import { Marquee } from "../components/academy/Marquee";
import { FounderMessage } from "../components/academy/FounderMessage";
import { Benefits } from "../components/academy/Benefits";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#1a1a1a] font-sans selection:bg-[#d4af37] selection:text-white overflow-x-hidden">
      
      {/* Premium Grain Overlay for Texture */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-multiply" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      <main>
        <Hero />
        <Marquee />
        <FounderMessage />
        <Benefits />
      </main>

    </div>
  );
}
