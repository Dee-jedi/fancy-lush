"use client";

import React from "react";
import { motion } from "framer-motion";
import { ACADEMY_SCHOOLS, MASTER_PROGRAMS, COMPULSORY_FEES, OPTIONAL_KITS } from "@/constants/academyData";

export default function AdmissionsPage() {
  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#1a1a1a] pt-32 md:pt-48 pb-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-16">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#d4af37] block mb-4">Invest In Your Future</span>
          <h1 className="text-4xl md:text-6xl font-serif mb-6">Admissions & Tuition</h1>
          <p className="text-[#595959] max-w-2xl mx-auto font-light leading-relaxed">
            Transparent pricing for our world-class educational programs. Secure your spot for the 31st July, 2026 intake.
          </p>
        </div>

        {/* Master Programs Section */}
        <section className="mb-20">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-8 h-[1px] bg-[#d4af37]"></div>
            <h2 className="text-2xl font-serif">Master Certification Programs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MASTER_PROGRAMS.map((prog, idx) => (
              <div key={idx} className="bg-white border border-[#1a1a1a]/10 p-8 rounded-sm shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-serif text-xl mb-2">{prog.name}</h3>
                <div className="flex justify-between items-center mt-6 pt-6 border-t border-[#1a1a1a]/5">
                  <span className="text-xs uppercase tracking-wider text-[#8c8c8c]">{prog.duration}</span>
                  <span className="text-lg font-medium text-[#1a1a1a]">{prog.tuition}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Schools Tuition Section */}
        <section className="mb-20">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-8 h-[1px] bg-[#d4af37]"></div>
            <h2 className="text-2xl font-serif">Professional School Tuitions</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {ACADEMY_SCHOOLS.map((school, idx) => (
              <div key={idx} className="border border-[#1a1a1a]/10 rounded-sm overflow-hidden bg-white">
                <div className="bg-[#1a1a1a] p-4 px-6 text-white">
                  <h3 className="font-serif text-lg">{school.name}</h3>
                </div>
                <div className="p-0">
                  {school.courses.map((course, cIdx) => (
                    <div key={cIdx} className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 px-6 ${cIdx !== school.courses.length - 1 ? 'border-b border-[#1a1a1a]/5' : ''}`}>
                      <div className="mb-2 sm:mb-0 pr-4">
                        <p className="text-sm font-medium text-[#1a1a1a]">{course.name}</p>
                        <p className="text-xs text-[#8c8c8c] mt-1">{course.duration}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-[#d4af37]">{course.tuition}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {/* Compulsory Fees */}
          <section>
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-8 h-[1px] bg-[#d4af37]"></div>
              <h2 className="text-2xl font-serif">Registration & Compulsory Fees</h2>
            </div>
            <div className="bg-white border border-[#1a1a1a]/10 p-6 rounded-sm">
              {COMPULSORY_FEES.map((fee, idx) => (
                <div key={idx} className={`flex justify-between py-3 ${fee.isTotal ? 'border-t border-[#1a1a1a] mt-2 pt-4 font-bold' : 'border-b border-[#1a1a1a]/5 text-sm text-[#595959]'}`}>
                  <span>{fee.name}</span>
                  <span className={fee.isTotal ? 'text-[#d4af37]' : ''}>{fee.price}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Optional Kits */}
          <section>
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-8 h-[1px] bg-[#d4af37]"></div>
              <h2 className="text-2xl font-serif">Optional Starter Kits</h2>
            </div>
            <div className="bg-white border border-[#1a1a1a]/10 p-6 rounded-sm max-h-[350px] overflow-y-auto">
              {OPTIONAL_KITS.map((kit, idx) => (
                <div key={idx} className="flex justify-between py-3 border-b border-[#1a1a1a]/5 text-sm text-[#595959] last:border-0">
                  <span>{kit.name}</span>
                  <span className="font-medium text-[#1a1a1a]">{kit.price}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Payment Plan */}
        <section className="bg-[#1a1a1a] text-white p-8 md:p-12 rounded-sm text-center">
          <h2 className="text-2xl md:text-3xl font-serif mb-4">Flexible Payment Plans</h2>
          <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-8">
            We believe world-class education should be accessible. Choose a payment schedule that works for you.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="border border-white/20 p-6 rounded-sm bg-white/5">
              <h3 className="font-bold uppercase tracking-widest text-[11px] text-[#d4af37] mb-2">Option 1: Full Payment</h3>
              <p className="text-sm font-light text-white/80">Pay in full before classes begin and receive a <strong className="text-white">5% discount</strong> on your tuition fees.</p>
            </div>
            <div className="border border-white/20 p-6 rounded-sm bg-white/5">
              <h3 className="font-bold uppercase tracking-widest text-[11px] text-[#d4af37] mb-2">Option 2: Installments</h3>
              <p className="text-sm font-light text-white/80"><strong className="text-white">60% deposit</strong> required before resumption, with the remaining <strong className="text-white">40% balance</strong> due before the midpoint of your course.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
