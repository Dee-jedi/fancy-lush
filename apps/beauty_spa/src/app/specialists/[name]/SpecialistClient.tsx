"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/layout/Header';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Image from 'next/image';

interface Review {
  user: string;
  comment: string;
  rating: number;
}

interface Specialist {
  id: string;
  name: string;
  specialty: string;
  image: string;
  bio: string;
  rating: number;
  reviews: Review[];
}

export default function SpecialistClient({ specialist }: { specialist: Specialist }) {
  const router = useRouter();
  const [newReview, setNewReview] = useState({ user: '', comment: '', rating: 5 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addDoc(collection(db, "specialist_reviews"), {
        specialistName: specialist.name,
        user: newReview.user,
        comment: newReview.comment,
        rating: newReview.rating,
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error adding review: ", error);
      alert("Failed to send review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-32 md:pt-40">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row gap-20 items-start">
            
            {/* Left Column: Portrait & Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-5 w-full lg:w-2/5 space-y-12 lg:sticky lg:top-32"
            >
              <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl">
                <Image 
                  src={specialist.image} 
                  alt={specialist.name} 
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-10 left-10 right-10 text-white">
                  <h1 className="text-4xl md:text-5xl font-serif mb-2">{specialist.name}</h1>
                  <p className="text-[var(--secondary)] text-[10px] tracking-[0.3em] uppercase font-black">{specialist.specialty}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                  <span className="text-2xl font-serif italic text-[var(--primary)]">{specialist.rating}</span>
                </div>
                <p className="text-xl text-[var(--foreground)]/60 font-light leading-relaxed italic">
                  "{specialist.bio}"
                </p>
              </div>

              <Button href={`/book?service=massage&specialist=${specialist.id}`} className="w-full py-6 rounded-2xl text-xs tracking-[0.4em] font-black uppercase shadow-xl">
                Book with {specialist.name.split(' ')[0]}
              </Button>
            </motion.div>

            {/* Right Column: Reviews & Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-7 w-full lg:w-3/5 space-y-20 pb-32"
            >
              <div className="space-y-12">
                <div className="flex justify-between items-end border-b border-gray-100 pb-8">
                  <h2 className="text-4xl font-serif text-[var(--primary)] italic">
                    Client <span className="not-italic">Testimonials</span> <span className="text-2xl not-italic ml-2 opacity-30">({specialist.reviews.length})</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-8">
                  {specialist.reviews.map((review, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-[#faf9f6] p-10 rounded-[40px] border border-gray-50/50 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex justify-between items-center mb-6">
                        <p className="font-bold text-[var(--primary)] text-lg">{review.user}</p>
                        <div className="flex text-amber-400">
                          {[...Array(review.rating)].map((_, star) => (
                            <svg key={star} width="14" height="14" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-lg leading-relaxed italic font-light">"{review.comment}"</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Leave a Review Form */}
              <div className="bg-[var(--primary)] text-white p-12 md:p-16 rounded-[60px] shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  {submitted ? (
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center py-10 space-y-6"
                    >
                      <div className="w-20 h-20 bg-white/10 text-[var(--secondary)] rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <h3 className="font-serif italic text-4xl">Thank you, {newReview.user.split(' ')[0]}</h3>
                      <p className="text-white/60 text-lg">Your review has been sent to our concierge team.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="space-y-4">
                        <h3 className="text-4xl font-serif italic">Share your experience</h3>
                        <p className="text-white/50 text-sm tracking-widest uppercase font-bold">Your feedback is valued</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-[10px] tracking-[0.3em] uppercase font-black text-white/50 ml-1">Your Name</label>
                          <input 
                            required
                            placeholder="Divine Monday"
                            className="w-full bg-white/20 border border-white/20 rounded-2xl px-6 py-4 text-white focus:bg-white/30 focus:border-[var(--secondary)] outline-none transition-all placeholder:text-white/50"
                            value={newReview.user}
                            onChange={(e) => setNewReview({...newReview, user: e.target.value})}
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] tracking-[0.3em] uppercase font-black text-white/50 ml-1">Rating</label>
                          <div className="relative">
                            <select 
                              className="w-full bg-white/20 border border-white/20 rounded-2xl px-6 py-4 text-white focus:bg-white/30 focus:border-[var(--secondary)] outline-none transition-all appearance-none cursor-pointer"
                              value={newReview.rating}
                              onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
                            >
                              {[5,4,3,2,1].map(r => <option key={r} value={r} className="bg-[var(--primary)] text-white">{r} Stars</option>)}
                            </select>
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] tracking-[0.3em] uppercase font-black text-white/50 ml-1">Your Thoughts</label>
                        <textarea 
                          required
                          placeholder="Tell us about your session..."
                          rows={4}
                          className="w-full bg-white/20 border border-white/20 rounded-3xl px-6 py-6 text-white focus:bg-white/30 focus:border-[var(--secondary)] outline-none resize-none transition-all placeholder:text-white/50"
                          value={newReview.comment}
                          onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                        />
                      </div>

                      <Button type="submit" disabled={isSubmitting} variant="secondary" className="w-full rounded-2xl py-5 text-xs tracking-[0.4em] font-black uppercase">
                        {isSubmitting ? "Sending..." : "Submit Review"}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
