"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ACADEMY_SCHOOLS } from "@/constants/academyData";

export function ProgramsGallery() {
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
        {ACADEMY_SCHOOLS.map((prog, idx) => (
          <Link href={`/programs/${prog.id}`} key={idx} className="group relative h-[380px] md:h-[500px] rounded-sm overflow-hidden border border-transparent transition-all duration-700 hover:border-[#d4af37]">
            <Image 
              src={prog.image} 
              alt={prog.name} 
              fill 
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-[1.5s] md:group-hover:scale-110 opacity-70 md:opacity-90 md:group-hover:opacity-100"
            />
            {/* Mobile: Thicker gradient for text visibility. Desktop: Lighter gradient, darkens on hover */}
            <div className="absolute inset-0 bg-linear-to-t from-[#1a1a1a]/95 via-[#1a1a1a]/50 to-transparent md:from-[#1a1a1a]/80 md:via-[#1a1a1a]/10 md:group-hover:from-[#1a1a1a]/95 transition-all duration-500"></div>
            
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-white relative z-10">
              <div className="w-6 md:w-8 h-[1px] bg-[#d4af37] mb-4 md:mb-6 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 delay-100 hidden md:block"></div>
              <h3 className="text-xl md:text-2xl font-serif mb-2 md:mb-4 drop-shadow-sm group-hover:text-[#d4af37] transition-colors">{prog.name}</h3>
              {/* Mobile: always visible. Desktop: slide up on hover */}
              <div className="md:opacity-0 md:group-hover:opacity-100 md:transform md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-500">
                <p className="text-[12px] text-white/90 leading-relaxed font-light mb-3">
                  {prog.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-[9px] uppercase tracking-wider border border-white/20 px-2 py-1 rounded-sm bg-white/5">
                    {prog.courses.length} {prog.courses.length === 1 ? 'Course' : 'Courses'}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
