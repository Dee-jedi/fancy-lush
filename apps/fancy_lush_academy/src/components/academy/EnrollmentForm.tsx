"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ACADEMY_SCHOOLS } from "@/constants/academyData";

export function EnrollmentForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
    course: "",
    tier: "",
    mode: "",
  });

  const selectedSchool = ACADEMY_SCHOOLS.find(s => s.name === formData.program);

  const handleProgramChange = (schoolName: string) => {
    setFormData({ ...formData, program: schoolName, course: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Updated WhatsApp number as requested
    const whatsappNumber = "2349154211869"; 
    
    const selectedCourseObj = selectedSchool?.courses.find(c => c.name === formData.course);
    const tuition = selectedCourseObj ? selectedCourseObj.tuition : "TBD";
    
    const message = `Hello Fancylush Academy! I would like to enroll for the upcoming intake.
    
*Student Details:*
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

*Program Details:*
School: ${formData.program}
Specialization: ${formData.course}
Tuition: ${tuition}
Tier: ${formData.tier}
Learning Mode: ${formData.mode === 'physical' ? 'Physical Masterclass (Ilorin)' : 'Virtual Program'}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="enroll" className="relative min-h-screen flex flex-col justify-center pt-32 md:pt-40 pb-20 md:pb-32 overflow-hidden bg-[#fcfbf9] text-[#1a1a1a]">
      <div className="absolute inset-0 z-0 opacity-10">
          <Image 
            src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2000" 
            alt="Light aesthetic" 
            fill 
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
            className="grayscale"
          />
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 w-full">
        <div className="bg-white/80 md:bg-white/70 backdrop-blur-xl md:backdrop-blur-2xl border border-[#1a1a1a]/10 p-6 sm:p-10 md:p-16 rounded-sm shadow-xl shadow-black/5">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-[#d4af37] text-[9px] uppercase tracking-[0.4em] font-bold block mb-4">Admissions Open</span>
            <h2 className="text-3xl md:text-5xl font-serif mb-4 md:mb-6">Digital Enrollment</h2>
            <p className="text-[#595959] font-light max-w-lg mx-auto text-sm leading-relaxed">
              Submit your details to secure your spot for the 31st July, 2026 intake. You will be redirected to our admissions concierge on WhatsApp to complete your registration.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10 md:space-y-12">
            {/* Personal Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
              <div className="relative group">
                <input 
                  required type="text" id="name"
                  className="w-full bg-transparent border-b border-[#1a1a1a]/20 py-4 px-2 text-[#1a1a1a] placeholder-transparent focus:outline-none focus:border-[#d4af37] peer transition-colors"
                  placeholder="Full Name"
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <label htmlFor="name" className="absolute left-2 -top-3 text-[10px] uppercase tracking-widest text-[#d4af37] transition-all peer-placeholder-shown:text-[#595959] peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-[#d4af37]">Full Name</label>
              </div>
              
              <div className="relative group">
                <input 
                  required type="email" id="email"
                  className="w-full bg-transparent border-b border-[#1a1a1a]/20 py-4 px-2 text-[#1a1a1a] placeholder-transparent focus:outline-none focus:border-[#d4af37] peer transition-colors"
                  placeholder="Email Address"
                  value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <label htmlFor="email" className="absolute left-2 -top-3 text-[10px] uppercase tracking-widest text-[#d4af37] transition-all peer-placeholder-shown:text-[#595959] peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-[#d4af37]">Email Address</label>
              </div>
            </div>

            <div className="relative group">
              <input 
                required type="tel" id="phone"
                className="w-full bg-transparent border-b border-[#1a1a1a]/20 py-4 px-2 text-[#1a1a1a] placeholder-transparent focus:outline-none focus:border-[#d4af37] peer transition-colors"
                placeholder="Phone Number"
                value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
              <label htmlFor="phone" className="absolute left-2 -top-3 text-[10px] uppercase tracking-widest text-[#d4af37] transition-all peer-placeholder-shown:text-[#595959] peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-[#d4af37]">Phone Number</label>
            </div>

            {/* School Selection */}
            <div className="space-y-6">
              <label className="text-[10px] uppercase tracking-widest text-[#d4af37] block">Select Your Faculty</label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {ACADEMY_SCHOOLS.map((school) => (
                  <label key={school.id} className={`border p-3 md:p-4 cursor-pointer transition-all duration-300 flex items-center justify-center text-center ${formData.program === school.name ? 'border-[#d4af37] bg-[#d4af37]/10' : 'border-[#1a1a1a]/10 hover:border-[#1a1a1a]/30 bg-white'}`}>
                    <input type="radio" name="program" value={school.name} className="sr-only" onChange={() => handleProgramChange(school.name)} />
                    <span className={`text-[10px] md:text-[11px] tracking-wider ${formData.program === school.name ? 'text-[#d4af37]' : 'text-[#595959]'}`}>{school.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Dynamic Course Selection */}
            {selectedSchool && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <label className="text-[10px] uppercase tracking-widest text-[#d4af37] block">Select Specialization & Tuition</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {selectedSchool.courses.map((course, idx) => (
                    <label key={idx} className={`border p-4 md:p-5 cursor-pointer transition-all duration-300 flex flex-col justify-center bg-white ${formData.course === course.name ? 'border-[#d4af37] bg-[#d4af37]/5' : 'border-[#1a1a1a]/10 hover:border-[#1a1a1a]/30'}`}>
                      <input type="radio" name="course" value={course.name} className="sr-only" onChange={() => setFormData({...formData, course: course.name})} />
                      <span className={`text-sm tracking-wider mb-3 font-serif ${formData.course === course.name ? 'text-[#d4af37]' : 'text-[#1a1a1a]'}`}>{course.name}</span>
                      <div className="flex justify-between items-center w-full text-[10px] uppercase tracking-widest text-[#595959]">
                        <span>{course.duration}</span>
                        <span className="font-bold text-[#d4af37] text-xs">{course.tuition}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Tier Selection */}
            <div className="space-y-6">
              <label className="text-[10px] uppercase tracking-widest text-[#d4af37] block">Program Tier</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {[
                  { name: 'Foundation', subtitle: 'Certificate' },
                  { name: 'Professional', subtitle: 'Diploma' },
                  { name: 'Advanced', subtitle: 'Diploma' },
                  { name: 'Master', subtitle: 'Certification' }
                ].map((tier) => (
                  <label key={tier.name} className={`border p-4 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center text-center bg-white ${formData.tier === tier.name ? 'border-[#d4af37] bg-[#d4af37]/5' : 'border-[#1a1a1a]/10 hover:border-[#1a1a1a]/30'}`}>
                    <input type="radio" name="tier" value={tier.name} className="sr-only" onChange={() => setFormData({...formData, tier: tier.name})} />
                    <span className={`text-xs tracking-wider mb-1 ${formData.tier === tier.name ? 'text-[#d4af37]' : 'text-[#1a1a1a]'}`}>{tier.name}</span>
                    <span className="text-[9px] text-[#8c8c8c] uppercase tracking-widest">{tier.subtitle}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Mode Selection */}
            <div className="space-y-6">
              <label className="text-[10px] uppercase tracking-widest text-[#d4af37] block">Learning Mode</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <label className={`border p-5 md:p-6 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center text-center bg-white ${formData.mode === 'physical' ? 'border-[#d4af37] bg-[#d4af37]/5' : 'border-[#1a1a1a]/10 hover:border-[#1a1a1a]/30'}`}>
                  <input type="radio" name="physical" value="physical" className="sr-only" onChange={() => setFormData({...formData, mode: 'physical'})} />
                  <span className={`text-sm tracking-wider mb-2 ${formData.mode === 'physical' ? 'text-[#d4af37]' : 'text-[#1a1a1a]'}`}>Physical Masterclass</span>
                  <span className="text-[10px] text-[#8c8c8c] uppercase tracking-widest">Ilorin, Kwara</span>
                </label>
                <label className={`border p-5 md:p-6 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center text-center bg-white ${formData.mode === 'virtual' ? 'border-[#d4af37] bg-[#d4af37]/5' : 'border-[#1a1a1a]/10 hover:border-[#1a1a1a]/30'}`}>
                  <input type="radio" name="virtual" value="virtual" className="sr-only" onChange={() => setFormData({...formData, mode: 'virtual'})} />
                  <span className={`text-sm tracking-wider mb-2 ${formData.mode === 'virtual' ? 'text-[#d4af37]' : 'text-[#1a1a1a]'}`}>Virtual Program</span>
                  <span className="text-[10px] text-[#8c8c8c] uppercase tracking-widest">Global Access</span>
                </label>
              </div>
            </div>

            <div className="pt-8">
              <button 
                type="submit"
                disabled={!formData.mode || !formData.course || !formData.program || !formData.tier || !formData.name || !formData.email || !formData.phone}
                className="w-full py-5 bg-[#1a1a1a] text-white uppercase tracking-[0.2em] text-xs font-bold hover:bg-[#d4af37] transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed rounded-sm"
              >
                Proceed to WhatsApp Concierge
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
