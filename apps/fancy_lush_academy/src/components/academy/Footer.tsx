import React from "react";

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] border-t border-white/5 py-12 text-center text-white/30 text-[9px] tracking-[0.3em] uppercase">
      © {new Date().getFullYear()} Fancy Lush Empire. All rights reserved.
    </footer>
  );
}
