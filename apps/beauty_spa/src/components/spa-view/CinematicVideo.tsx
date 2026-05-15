"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CinematicVideo = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log("Autoplay prevented:", err);
        setIsPlaying(false);
        setShowControls(true);
      });
    }
  }, []);

  return (
    <section className="max-w-[1400px] mx-auto px-6 pb-24 md:pb-40">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => isPlaying && setShowControls(false)}
        className="relative h-[400px] md:h-[700px] rounded-[2.5rem] overflow-hidden shadow-[0_42px_84px_-15px_rgba(46,16,101,0.25)] bg-gray-900 group cursor-pointer"
        onClick={togglePlay}
      >
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline
          poster="/images/spa-view/treatment-room.png"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2s] ${isPlaying ? 'brightness-[0.8] scale-100' : 'brightness-[0.4] scale-105 blur-[2px]'}`}
        >
          <source src="/videos/vid1.mp4" type="video/mp4" />
        </video>
        
        <AnimatePresence>
          {(showControls || !isPlaying) && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-black/30 backdrop-blur-[2px] transition-all duration-500"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="w-24 h-24 md:w-32 md:h-32 border border-white/30 rounded-full flex items-center justify-center backdrop-blur-md mb-8"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-2xl">
                  {isPlaying ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[var(--primary)]">
                      <path d="M6 19H10V5H6V19ZM14 5V19H18V5H14Z" fill="currentColor" />
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1 text-[var(--primary)]">
                      <path d="M5 3L19 12L5 21V3Z" fill="currentColor" />
                    </svg>
                  )}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                className="space-y-2"
              >
                <h3 className="text-white text-2xl md:text-4xl font-serif tracking-wide uppercase">
                  {isPlaying ? 'Now Playing' : 'Experience Paused'}
                </h3>
                <p className="text-white/70 text-sm tracking-[0.3em] uppercase font-bold">
                  {isPlaying ? 'The Cinematic Walkthrough' : 'Click to Resume Journey'}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ambient overlay when playing but no controls */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-opacity duration-1000 ${isPlaying && !showControls ? 'opacity-100' : 'opacity-0'}`} />
      </motion.div>
    </section>
  );
};
