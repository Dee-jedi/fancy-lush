"use client";

import React from 'react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-[var(--background)] text-white py-24 px-8 border-t border-white/5 relative overflow-hidden">
      {/* Subtle radial gradient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[var(--primary)]/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-20 text-center md:text-left">
          <div className="space-y-8">
            <div className="flex flex-col items-center md:items-start">
              <span className="text-3xl font-serif font-bold tracking-[0.1em] text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] leading-none">LUSH HAIRS</span>
              <span className="text-[10px] tracking-[0.4em] text-white/40 uppercase font-black mt-2">Unleash Beauty</span>
            </div>
            <p className="text-white/50 text-sm font-light leading-relaxed max-w-xs mx-auto md:mx-0">
              Premium extensions, flawless styling, and unparalleled care for the bold and beautiful.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-[var(--primary)] text-[10px] tracking-[0.3em] uppercase font-black">Opening Hours</h4>
            <ul className="space-y-4 text-sm font-medium text-white/60">
              <li>Mon - Sat: 9am - 9pm</li>
              <li>Sun: 1pm - 9pm</li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[var(--primary)] text-[10px] tracking-[0.3em] uppercase font-black">Location</h4>
            <address className="not-italic text-sm font-medium text-white/60 leading-relaxed">
              Shop 22 Palms Mall,<br />
              Ilorin, Kwara State<br />
              Nigeria
            </address>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] tracking-widest uppercase font-bold text-white/30 text-center z-10 relative">
          <p>© {currentYear} LUSH HAIRS. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-[var(--primary)] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--primary)] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
