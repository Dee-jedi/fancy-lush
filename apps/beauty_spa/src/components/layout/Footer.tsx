"use client";

import React from 'react';
import { motion } from "framer-motion";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer id="contact" className="bg-white text-[var(--foreground)] py-24 px-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-20 text-center md:text-left">
          <div className="space-y-8">
            <div className="flex flex-col items-center md:items-start">
              <span className="text-3xl font-serif font-bold tracking-[0.1em] text-[var(--primary)] leading-none">FANCYLUSH</span>
              <span className="text-[10px] tracking-[0.4em] text-[var(--secondary)] uppercase font-black mt-2">BEAUTY & SPA</span>
            </div>
            <p className="text-[var(--foreground)]/40 text-sm font-light leading-relaxed max-w-xs mx-auto md:mx-0">
              Redefining luxury beauty in Ilorin through precision, passion, and unparalleled relaxation.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-[var(--secondary)] text-[10px] tracking-[0.3em] uppercase font-black">Opening Hours</h4>
            <ul className="space-y-4 text-sm font-medium text-[var(--foreground)]/60">
              <li>Mon - Sat: 9am - 9pm</li>
              <li>Sun: 1pm - 9pm</li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[var(--secondary)] text-[10px] tracking-[0.3em] uppercase font-black">Location</h4>
            <address className="not-italic text-sm font-medium text-[var(--foreground)]/60 leading-relaxed">
              Shop 21 Palms Mall,<br />
              Ilorin, Kwara State<br />
              Nigeria
            </address>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] tracking-widest uppercase font-bold text-[var(--foreground)]/20 text-center">
          <p>© {currentYear} FANCYLUSH BEAUTY & SPA. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-[var(--primary)] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--primary)] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
