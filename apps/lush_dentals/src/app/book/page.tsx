"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { SERVICES, LOCATIONS } from "@/constants";

export default function BookPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    location: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Find selected location for phone number
    const selectedLoc = LOCATIONS.find(l => l.name === formData.location) || LOCATIONS[0];
    
    const message = `Hello Lush Dentals! I would like to book an appointment.%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Service:* ${formData.service}%0A*Location:* ${formData.location}%0A*Preferred Date:* ${formData.date}`;
    
    const whatsappUrl = `https://wa.me/${selectedLoc.whatsapp}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <main className="min-h-screen bg-[#f8fdfb]">
      <Header />
      
      <section className="pt-48 pb-40 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-start">
            {/* Left Side */}
            <motion.div 
              initial={{ opacity: 1 }}
              className="space-y-10 md:space-y-16 text-center lg:text-left"
            >
              <div className="space-y-6 md:space-y-10">
                <span className="text-[var(--secondary)] text-[10px] tracking-[0.5em] uppercase font-black">Lush Concierge</span>
                <h1 className="text-5xl md:text-8xl font-serif font-bold text-[var(--primary)] leading-[0.95] tracking-tighter">
                  Secure Your <br /><span className="italic font-light text-[var(--secondary)]">Appointment</span>
                </h1>
              </div>
              <p className="text-base md:text-xl text-[var(--foreground)]/50 font-light leading-relaxed max-w-lg mx-auto lg:mx-0">
                Take the first step towards your dream smile. Fill out the details and our team will contact you instantly via WhatsApp to confirm your preferred slot.
              </p>
              
              <div className="hidden lg:block pt-10">
                <div className="flex items-center gap-6 text-[10px] tracking-[0.3em] font-black uppercase text-[var(--primary)]/20">
                  <span className="h-[1px] w-12 bg-current"></span>
                  <span>Professional Clinic Care</span>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-12 rounded-[50px] shadow-2xl border border-emerald-900/5"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] tracking-widest uppercase font-black text-[var(--foreground)]/40 ml-4">Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. John Doe"
                      className="w-full bg-emerald-50/50 border-none rounded-3xl px-8 py-5 text-sm focus:ring-2 focus:ring-[var(--primary)] transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] tracking-widest uppercase font-black text-[var(--foreground)]/40 ml-4">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g. 0803..."
                      className="w-full bg-emerald-50/50 border-none rounded-3xl px-8 py-5 text-sm focus:ring-2 focus:ring-[var(--primary)] transition-all"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] tracking-widest uppercase font-black text-[var(--foreground)]/40 ml-4">Select Service</label>
                  <select 
                    required
                    className="w-full bg-emerald-50/50 border-none rounded-3xl px-8 py-5 text-sm focus:ring-2 focus:ring-[var(--primary)] transition-all appearance-none"
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                  >
                    <option value="">Choose a treatment...</option>
                    {SERVICES.map(s => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] tracking-widest uppercase font-black text-[var(--foreground)]/40 ml-4">Preferred Location</label>
                  <select 
                    required
                    className="w-full bg-emerald-50/50 border-none rounded-3xl px-8 py-5 text-sm focus:ring-2 focus:ring-[var(--primary)] transition-all appearance-none"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  >
                    <option value="">Choose a clinic...</option>
                    {LOCATIONS.map(l => (
                      <option key={l.name} value={l.name}>{l.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] tracking-widest uppercase font-black text-[var(--foreground)]/40 ml-4">Preferred Date</label>
                  <input 
                    type="date" 
                    required
                    className="w-full bg-emerald-50/50 border-none rounded-3xl px-8 py-5 text-sm focus:ring-2 focus:ring-[var(--primary)] transition-all hide-calendar-icon"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>

                <div className="pt-6">
                  <Button type="submit" className="w-full py-6 text-sm shadow-xl">
                    SEND VIA WHATSAPP
                  </Button>
                  <p className="text-center mt-6 text-[10px] tracking-widest uppercase font-black text-[var(--foreground)]/30">
                    We'll respond within 30 minutes
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
