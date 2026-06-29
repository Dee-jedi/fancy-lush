import React from "react";
import { ProgramsGallery } from "@/components/academy/ProgramsGallery";

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#1a1a1a] pt-32 md:pt-48">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 mb-16">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#d4af37] block mb-4">Academic Structure</span>
          <h1 className="text-4xl md:text-6xl font-serif">Program Tiers</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div className="border border-[#1a1a1a]/10 p-8 hover:border-[#d4af37] transition-colors duration-500 rounded-sm">
            <h3 className="text-xl font-serif mb-2">Foundation</h3>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8c8c8c] mb-6">Certificate</p>
            <p className="text-sm font-light text-[#595959] leading-relaxed">
              Designed for absolute beginners. Learn the essential fundamentals to kickstart your career in the beauty industry.
            </p>
          </div>
          <div className="border border-[#1a1a1a]/10 p-8 hover:border-[#d4af37] transition-colors duration-500 rounded-sm">
            <h3 className="text-xl font-serif mb-2">Professional</h3>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8c8c8c] mb-6">Diploma</p>
            <p className="text-sm font-light text-[#595959] leading-relaxed">
              Intensive curriculum designed for those seeking immediate employment or to establish their own self-employed practice.
            </p>
          </div>
          <div className="border border-[#1a1a1a]/10 p-8 hover:border-[#d4af37] transition-colors duration-500 rounded-sm">
            <h3 className="text-xl font-serif mb-2">Advanced</h3>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8c8c8c] mb-6">Diploma</p>
            <p className="text-sm font-light text-[#595959] leading-relaxed">
              A comprehensive program covering specialized, high-demand techniques to elevate your craft to elite specialist standards.
            </p>
          </div>
          <div className="border border-[#1a1a1a]/10 p-8 hover:border-[#d4af37] transition-colors duration-500 rounded-sm bg-[#1a1a1a] text-white">
            <h3 className="text-xl font-serif mb-2">Master</h3>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#d4af37] mb-6">Certification</p>
            <p className="text-sm font-light text-white/60 leading-relaxed">
              The pinnacle of beauty education. For academy owners, trainers, and industry leaders seeking absolute mastery across multiple disciplines.
            </p>
          </div>
        </div>
      </div>

      <ProgramsGallery />

      <div className="max-w-[1400px] mx-auto px-6 md:px-16 mt-16 mb-32">
        <div className="border-t border-[#1a1a1a]/10 pt-16">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="md:w-1/3">
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#d4af37] block mb-4">Compulsory</span>
              <h2 className="text-3xl font-serif mb-4">Business & Professional Development</h2>
              <p className="text-sm font-light text-[#595959] leading-relaxed">
                Every student must complete these essential modules before graduation to ensure they are fully prepared to succeed as entrepreneurs and professionals.
              </p>
            </div>
            <div className="md:w-2/3">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "Customer Service Excellence", "Communication Skills", "Health & Safety", 
                  "Infection Control", "Sterilization & Hygiene", "Beauty Business Mgt.", 
                  "Branding & Marketing", "Social Media Marketing", "Sales Techniques", 
                  "Financial Management", "Record Keeping", "Professional Ethics", 
                  "Entrepreneurship", "Photography & Content", "AI Tools for Beauty"
                ].map((mod, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></div>
                    <span className="text-xs font-medium text-[#1a1a1a]">{mod}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
