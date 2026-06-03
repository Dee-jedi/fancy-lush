"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { motion, AnimatePresence } from "framer-motion";
import { auth, googleProvider, db } from "@/lib/firebase";
import { signInWithPopup, onAuthStateChanged, signOut, User } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import Link from "next/link";

type MemberProfile = {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  phone: string;
  birthday: string;
  tier: "signature" | "prestige" | "noir";
  points: number;
  createdAt: unknown;
};

type AppStep = "signin" | "onboarding" | "dashboard";

export default function AccountPage() {
  const [step, setStep] = useState<AppStep>("signin");
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<MemberProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingIn, setSigningIn] = useState(false);

  // Onboarding form state
  const [formPhone, setFormPhone] = useState("");
  const [formBirthday, setFormBirthday] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const docRef = doc(db, "members", firebaseUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data() as MemberProfile);
          setStep("dashboard");
        } else {
          setStep("onboarding");
        }
      } else {
        setProfile(null);
        setStep("signin");
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleGoogleSignIn = async () => {
    setSigningIn(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Sign-in error:", err);
    } finally {
      setSigningIn(false);
    }
  };

  const handleOnboardingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setFormSubmitting(true);
    try {
      const newProfile: MemberProfile = {
        uid: user.uid,
        displayName: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
        phone: formPhone,
        birthday: formBirthday,
        tier: "signature",
        points: 0,
        createdAt: serverTimestamp(),
      };
      await setDoc(doc(db, "members", user.uid), newProfile);
      setProfile(newProfile);
      setStep("dashboard");
    } catch (err) {
      console.error("Profile creation error:", err);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setProfile(null);
    setStep("signin");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#030303] text-white">
        <Header />
        <div className="flex items-center justify-center h-[70vh]">
          <div className="w-6 h-6 border-2 border-[#a78bfa] border-t-transparent rounded-full animate-spin" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#030303] text-white selection:bg-[#a78bfa]/30 selection:text-white">
      <Header />

      <AnimatePresence mode="wait">
        {/* ═══════════════════ SIGN IN ═══════════════════ */}
        {step === "signin" && (
          <motion.div key="signin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <section className="max-w-md mx-auto px-6 pt-24 pb-32 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-10"
              >
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#a78bfa]/10 border border-[#a78bfa]/20 flex items-center justify-center mx-auto">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-serif">Your Account</h1>
                  <p className="text-sm font-light text-white/40 leading-relaxed">
                    Sign in to access your Fancy Lush Elite membership, view your digital card, and manage your privileges.
                  </p>
                </div>

                <button
                  onClick={handleGoogleSignIn}
                  disabled={signingIn}
                  className="w-full py-4 px-8 rounded-full bg-[#6366f1] text-white text-[10px] tracking-[0.25em] font-black uppercase hover:bg-[#a78bfa] transition-all duration-500 shadow-[0_8px_32px_rgba(99,102,241,0.3)] disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {signingIn ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#fff" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fff" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff" /></svg>
                      Continue with Google
                    </>
                  )}
                </button>

                <p className="text-xs text-white/20">
                  Don&apos;t have a membership yet? <Link href="/membership" className="text-[#a78bfa] hover:underline">Learn more</Link>
                </p>
              </motion.div>
            </section>
          </motion.div>
        )}

        {/* ═══════════════════ ONBOARDING ═══════════════════ */}
        {step === "onboarding" && user && (
          <motion.div key="onboarding" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <section className="max-w-lg mx-auto px-6 pt-16 pb-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-10"
              >
                <div className="text-center space-y-4">
                  {user.photoURL && (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "Profile"}
                      className="w-20 h-20 rounded-full mx-auto border-2 border-[#a78bfa]/30 shadow-lg shadow-[#6366f1]/20"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <div>
                    <span className="text-[9px] tracking-[0.4em] font-black uppercase text-[#a78bfa]/60 block mb-2">Welcome to Elite</span>
                    <h1 className="text-2xl md:text-3xl font-serif">
                      Hey, {user.displayName?.split(" ")[0] || "there"}.
                    </h1>
                    <p className="text-sm font-light text-white/40 mt-2">Let&apos;s finish setting up your membership.</p>
                  </div>
                </div>

                <form onSubmit={handleOnboardingSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[9px] tracking-[0.3em] font-black uppercase text-white/30 block">Full Name</label>
                      <input
                        type="text"
                        value={user.displayName || ""}
                        readOnly
                        className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-sm font-light text-white/60 outline-none cursor-not-allowed"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] tracking-[0.3em] font-black uppercase text-white/30 block">Email</label>
                      <input
                        type="email"
                        value={user.email || ""}
                        readOnly
                        className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-sm font-light text-white/60 outline-none cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] tracking-[0.3em] font-black uppercase text-white/30 block">Phone Number</label>
                    <input
                      type="tel"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="+234 XXX XXX XXXX"
                      required
                      className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-sm font-light text-white placeholder:text-white/20 outline-none focus:border-[#a78bfa]/40 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] tracking-[0.3em] font-black uppercase text-white/30 block">Birthday</label>
                    <input
                      type="date"
                      value={formBirthday}
                      onChange={(e) => setFormBirthday(e.target.value)}
                      required
                      className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-sm font-light text-white placeholder:text-white/20 outline-none focus:border-[#a78bfa]/40 transition-colors scheme-dark"
                    />
                  </div>

                  <div className="p-5 rounded-2xl bg-white/3 border border-white/6 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#a78bfa]/10 border border-[#a78bfa]/20 flex items-center justify-center shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-white block">Lush Signature</span>
                      <span className="text-[10px] font-light text-white/40">You&apos;ll automatically start at Tier I</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="w-full py-4 rounded-full bg-[#6366f1] text-white text-[10px] tracking-[0.25em] font-black uppercase hover:bg-[#a78bfa] transition-all duration-500 shadow-[0_8px_32px_rgba(99,102,241,0.3)] disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {formSubmitting ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "Activate Membership →"
                    )}
                  </button>
                </form>
              </motion.div>
            </section>
          </motion.div>
        )}

        {/* ═══════════════════ DASHBOARD ═══════════════════ */}
        {step === "dashboard" && profile && (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <section className="max-w-6xl mx-auto px-6 pt-12 pb-32">

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-between mb-14"
              >
                <div>
                  <span className="text-[9px] tracking-[0.4em] font-black uppercase text-[#a78bfa]/60 block mb-2">Lush {profile.tier.charAt(0).toUpperCase() + profile.tier.slice(1)} Member</span>
                  <h1 className="text-3xl md:text-5xl font-serif">Welcome back, {profile.displayName?.split(" ")[0] || "Member"}.</h1>
                </div>
                <button
                  onClick={handleSignOut}
                  className="hidden sm:flex items-center gap-2 text-[9px] tracking-[0.2em] font-black uppercase text-white/30 hover:text-white/60 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                  Sign Out
                </button>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

                {/* Digital Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="lg:col-span-5"
                >
                  <div className="relative group" style={{ perspective: "900px" }}>
                    <div className="absolute inset-0 bg-[#6366f1]/10 rounded-3xl blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    <motion.div
                      whileHover={{ rotateY: 6, rotateX: -3 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="relative w-full aspect-3/4 rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
                      style={{ background: "linear-gradient(160deg, rgba(99,102,241,0.12) 0%, rgba(10,10,12,0.95) 40%, rgba(10,10,12,1) 100%)" }}
                    >
                      <div className="absolute inset-0 p-7 sm:p-8 flex flex-col justify-between z-10">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <span className="font-serif text-base sm:text-lg tracking-[0.2em] font-black uppercase text-white/80 block">FANCY LUSH</span>
                            <span className="text-[7px] tracking-[0.3em] font-black uppercase text-[#a78bfa]/60">Elite Program</span>
                          </div>
                          <div className="w-9 h-9 rounded-full bg-[#a78bfa]/10 border border-[#a78bfa]/20 flex items-center justify-center">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[8px] tracking-[0.4em] font-black uppercase text-white/25 block">Member Tier</span>
                          <h2 className="text-4xl sm:text-5xl font-serif text-white tracking-wide capitalize">{profile.tier}</h2>
                        </div>
                        <div className="space-y-5">
                          <div className="flex gap-3">
                            {[...Array(4)].map((_, i) => (
                              <div key={i} className="flex-1 h-[3px] rounded-full bg-white/10 overflow-hidden">
                                <div className="h-full rounded-full bg-[#a78bfa]/60" style={{ width: i === 0 ? "100%" : "0%" }} />
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between items-end">
                            <div>
                              <span className="text-[7px] tracking-[0.2em] font-black uppercase text-white/25 block mb-0.5">Client</span>
                              <span className="text-xs font-light text-white/70 tracking-wider uppercase">{profile.displayName}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-[7px] tracking-[0.2em] font-black uppercase text-white/25 block mb-0.5">Since</span>
                              <span className="text-xs font-light text-white/70 tracking-wider">{new Date().getFullYear()}</span>
                            </div>
                          </div>
                          <div className="text-center">
                            <span className="text-[9px] tracking-[0.5em] font-mono text-white/20">FL — {profile.uid.substring(0, 4).toUpperCase()} — {profile.uid.substring(4, 8).toUpperCase()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-0 right-0 w-px h-full bg-linear-to-b from-[#a78bfa]/20 via-transparent to-transparent rotate-12 origin-top-right translate-x-12" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Right Column */}
                <div className="lg:col-span-7 space-y-6">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="grid grid-cols-2 gap-4">
                    <div className="p-6 rounded-2xl bg-white/3 border border-white/6">
                      <span className="text-[8px] tracking-[0.3em] font-black uppercase text-white/30 block mb-3">Points</span>
                      <span className="text-3xl md:text-4xl font-serif text-white block">{profile.points.toLocaleString()}</span>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/3 border border-white/6">
                      <span className="text-[8px] tracking-[0.3em] font-black uppercase text-white/30 block mb-3">Next Tier</span>
                      <span className="text-3xl md:text-4xl font-serif text-white block">Prestige</span>
                      <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-linear-to-r from-[#6366f1] to-[#a78bfa] rounded-full" style={{ width: `${Math.min((profile.points / 5000) * 100, 100)}%` }} />
                      </div>
                      <span className="text-[9px] text-white/30 mt-2 block">{(5000 - profile.points).toLocaleString()} pts to go</span>
                    </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="rounded-2xl bg-white/3 border border-white/6 overflow-hidden">
                    <div className="px-6 py-4 border-b border-white/5">
                      <span className="text-[9px] tracking-[0.3em] font-black uppercase text-white/30">Active Privileges</span>
                    </div>
                    <ul>
                      {[
                        { label: "Complimentary Welcome Gift", status: "Claim", icon: "🎁" },
                        { label: "10% Birthday Discount", status: profile.birthday ? new Date(profile.birthday).toLocaleDateString("en-US", { month: "short" }) : "Set birthday", icon: "🎂" },
                      ].map((priv, i) => (
                        <li key={priv.label} className={`flex items-center justify-between px-6 py-5 ${i > 0 ? "border-t border-white/4" : ""}`}>
                          <div className="flex items-center gap-4">
                            <span className="text-lg">{priv.icon}</span>
                            <span className="text-sm font-light text-white/70">{priv.label}</span>
                          </div>
                          <span className="text-[9px] tracking-[0.2em] font-black uppercase text-[#a78bfa]">{priv.status}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="grid grid-cols-2 gap-4">
                    <Link href="/membership" className="p-5 rounded-2xl bg-white/3 border border-white/6 hover:bg-white/6 hover:border-white/10 transition-all duration-300 text-left group block">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/30 group-hover:text-[#a78bfa] transition-colors mb-3">
                        <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
                      </svg>
                      <span className="text-xs font-light text-white/60 group-hover:text-white/80 transition-colors">Upgrade Tier</span>
                    </Link>
                    <button onClick={handleSignOut} className="p-5 rounded-2xl bg-white/3 border border-white/6 hover:bg-white/6 hover:border-white/10 transition-all duration-300 text-left group">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/30 group-hover:text-red-400 transition-colors mb-3">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      <span className="text-xs font-light text-white/60 group-hover:text-white/80 transition-colors">Sign Out</span>
                    </button>
                  </motion.div>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
