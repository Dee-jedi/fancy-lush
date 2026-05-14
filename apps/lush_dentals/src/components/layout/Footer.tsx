import React from 'react';
import { LOCATIONS, SOCIALS } from '@/constants';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-emerald-900/5 pt-24 pb-12 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-20 text-center md:text-left">
          
          {/* Branding */}
          <div className="space-y-8 flex flex-col items-center md:items-start">
            <div className="flex flex-col">
              <span className="text-3xl font-serif font-bold tracking-[0.1em] leading-none text-[var(--primary)]">
                LUSH <span className="text-[var(--secondary)]">DENTALS</span>
              </span>
              <span className="text-[10px] tracking-[0.4em] uppercase font-medium mt-2 text-[var(--foreground)]/40">
                Transforming More Than Smiles
              </span>
            </div>
            <p className="text-[var(--foreground)]/50 font-light leading-relaxed max-w-xs mx-auto md:mx-0 text-sm md:text-base">
              Experience professional dental care in a luxurious environment. We combine state-of-the-art technology with a passion for clinical excellence.
            </p>
            <div className="flex gap-6 pt-4">
              <a href={SOCIALS.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-emerald-900/5 flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href={SOCIALS.tiktok} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-emerald-900/5 flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
              </a>
            </div>
          </div>

          {/* Opening Hours - Replacing Quick Links */}
          <div className="space-y-6">
            <h4 className="text-[var(--secondary)] text-[10px] tracking-[0.3em] uppercase font-black">Opening Hours</h4>
            <ul className="space-y-4 text-sm font-medium text-[var(--foreground)]/50">
              <li>Monday - Friday: 9am - 8pm</li>
              <li>Saturday: 10am - 6pm</li>
              <li>Sunday: By Appointment</li>
              <li className="pt-4 text-[var(--primary)] font-bold text-[9px] tracking-widest uppercase">Emergency Service Available 24/7</li>
            </ul>
          </div>

          {/* Locations */}
          <div className="space-y-8">
            <h4 className="text-[var(--secondary)] text-[10px] tracking-[0.3em] uppercase font-black">Our Clinics</h4>
            <div className="space-y-8">
              {LOCATIONS.map((loc) => (
                <div key={loc.name} className="space-y-2">
                  <p className="font-bold text-[var(--foreground)] text-base">{loc.name}</p>
                  <p className="text-xs text-[var(--foreground)]/50 leading-relaxed font-light">{loc.address}</p>
                  <p className="text-xs font-bold text-[var(--primary)]">{loc.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-emerald-900/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] tracking-widest text-[var(--foreground)]/30 uppercase font-black">
            © 2026 LUSH DENTALS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-[9px] tracking-widest text-[var(--foreground)]/30 uppercase font-black hover:text-[var(--primary)] transition-colors">Privacy Policy</a>
            <a href="#" className="text-[9px] tracking-widest text-[var(--foreground)]/30 uppercase font-black hover:text-[var(--primary)] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
