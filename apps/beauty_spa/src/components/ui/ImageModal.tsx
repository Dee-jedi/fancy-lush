import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  altText: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageSrc, altText }) => {
  const [copyFeedback, setCopyFeedback] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await fetch(imageSrc);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      // Extract a filename from the alt text or use a generic name
      const filename = altText ? altText.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.png' : 'product_image.png';
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
      // Fallback: just open the image in a new tab
      window.open(imageSrc, '_blank');
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    // Construct the canonical URL
    const url = `https://fancylushspa.com.ng${window.location.pathname}`;
    const shareData = {
      title: altText || 'Fancy Lush Spa',
      text: `Check out ${altText} at Fancy Lush!`,
      url: url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing or user cancelled:', err);
      }
    } else {
      // Fallback to clipboard copy
      try {
        await navigator.clipboard.writeText(url);
        setCopyFeedback('Link copied!');
        setTimeout(() => setCopyFeedback(''), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 cursor-zoom-out"
        >
          {/* Actions Container */}
          <div className="absolute top-6 right-6 flex items-center gap-4 z-50">
            {copyFeedback && (
              <span className="text-white/80 text-xs font-bold tracking-widest uppercase bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md animate-pulse">
                {copyFeedback}
              </span>
            )}
            
            {/* Share Button */}
            <button
              onClick={handleShare}
              className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 border border-white/10 rounded-full p-3 transition-all cursor-pointer backdrop-blur-md"
              title="Share Product"
              aria-label="Share Product"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
            </button>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 border border-white/10 rounded-full p-3 transition-all cursor-pointer backdrop-blur-md"
              title="Download Image"
              aria-label="Download Image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </button>

            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 border border-white/10 rounded-full p-3 transition-all cursor-pointer backdrop-blur-md"
              title="Close"
              aria-label="Close fullscreen image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center rounded-2xl overflow-hidden cursor-default"
            onClick={(e) => e.stopPropagation()} // Prevent click from closing when clicking the image wrapper itself
          >
            <img
              src={imageSrc}
              alt={altText}
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
              draggable={false}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
