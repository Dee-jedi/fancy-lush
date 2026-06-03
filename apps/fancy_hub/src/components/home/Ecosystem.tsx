"use client";

import React, { useState } from "react";
import Image from "next/image";

export function Ecosystem() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const branches = [
    {
      name: "Fancy Lush Beauty & Spa",
      sub: "Dermatological Glow & Body Restoration",
      tag: "WELLNESS & THERAPY",
      desc: "Indulge in botanical steam chambers, signature cellular facials, biological body polishing, and customized massage therapies designed for absolute skin restoration.",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800",
      accent: "#c89666", // Warm Gold
      shadow: "rgba(200, 150, 102, 0.15)",
      link: "https://fancy-lush-beauty-spa.vercel.app",
    },
    {
      name: "Lush Perfumes & Jewelry",
      sub: "Niche Olfactory Art & Fine Jewelry",
      tag: "CRAFTSMANSHIP & ATELIER",
      desc: "Draped in heavy, hand-hammered 18-karat gold chains, custom clear diamond solitaire rings, and highly concentrated Cambodian Oud extractions of supreme longevity.",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800",
      accent: "#a78bfa", // Lavender Amethyst Accent!
      shadow: "rgba(167, 139, 250, 0.2)",
      link: "https://lush-atelier.vercel.app",
    },
    {
      name: "Lush Hairs",
      sub: "Luxury Virgin Wigs & Flawless Frontals",
      tag: "HAIR ARTISTRY",
      desc: "Transforming raw locks into beautiful canvases. Sourcing premium virgin hair bundles, flawless custom-colored frontals, and meticulously styled HD lace wigs.",
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800",
      accent: "#ec4899", // Rose Velvet
      shadow: "rgba(236, 72, 153, 0.15)",
      link: "https://lushhairs.vercel.app",
    },
    {
      name: "Lush Dentals",
      sub: "State-of-the-Art Aesthetic Care",
      tag: "CLINICAL ARTISTRY",
      desc: "Where strict clinical dental precision seamlessly meets aesthetic smile artistry. Pain-free certified veneer installations, scaling, whitening, and advanced orthodontics.",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800",
      accent: "#0d9488", // Mint Teal
      shadow: "rgba(13, 148, 136, 0.15)",
      link: "https://fancy-lush-lush-dentals.vercel.app",
    },
  ];

  return (
    <section id="ecosystem" className="py-16 md:py-24 px-6 max-w-[1600px] mx-auto relative z-10">

      {/* Dynamic Background Canopy Light Leak inside the ecosystem view bounds */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[500px] rounded-full blur-[150px] transition-all duration-1000 mix-blend-screen opacity-15"
          style={{
            background: hoveredIndex !== null
              ? `radial-gradient(circle, ${branches[hoveredIndex].accent} 0%, transparent 70%)`
              : "radial-gradient(circle, #6366f1 0%, transparent 70%)"
          }}
        />
      </div>

      <div className="text-center mb-16 space-y-4 relative z-10">
        <span className="text-[9px] tracking-[0.4em] font-black text-white/40 uppercase block">THE ECOSYSTEM</span>
        <h2 className="text-3xl md:text-5xl font-serif text-white">The Houses of Fancy Lush</h2>
        <p className="text-xs text-white/40 tracking-widest font-light max-w-md mx-auto">
          Click to enter the dedicated digital salon and online catalog of each luxury branch.
        </p>
      </div>

      {/* 4-Card Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10">
        {branches.map((branch, index) => {
          const isHovered = hoveredIndex === index;
          return (
            <div
              key={branch.name}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => window.open(branch.link, "_blank")}
              className="relative h-[480px] md:h-[580px] group cursor-pointer overflow-hidden rounded-[2.5rem] bg-[#0a0a0c]/40 border border-white/5 shadow-2xl transition-all duration-700 md:hover:-translate-y-3"
              style={{
                boxShadow: isHovered ? `0 30px 60px -15px ${branch.shadow}` : "",
                borderColor: isHovered ? branch.accent : "rgba(255, 255, 255, 0.05)"
              }}
            >
              {/* Background Image with Hover Scale (Mobile-First: colorful & bright; Desktop: luxury grayscale hover zoom) */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={branch.image}
                  alt={branch.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="w-full h-full object-cover opacity-60 md:group-hover:scale-110 md:group-hover:opacity-80 transition-all duration-[2.5s] ease-out"
                />
                {/* Dark vignette layers */}
                <div className="absolute inset-0 bg-linear-to-t from-[#030303] via-[#030303]/85 to-[#030303]/30 z-10"></div>
              </div>

              {/* Card Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-20">

                {/* Top metadata */}
                <div>
                  <span
                    className="text-[8px] tracking-[0.3em] font-black uppercase px-3 py-1.5 rounded-full bg-white/5 border border-white/10"
                    style={{
                      color: isHovered ? branch.accent : "rgba(255,255,255,0.6)"
                    }}
                  >
                    {branch.tag}
                  </span>
                </div>

                {/* Bottom Text and Action button (Mobile-First: static readable text; Desktop: slide & fade transitions) */}
                <div className="space-y-4 transform md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-700">
                  <div className="space-y-1">
                    <h3 className="text-xl md:text-2xl font-serif text-white">{branch.name}</h3>
                    <p
                      className="text-[10px] tracking-wide font-light opacity-80"
                      style={{ color: isHovered ? branch.accent : "rgba(255, 255, 255, 0.5)" }}
                    >
                      {branch.sub}
                    </p>
                  </div>

                  <p className="text-[11px] font-light leading-relaxed text-white/55 md:text-white/40 md:group-hover:text-white/70 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-700">
                    {branch.desc}
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[9px] tracking-[0.25em] font-black uppercase text-white/60 group-hover:text-white transition-colors">
                      ENTER PORTAL
                    </span>
                    <div
                      className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500"
                      style={{
                        backgroundColor: isHovered ? branch.accent : "transparent",
                        borderColor: isHovered ? "transparent" : `${branch.accent}40`,
                        color: isHovered ? "#030303" : branch.accent
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
