"use client";

import React from "react";
import Image from "next/image";

export function ProgramsGallery() {
  const programs = [
    {
      title: "Spa & Clinical Esthetics",
      desc: "Master the biological science of skin restoration, organic therapy, and advanced dermatological care.",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800",
      accent: "hover:border-[#c89666]"
    },
    {
      title: "Advanced Hair Artistry",
      desc: "Transform raw extensions into flawless canvases. Learn high-definition frontal installations and coloring.",
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800",
      accent: "hover:border-[#ec4899]"
    },
    {
      title: "Olfactory & Perfumery",
      desc: "The ancient craft of fragrance. Extract pure oud, balance niche notes, and create signature luxury scents.",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800",
      accent: "hover:border-[#a78bfa]"
    },
    {
      title: "Professional Makeup",
      desc: "From bridal elegance to editorial glam. Perfect the art of enhancing natural beauty and structural contouring.",
      image: "https://images.unsplash.com/photo-1516975080661-46bbf6960d5b?q=80&w=800",
      accent: "hover:border-[#f43f5e]"
    },
    {
      title: "Cosmetic Formulation",
      desc: "The science of beauty. Learn to safely formulate, compound, and brand high-end skincare products.",
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800",
      accent: "hover:border-[#14b8a6]"
    },
    {
      title: "Beauty Entrepreneurship",
      desc: "Build a profitable empire. Business administration, luxury brand marketing, and client retention strategies.",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?q=80&w=800",
      accent: "hover:border-[#eab308]"
    },
  ];

  return (
    <section className="py-20 md:py-32 px-6 md:px-16 max-w-[1600px] mx-auto bg-[#fcfbf9]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20">
        <h2 className="text-4xl md:text-6xl font-serif tracking-tight leading-[1.1] md:leading-tight">
          The Academic <br className="hidden md:block" /> <span className="italic text-[#8c8c8c]">Disciplines</span>
        </h2>
        <p className="text-[#595959] max-w-sm text-sm leading-relaxed mt-4 md:mt-0">
          Rigorous, hands-on curriculum designed by industry leaders. We do not just teach skills; we instill absolute mastery.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
        {programs.map((prog, idx) => (
          <div key={idx} className={`group relative h-[450px] sm:h-[500px] md:h-[600px] rounded-sm overflow-hidden cursor-pointer border border-transparent transition-all duration-700 ${prog.accent}`}>
            <Image 
              src={prog.image} 
              alt={prog.title} 
              fill 
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-90 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#1a1a1a]/90 via-[#1a1a1a]/20 to-transparent"></div>
            
            <div className="absolute inset-0 p-10 flex flex-col justify-end text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
              <div className="w-8 h-[1px] bg-[#d4af37] mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></div>
              <h3 className="text-2xl md:text-3xl font-serif mb-4">{prog.title}</h3>
              <p className="text-[12px] text-white/70 leading-relaxed font-light opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                {prog.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
