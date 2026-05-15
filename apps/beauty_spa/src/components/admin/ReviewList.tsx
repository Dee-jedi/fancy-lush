"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';

interface Review {
  id: string;
  specialistName: string;
  user: string;
  comment: string;
  rating: number;
  createdAt: any;
}

export const ReviewList = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "specialist_reviews"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const reviewsData: Review[] = [];
      querySnapshot.forEach((doc) => {
        reviewsData.push({ id: doc.id, ...doc.data() } as Review);
      });
      setReviews(reviewsData);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await deleteDoc(doc(db, "specialist_reviews", id));
        // Update local state instead of re-fetching to save one more read
        setReviews(prev => prev.filter(r => r.id !== id));
      } catch (error) {
        console.error("Error deleting review:", error);
        alert("Failed to delete review.");
      }
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="w-10 h-10 border-4 border-gray-100 border-t-[var(--secondary)] rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-xs text-gray-400 uppercase tracking-widest">Loading reviews...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-2xl font-serif text-[var(--primary)]">Specialist Reviews</h3>
        <button 
          onClick={fetchReviews}
          className="p-3 bg-white rounded-full border border-gray-100 text-[var(--secondary)] hover:bg-[var(--secondary)]/10 hover:rotate-180 transition-all duration-500 shadow-sm"
          title="Refresh Reviews"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path>
            <polyline points="21 3 21 8 16 8"></polyline>
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence mode="popLayout">
          {reviews.length === 0 ? (
            <p className="py-20 text-center text-gray-400 italic">No reviews found yet.</p>
          ) : (
            reviews.map((review) => (
              <motion.div
                key={review.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white p-6 md:p-8 rounded-[30px] border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black uppercase tracking-widest text-[var(--secondary)]">{review.specialistName}</span>
                    <div className="flex text-amber-400 scale-75 origin-left">
                      {[...Array(review.rating)].map((_, i) => (
                        <svg key={i} width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-[var(--primary)] font-bold">{review.user}</p>
                  <p className="text-sm text-gray-500 italic leading-relaxed">"{review.comment}"</p>
                  <p className="text-[10px] text-gray-300 font-medium">
                    {review.createdAt?.toDate().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                
                <button 
                  onClick={() => handleDelete(review.id)}
                  className="text-red-400 hover:text-red-600 p-3 hover:bg-red-50 rounded-full transition-all"
                  title="Delete Review"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
