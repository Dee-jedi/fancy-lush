"use client";

import React, { useState } from "react";
import Image from "next/image";

export function EnrollmentForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
    tier: "",
    mode: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Application submitted! We will contact you soon.");
  };

  return (
    <section id="enroll" className="relative min-h-screen flex flex-col justify-center pt-32 md:pt-40 pb-20 md:pb-32 overflow-hidden bg-[#1a1a1a] text-white">
      <div className="absolute inset-0 z-0 opacity-30 md:opacity-40">
          <Image 
            src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2000" 
            alt="Dark aesthetic" 
            fill 
            sizes="100vw"
            className="object-cover grayscale"
          />
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8">
        <div className="bg-[#1a1a1a]/70 md:bg-[#1a1a1a]/60 backdrop-blur-xl md:backdrop-blur-2xl border border-white/10 p-6 sm:p-10 md:p-20 rounded-sm">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-[#d4af37] text-[9px] uppercase tracking-[0.4em] font-bold block mb-4">Admissions Open</span>
            <h2 className="text-3xl md:text-5xl font-serif mb-4 md:mb-6">Digital Enrollment</h2>
            <p className="text-white/50 font-light max-w-lg mx-auto text-sm leading-relaxed">
              Submit your details to be considered for the July 1st intake. A representative will contact you to finalize your admission.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10 md:space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
              <div className="relative group">
                <input 
                  required type="text" id="name"
                  className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-transparent focus:outline-none focus:border-[#d4af37] peer transition-colors"
                  placeholder="Full Name"
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <label htmlFor="name" className="absolute left-0 -top-3 text-[10px] uppercase tracking-widest text-[#d4af37] transition-all peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-[#d4af37]">Full Name</label>
              </div>
              
              <div className="relative group">
                <input 
                  required type="email" id="email"
                  className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-transparent focus:outline-none focus:border-[#d4af37] peer transition-colors"
                  placeholder="Email Address"
                  value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <label htmlFor="email" className="absolute left-0 -top-3 text-[10px] uppercase tracking-widest text-[#d4af37] transition-all peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-[#d4af37]">Email Address</label>
              </div>
            </div>

            <div className="relative group">
              <input 
                required type="tel" id="phone"
                className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-transparent focus:outline-none focus:border-[#d4af37] peer transition-colors"
                placeholder="Phone Number"
                value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
              <label htmlFor="phone" className="absolute left-0 -top-3 text-[10px] uppercase tracking-widest text-[#d4af37] transition-all peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-[#d4af37]">Phone Number</label>
            </div>

            <div className="space-y-6">
              <label className="text-[10px] uppercase tracking-widest text-[#d4af37] block">Program of Interest</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                {['Spa & Esthetics', 'Hair Artistry', 'Luxury Perfumery', 'Professional Makeup', 'Cosmetic Formulation', 'Beauty Entrepreneurship'].map((prog) => (
                  <label key={prog} className={`border p-3 md:p-4 cursor-pointer transition-all duration-300 flex items-center justify-center text-center ${formData.program === prog ? 'border-[#d4af37] bg-[#d4af37]/10' : 'border-white/10 hover:border-white/30'}`}>
                    <input type="radio" name="program" value={prog} className="sr-only" onChange={() => setFormData({...formData, program: prog})} />
                    <span className={`text-[10px] md:text-xs tracking-wider ${formData.program === prog ? 'text-[#d4af37]' : 'text-white/60'}`}>{prog}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <label className="text-[10px] uppercase tracking-widest text-[#d4af37] block">Program Tier</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                {[
                  { name: 'Professional', duration: '3 Months' },
                  { name: 'Advanced', duration: '6 Months' },
                  { name: 'Diploma', duration: '1 Year' }
                ].map((tier) => (
                  <label key={tier.name} className={`border p-4 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center text-center ${formData.tier === tier.name ? 'border-[#d4af37] bg-[#d4af37]/10' : 'border-white/10 hover:border-white/30'}`}>
                    <input type="radio" name="tier" value={tier.name} className="sr-only" onChange={() => setFormData({...formData, tier: tier.name})} />
                    <span className={`text-xs tracking-wider mb-1 ${formData.tier === tier.name ? 'text-[#d4af37]' : 'text-white'}`}>{tier.name}</span>
                    <span className="text-[9px] text-white/40 uppercase tracking-widest">{tier.duration}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <label className="text-[10px] uppercase tracking-widest text-[#d4af37] block">Learning Mode</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <label className={`border p-5 md:p-6 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center text-center ${formData.mode === 'physical' ? 'border-[#d4af37] bg-[#d4af37]/10' : 'border-white/10 hover:border-white/30'}`}>
                  <input type="radio" name="mode" value="physical" className="sr-only" onChange={() => setFormData({...formData, mode: 'physical'})} />
                  <span className={`text-sm tracking-wider mb-2 ${formData.mode === 'physical' ? 'text-[#d4af37]' : 'text-white'}`}>Physical Masterclass</span>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest">Ilorin, Kwara</span>
                </label>
                <label className={`border p-5 md:p-6 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center text-center ${formData.mode === 'virtual' ? 'border-[#d4af37] bg-[#d4af37]/10' : 'border-white/10 hover:border-white/30'}`}>
                  <input type="radio" name="mode" value="virtual" className="sr-only" onChange={() => setFormData({...formData, mode: 'virtual'})} />
                  <span className={`text-sm tracking-wider mb-2 ${formData.mode === 'virtual' ? 'text-[#d4af37]' : 'text-white'}`}>Virtual Program</span>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest">Global Access</span>
                </label>
              </div>
            </div>

            <div className="pt-8">
              <button 
                type="submit"
                disabled={!formData.mode || !formData.program || !formData.tier || !formData.name || !formData.email || !formData.phone}
                className="w-full py-5 bg-white text-[#1a1a1a] uppercase tracking-[0.2em] text-xs font-bold hover:bg-[#d4af37] hover:text-white transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
