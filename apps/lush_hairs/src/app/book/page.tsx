"use client";

import React, { useState, SubmitEvent } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@lush/ui";
import { SERVICES } from "@/constants";
import Link from 'next/link';

export default function BookPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleNext = () => {
    if (step === 1 && !selectedService) return;
    setStep(step + 1);
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const selectedServiceName = SERVICES.find(s => s.id === selectedService)?.name;
    const message = `*NEW BOOKING REQUEST (LUSH HAIRS)*\n\n*Client:* ${formData.name}\n*Phone:* ${formData.phone}\n*Service:* ${selectedServiceName}\n*Preferred Date:* ${formData.date}\n\nPlease confirm my appointment. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/2349154211869?text=${encodedMessage}`, '_blank');
    
    // Transition to success state
    setStep(3);
  };

  return (
    <main className="min-h-screen bg-[var(--background)] overflow-x-hidden">
      <Header />

      <section className="pt-40 pb-32 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] tracking-[0.5em] uppercase font-black text-[var(--primary)]"
            >
              The Appointment
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-serif text-white"
            >
              Book Your <span className="italic text-white/50">Stylist</span>
            </motion.h1>
          </div>

          {/* Stepper Container */}
          <div className="bg-white/[0.03] border border-white/10 rounded-[40px] p-8 md:p-16 backdrop-blur-xl relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[var(--primary)]/5 rounded-full blur-[100px] pointer-events-none"></div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h2 className="text-2xl font-serif text-white mb-8">Select a Service</h2>
                  <div className="grid gap-4">
                    {SERVICES.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => setSelectedService(service.id)}
                        className={`w-full p-6 rounded-[2rem] border text-left transition-all duration-500 relative overflow-hidden group ${selectedService === service.id
                            ? 'border-transparent shadow-[0_0_30px_rgba(251,113,133,0.2)]'
                            : 'bg-white/5 border-white/10 hover:border-white/30'
                          }`}
                      >
                        {selectedService === service.id && (
                          <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] z-0"></div>
                        )}
                        <div className="relative z-10">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className={`text-xl font-serif ${selectedService === service.id ? 'text-white' : 'text-white/90'}`}>{service.name}</h3>
                            <span className={`text-sm font-bold ${selectedService === service.id ? 'text-white/90' : 'text-[var(--primary)]'}`}>{service.price}</span>
                          </div>
                          <p className={`text-sm font-light ${selectedService === service.id ? 'text-white/80' : 'text-white/40'}`}>{service.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="pt-8">
                    <Button
                      onClick={handleNext}
                      disabled={!selectedService}
                      className="w-full py-8 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white border-0 rounded-full font-black tracking-[0.4em] shadow-xl hover:shadow-[var(--primary)]/20 transition-all duration-500 disabled:opacity-20 uppercase"
                    >
                      Next Step
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-10"
                >
                  {/* Selected Service Summary */}
                  <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] flex items-center justify-between">
                    <div>
                      <p className="text-[8px] tracking-[0.3em] uppercase font-black text-[var(--primary)] mb-1">You are booking</p>
                      <h3 className="text-xl font-serif text-white">{SERVICES.find(s => s.id === selectedService)?.name}</h3>
                    </div>
                    <span className="text-lg font-bold text-white/50">{SERVICES.find(s => s.id === selectedService)?.price}</span>
                  </div>

                  <h2 className="text-2xl font-serif text-white">Your Details</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-widest uppercase font-black text-white/40 ml-4">Full Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-5 text-white focus:outline-none focus:border-[var(--primary)] transition-colors placeholder:text-white/10"
                        placeholder="e.g. Amina Yusuf"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-widest uppercase font-black text-white/40 ml-4">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-5 text-white focus:outline-none focus:border-[var(--primary)] transition-colors placeholder:text-white/10"
                        placeholder="+234..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-widest uppercase font-black text-white/40 ml-4">Preferred Date</label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-5 text-white focus:outline-none focus:border-[var(--primary)] transition-colors [appearance:none] [&::-webkit-calendar-picker-indicator]:hidden"
                      />
                    </div>
                    <div className="pt-8">
                      <Button
                        type="submit"
                        disabled={!formData.name || !formData.phone || !formData.date}
                        className="w-full py-8 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white border-0 rounded-full font-black tracking-[0.3em] uppercase disabled:opacity-20 shadow-lg"
                      >
                        Confirm Booking
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-10"
                >
                  <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-serif text-white">Booking Received</h2>
                    <p className="text-white/60 max-w-sm mx-auto font-light leading-relaxed">
                      Thank you, <span className="text-white font-bold">{formData.name}</span>! We've prepared your request for {SERVICES.find(s => s.id === selectedService)?.name}.
                    </p>
                  </div>

                  <div className="pt-8">
                    <Link href="/">
                      <Button
                        className="w-full py-8 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white border-0 rounded-full font-black tracking-[0.4em] uppercase shadow-xl hover:shadow-[var(--primary)]/20 transition-all duration-500 cursor-pointer"
                      >
                        Return to Boutique
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
