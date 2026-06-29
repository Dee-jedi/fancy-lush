"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ACADEMY_SCHOOLS } from "@/constants/academyData";
import { SCHOOL_DETAILS } from "@/constants/schoolDetailsData";

import { use } from "react";

export default function SchoolDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const school = ACADEMY_SCHOOLS.find(s => s.id === resolvedParams.id);
  const details = SCHOOL_DETAILS[resolvedParams.id];

  if (!school || !details) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#1a1a1a] font-sans selection:bg-[#d4af37] selection:text-white">
      
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src={school.image}
            alt={school.name}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold text-[#d4af37] block mb-6"
          >
            Academic Discipline
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight mb-6 drop-shadow-lg"
          >
            {school.name}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/80 text-base md:text-xl font-light max-w-2xl mx-auto"
          >
            {school.description}
          </motion.p>
        </div>
      </section>

      {/* Overview & Career Paths */}
      <section className="py-24 md:py-32 px-6 md:px-16 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <h2 className="text-sm uppercase tracking-[0.3em] font-bold text-[#d4af37] mb-6">Program Overview</h2>
            <p className="text-[#595959] text-lg leading-[1.8] font-light">
              {details.overview}
            </p>
          </div>
          <div>
            <h2 className="text-sm uppercase tracking-[0.3em] font-bold text-[#d4af37] mb-6">Career Opportunities</h2>
            <ul className="space-y-4">
              {details.careerOpportunities.map((career, idx) => (
                <li key={idx} className="flex items-center space-x-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]"></div>
                  <span className="text-[#1a1a1a] font-medium">{career}</span>
                </li>
              ))}
            </ul>

            <div className="mt-12 p-8 bg-[#1a1a1a] text-white rounded-sm">
              <h3 className="text-sm uppercase tracking-[0.2em] font-bold text-[#d4af37] mb-4">Prerequisites</h3>
              <p className="text-white/80 font-light text-sm leading-relaxed">
                {details.prerequisites}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum & Courses */}
      <section className="py-24 md:py-32 bg-[#1a1a1a] text-white px-6 md:px-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#d4af37] block mb-4">What You Will Learn</span>
            <h2 className="text-3xl md:text-5xl font-serif">Curriculum & Tuition</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
            {/* Curriculum List */}
            <div>
              <h3 className="text-2xl font-serif mb-8 border-b border-white/10 pb-4">Core Curriculum</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                {school.curriculum.map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full border border-[#d4af37]/50 flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full"></div>
                    </div>
                    <span className="text-white/80 font-light text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Courses & Tuition */}
            <div>
              <h3 className="text-2xl font-serif mb-8 border-b border-white/10 pb-4">Specialized Courses</h3>
              <div className="space-y-6">
                {school.courses.map((course, idx) => (
                  <div key={idx} className="bg-white/[0.03] border border-white/5 p-6 hover:border-[#d4af37]/50 transition-colors duration-300 rounded-sm">
                    <div className="flex justify-between items-start mb-2 gap-4">
                      <h4 className="text-lg font-serif text-[#d4af37]">{course.name}</h4>
                      <span className="text-xs uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full whitespace-nowrap shrink-0">{course.duration}</span>
                    </div>
                    <p className="text-2xl font-light mt-4">{course.tuition}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 text-center px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif mb-6">Ready to Begin?</h2>
          <p className="text-[#595959] font-light leading-relaxed mb-10">
            Spaces are extremely limited to ensure hands-on, personalized mentorship. Secure your place in the next intake today.
          </p>
          <Link href="/register" className="inline-flex items-center justify-center space-x-3 bg-[#1a1a1a] text-white px-10 py-5 rounded-sm hover:bg-[#d4af37] transition-colors duration-300">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold">Enroll Now</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </Link>
        </div>
      </section>

    </div>
  );
}
