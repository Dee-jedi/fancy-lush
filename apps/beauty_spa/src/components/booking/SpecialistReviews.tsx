"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface Review {
  user: string;
  comment: string;
  rating: number;
}

interface Specialist {
  name: string;
  specialty: string;
  image: string;
  bio: string;
  rating: number;
  reviews: Review[];
}

export const SpecialistReviews = ({ specialist, onClose }: { specialist: Specialist, onClose: () => void }) => {
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-white w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-[40px] shadow-2xl flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Specialist Bio */}
        <div className="w-full md:w-2/5 bg-gray-50 p-8 md:p-12 flex flex-col items-center text-center border-r border-gray-100">
          <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden mb-8 shadow-xl border-4 border-white">
            <img src={specialist.image} alt={specialist.name} className="w-full h-full object-cover" />
          </div>
          <h3 className="text-3xl font-serif text-[var(--primary)] mb-2">{specialist.name}</h3>
          <p className="text-[var(--secondary)] text-[10px] tracking-[0.3em] uppercase font-black mb-6">{specialist.specialty}</p>
          <p className="text-gray-500 text-sm leading-relaxed italic mb-8">"{specialist.bio}"</p>
          
          <div className="flex items-center gap-2 mb-12">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              ))}
            </div>
            <span className="text-lg font-serif italic text-[var(--primary)]">{specialist.rating} Rating</span>
          </div>

          <Button onClick={onClose} variant="outline" className="mt-auto w-full rounded-2xl text-[10px] tracking-widest font-black uppercase">Close Profile</Button>
        </div>

        {/* Right: Reviews & Form */}
        <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <h4 className="text-2xl font-serif text-[var(--primary)]">Client Reviews</h4>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{specialist.reviews.length} Verified Reviews</span>
          </div>

          <div className="space-y-8 mb-16">
            {specialist.reviews.map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50/50 p-6 rounded-3xl border border-gray-50"
              >
                <div className="flex justify-between items-start mb-3">
                  <p className="font-bold text-[var(--primary)] text-sm">{review.user}</p>
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, star) => (
                      <svg key={star} width="10" height="10" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed italic font-light leading-relaxed">"{review.comment}"</p>
              </motion.div>
            ))}
          </div>

          {/* Review Form */}
          <div className="mt-auto bg-[var(--primary)]/5 p-8 rounded-[40px]">
            {submitted ? (
              <div className="text-center py-6 space-y-4">
                 <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                 </div>
                 <p className="font-serif italic text-xl text-[var(--primary)]">Thank you for your review!</p>
                 <p className="text-sm text-gray-500">Your feedback helps {specialist.name.split(' ')[0]} grow.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <p className="text-sm font-serif italic text-[var(--primary)] mb-4">Leave your experience</p>
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    required
                    placeholder="Your Name"
                    className="bg-white border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-[var(--secondary)]/20 outline-none"
                    value={newReview.user}
                    onChange={(e) => setNewReview({...newReview, user: e.target.value})}
                  />
                  <select 
                    className="bg-white border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-[var(--secondary)]/20 outline-none"
                    value={newReview.rating}
                    onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
                  >
                    {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                  </select>
                </div>
                <textarea 
                  required
                  placeholder="Share your thoughts..."
                  rows={2}
                  className="w-full bg-white border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-[var(--secondary)]/20 outline-none resize-none"
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                />
                <Button type="submit" disabled={isSubmitting} className="w-full rounded-2xl py-3 text-[10px] tracking-[0.3em] font-black uppercase">
                  {isSubmitting ? "Sending..." : "Submit Review"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
