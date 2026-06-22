import React from "react";
import { ProgramsGallery } from "@/components/academy/ProgramsGallery";

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#1a1a1a] pt-24 md:pt-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 mb-16">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#d4af37] block mb-4">Academic Structure</span>
          <h1 className="text-4xl md:text-6xl font-serif">Program Tiers</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-[#1a1a1a]/10 p-10 hover:border-[#d4af37] transition-colors duration-500 rounded-sm">
            <h3 className="text-2xl font-serif mb-2">Professional</h3>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8c8c8c] mb-6">3 Months</p>
            <p className="text-sm font-light text-[#595959] leading-relaxed">
              Intensive, fast-tracked curriculum designed to equip you with the essential skills needed to immediately enter the beauty and wellness industry.
            </p>
          </div>
          <div className="border border-[#1a1a1a]/10 p-10 hover:border-[#d4af37] transition-colors duration-500 rounded-sm bg-[#1a1a1a] text-white">
            <h3 className="text-2xl font-serif mb-2">Advanced</h3>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#d4af37] mb-6">6 Months</p>
            <p className="text-sm font-light text-white/60 leading-relaxed">
              A comprehensive program covering advanced techniques, formulation, and specialized services to elevate your craft to elite standards.
            </p>
          </div>
          <div className="border border-[#1a1a1a]/10 p-10 hover:border-[#d4af37] transition-colors duration-500 rounded-sm">
            <h3 className="text-2xl font-serif mb-2">Diploma</h3>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8c8c8c] mb-6">1 Year</p>
            <p className="text-sm font-light text-[#595959] leading-relaxed">
              Complete mastery. Combine technical excellence with luxury brand marketing and entrepreneurship for a full business education.
            </p>
          </div>
        </div>
      </div>

      <ProgramsGallery />
    </div>
  );
}
