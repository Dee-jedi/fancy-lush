"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { motion } from "framer-motion";
import Link from "next/link";

const tiers = [
  {
    name: "Signature",
    tag: "TIER I",
    price: "Free",
    description: "Your introduction to the ecosystem. Every journey begins here.",
    perks: ["Welcome perfume sample", "10% birthday discount", "Ecosystem newsletter", "Digital membership card"],
    accent: "#a78bfa",
  },
  {
    name: "Prestige",
    tag: "TIER II",
    price: "₦50,000 / yr",
    description: "For the devoted. Priority access, complimentary services, and elevated care.",
    perks: ["3 free haircuts / 6 months", "20% off every 5th service", "Priority booking at all houses", "Early access to new drops", "All Signature perks"],
    accent: "#c4b5fd",
    featured: true,
  },
  {
    name: "Noir",
    tag: "TIER III",
    price: "Invite Only",
    description: "The ultimate expression of bespoke luxury. Reserved for the elite.",
    perks: ["VIP suite upgrades", "Unlimited wig maintenance", "Annual luxury gift box", "Dedicated WhatsApp concierge", "All Prestige perks"],
    accent: "#818cf8",
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function MembershipPage() {
  return (
    <main className="min-h-screen bg-[#030303] text-white selection:bg-[#a78bfa]/30 selection:text-white">
      <Header />

      {/* ─── Hero ─── */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/membership_bg.png" alt="Membership Background" className="w-full h-full object-cover opacity-40 mix-blend-screen" />
          <div className="absolute inset-0 bg-linear-to-b from-[#030303]/40 via-[#030303]/60 to-[#030303]" />
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#6366f1]/8 rounded-full blur-[180px] pointer-events-none" />
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-3xl mx-auto text-center px-6 space-y-10"
        >
          <motion.div variants={fadeUp} className="space-y-6">
            <span className="inline-block text-[9px] tracking-[0.5em] font-black uppercase text-[#a78bfa]/80">
              Fancy Lush Elite
            </span>
            <h1 className="text-[clamp(2.2rem,6vw,5rem)] font-serif leading-[1.1] tracking-tight">
              One Card.<br />
              Four Houses.<br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#c4b5fd] via-[#a78bfa] to-[#6366f1] italic font-light">
                Infinite Luxury.
              </span>
            </h1>
          </motion.div>

          <motion.p variants={fadeUp} className="text-sm md:text-base font-light text-white/40 leading-[1.8] max-w-lg mx-auto">
            Your digital passport to the entire Fancy Lush ecosystem. Earn rewards across botanical skincare, clinical dentistry, couture wigs, and bespoke perfumery.
          </motion.p>

          {/* Scroll Indicator */}
          <motion.div variants={fadeUp} className="pt-16 flex flex-col items-center gap-3">
            <span className="text-[8px] tracking-[0.3em] font-black uppercase text-white/40">Explore Tiers</span>
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-5 h-8 border border-white/20 rounded-full flex justify-center p-1"
            >
              <div className="w-1 h-1.5 bg-[#a78bfa] rounded-full" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Tier Comparison ─── */}
      <section className="relative px-6 pb-20 pt-16">
        {/* Subtle Purple Glow Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#6366f1]/5 rounded-full blur-[120px]" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 space-y-4"
          >
            <span className="text-[9px] tracking-[0.4em] font-black uppercase text-white/30">The Three Echelons</span>
            <h2 className="text-2xl md:text-4xl font-serif text-white">Choose Your Tier</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`relative group rounded-3xl bg-white/3 border border-white/6 p-8 flex flex-col gap-6 transition-all duration-500 hover:border-[#a78bfa]/30 ${tier.featured ? "md:-translate-y-4 shadow-2xl shadow-[#6366f1]/10 bg-[#a78bfa]/5 border-[#a78bfa]/20" : ""}`}
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#6366f1] text-white text-[8px] tracking-[0.3em] font-black uppercase px-4 py-1 rounded-full shadow-lg shadow-[#6366f1]/30">
                    Most Popular
                  </span>
                )}
                <div className="space-y-3">
                  <span className="text-[8px] tracking-[0.3em] font-black uppercase text-white/30">{tier.tag}</span>
                  <h3 className="text-2xl font-serif text-white">{tier.name}</h3>
                  <p className="text-lg font-serif text-[#a78bfa]">{tier.price}</p>
                  <p className="text-xs font-light text-white/40 leading-relaxed">{tier.description}</p>
                </div>
                <div className="h-px bg-white/5" />
                <ul className="space-y-3 flex-1">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-3 text-xs font-light text-white/60">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={tier.accent} strokeWidth="2.5" className="mt-0.5 shrink-0"><polyline points="20 6 9 17 4 12" /></svg>
                      {perk}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="relative px-6 py-24 border-t border-white/5 overflow-hidden">
        {/* Subtle Purple Glow Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#a78bfa]/5 rounded-full blur-[140px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 space-y-4"
          >
            <span className="text-[9px] tracking-[0.4em] font-black uppercase text-white/30">Getting Started</span>
            <h2 className="text-2xl md:text-4xl font-serif text-white">How It Works</h2>
          </motion.div>

          <div className="relative mt-20">
            {/* Connecting Line Desktop */}
            <div className="hidden md:block absolute top-[23px] left-[10%] right-[10%] h-px bg-white/10" />
            
            {/* Connecting Line Mobile */}
            <div className="md:hidden absolute top-10 bottom-10 left-[23px] w-px bg-white/10" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              {[
                { step: "01", title: "Sign Up", desc: "Create your account with Google. It takes 30 seconds." },
                { step: "02", title: "Get Your Card", desc: "Your digital membership card activates instantly at Signature tier." },
                { step: "03", title: "Earn & Enjoy", desc: "Present your card at any Fancy Lush house to earn points and unlock perks." },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="relative flex md:flex-col items-start md:items-center gap-6 md:text-center group"
                >
                  {/* Node */}
                  <div className="relative z-10 w-12 h-12 rounded-full bg-[#030303] border border-white/20 flex items-center justify-center shrink-0 group-hover:border-[#6366f1] group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-500">
                    <div className="absolute inset-0 bg-[#6366f1]/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="text-[10px] tracking-wider font-black text-white/50 group-hover:text-[#a78bfa] transition-colors">{item.step}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-3 pt-1 md:pt-2">
                    <h3 className="text-xl font-serif text-white">{item.title}</h3>
                    <p className="text-sm font-light text-white/40 leading-relaxed max-w-[260px]">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center pt-16">
            <Link href="/account">
              <button className="py-4 px-12 rounded-full bg-[#6366f1] text-white text-[10px] tracking-[0.25em] font-black uppercase hover:bg-[#a78bfa] transition-all duration-500 shadow-[0_8px_32px_rgba(99,102,241,0.3)]">
                Apply for Membership &rarr;
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
