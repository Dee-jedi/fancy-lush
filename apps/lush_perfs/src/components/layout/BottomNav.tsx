"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

export function BottomNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  const navItems = [
    {
      label: "Boutique",
      href: "/",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="9" y1="3" x2="9" y2="21"></line>
          <line x1="15" y1="3" x2="15" y2="21"></line>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="3" y1="15" x2="21" y2="15"></line>
        </svg>
      )
    },
    {
      label: "Story",
      href: "/about",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      )
    },
    {
      label: "Bag",
      href: "/cart",
      icon: (
        <div className="relative">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-2.5 -right-2.5 bg-gradient-to-r from-[#8e5e38] to-[#f5d6c6] text-[#050404] font-serif font-black italic rounded-full text-[9px] w-4.5 h-4.5 flex items-center justify-center border border-[#050404] shadow-md">
              {totalItems}
            </span>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 lg:hidden bg-[#050404]/90 backdrop-blur-lg border-t border-white/5 pb-6 pt-3 px-8 flex justify-around items-center shadow-[0_-15px_40px_rgba(5,4,4,0.9)]">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link 
            key={item.href} 
            href={item.href} 
            className="flex flex-col items-center gap-1 relative text-center group py-1 px-4"
          >
            {/* Nav Icon */}
            <div className={`transition-colors duration-300 ${
              isActive ? "text-[#c89666]" : "text-white/40 group-hover:text-white"
            }`}>
              {item.icon}
            </div>

            {/* Label */}
            <span className={`text-[8px] tracking-[0.2em] font-black uppercase transition-all duration-300 ${
              isActive ? "text-white scale-105" : "text-white/30 group-hover:text-white/60"
            }`}>
              {item.label}
            </span>

            {/* Active Indicator Underline Dot */}
            {isActive && (
              <motion.div 
                layoutId="activeBottomNavIndicator"
                className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#c89666]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}
