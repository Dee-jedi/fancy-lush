import React, { Suspense } from 'react';
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { BookingForm } from "@/components/booking/BookingForm";

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6]">
      <Header />
      
      <section className="pt-40 pb-32 px-8">
        <div className="max-w-4xl mx-auto">
          {/* We use a simple div here instead of motion.div for the static part to avoid needing "use client" on this page if possible, 
              though Header might already need it. Actually, motion is used here, so we can either keep "use client" at the top 
              or move the motion logic into a client wrapper. Let's keep it simple and just use Suspense here. */}
          <div className="text-center mb-20 space-y-6">
            <span className="text-[var(--secondary)] text-xs tracking-[0.4em] font-black uppercase">Concierge</span>
            <h1 className="text-5xl md:text-7xl font-serif text-[var(--primary)] italic">Book Your <span className="not-italic font-light">Experience</span></h1>
          </div>

          <Suspense fallback={
            <div className="bg-white rounded-[60px] p-8 md:p-20 shadow-[0_40px_100px_-20px_rgba(46,16,101,0.08)] flex items-center justify-center min-h-[400px]">
              <div className="animate-pulse text-[var(--primary)]/40 font-serif italic text-2xl">Preparing your experience...</div>
            </div>
          }>
            <BookingForm />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
