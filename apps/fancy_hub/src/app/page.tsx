"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/home/Hero";
import { Ecosystem } from "@/components/home/Ecosystem";
import { About } from "@/components/home/About";
import { Showroom } from "@/components/home/Showroom";
import { Footer } from "@/components/layout/Footer";
import { FloatingDirections } from "@/components/layout/FloatingDirections";

export default function GatewayPage() {
  return (
    <main className="min-h-screen bg-[#030303] text-white overflow-x-hidden relative">
      
      {/* Universal Page Header */}
      <Header />

      {/* Hero Entrance Block */}
      <Hero />

      {/* Dynamic 4-House Brand Selector */}
      <Ecosystem />

      {/* Philosophy / Story Section */}
      <About />

      {/* Palms Mall Flagship Coordinates Banner */}
      <Showroom />

      {/* Obsidian Brand Footer */}
      <Footer />

      {/* GPS Live Directions Floating FAB */}
      <FloatingDirections />

    </main>
  );
}
