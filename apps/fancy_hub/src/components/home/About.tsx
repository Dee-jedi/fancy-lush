"use client";

import React from "react";
import Image from "next/image";

export function About() {
  return (
    <section id="story" className="py-20 md:py-32 bg-[#060608] relative z-10 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div className="space-y-6">
          <span className="text-[9px] tracking-[0.4em] font-black text-white/40 uppercase block">THE PHILOSOPHY</span>
          <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
            Clinical Perfection Meets <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#d1d5db] to-[#9ca3af] italic font-light">Artistic Elegance.</span>
          </h2>
          <p className="text-xs md:text-sm font-light leading-relaxed text-white/40">
            The Fancy Lush empire is founded on a singular commitment to absolute perfection. Our houses encompass clinical dental science, botanical skincare therapy, high-fashion wig customization, and luxurious fine jewelry crafting.
          </p>
          <p className="text-xs md:text-sm font-light leading-relaxed text-white/40">
            Every detail—from the weight of our 18-karat gold chains to the precise alignment of your smile veneers—is carefully customized at our Palms Mall ateliers in Ilorin by certified practitioners and master artisans.
          </p>
        </div>

        {/* Interactive Visual Mosaic */}
        <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-white/10 group shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200"
            alt="Artisan perfection"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-transparent to-transparent"></div>
          
          {/* Embedded Luxury Seal */}
          <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-[2rem] max-w-xs text-white">
            <span className="text-[8px] tracking-[0.3em] font-black text-white/60 uppercase block mb-1">CERTIFIED CARE</span>
            <p className="text-xs font-light text-white/80 leading-relaxed">
              Certified doctors, veteran hair stylists, expert spa therapists, and precision goldsmiths working together in harmony.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
