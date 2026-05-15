"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const spaImages = [
  {
    src: '/images/spa-view/interior-1.png',
    title: 'The Sanctuary',
    description: 'A space designed for complete tranquility and mental reset.',
    height: 'h-[400px]'
  },
  {
    src: '/images/spa-view/treatment-room.png',
    title: 'Private Suites',
    description: 'Bespoke treatments in an intimate, serene environment.',
    height: 'h-[300px]'
  },
  {
    src: '/images/spa-view/reception.png',
    title: 'Warm Welcome',
    description: 'Your journey to relaxation begins the moment you step in.',
    height: 'h-[500px]'
  },
  {
    src: '/images/spa-view/lounge.png',
    title: 'Zen Lounge',
    description: 'Unwind before or after your treatment in our designer lounge.',
    height: 'h-[350px]'
  },
  {
    src: '/images/sanctuary-1.jpg',
    title: 'Relaxation Area',
    description: 'Breathe in the essence of calm in our dedicated rest zones.',
    height: 'h-[450px]'
  },
  {
    src: '/images/sanctuary-2.jpg',
    title: 'Golden Hour',
    description: 'Experience the spa bathed in soft, natural light.',
    height: 'h-[300px]'
  },
  {
    src: '/images/massage.png',
    title: 'Expert Massage',
    description: 'Physical renewal through expert clinical touch.',
    height: 'h-[550px]'
  },
  {
    src: '/images/experience.jpg',
    title: 'Sensory Journey',
    description: 'A multi-sensory experience designed for total harmony.',
    height: 'h-[400px]'
  },
  {
    src: '/images/lashes.png',
    title: 'Lash Studio',
    description: 'Precision beauty in our dedicated lash and brow suite.',
    height: 'h-[320px]'
  },
  {
    src: '/images/microblading.png',
    title: 'Detail Room',
    description: 'Focusing on the fine details of your natural beauty.',
    height: 'h-[480px]'
  }
];

export const Gallery = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-24 md:pb-40">
      <div className="mb-24 text-center">
        <h3 className="text-3xl md:text-5xl font-serif text-[var(--primary)] mb-4 tracking-tight">The Gallery</h3>
        <p className="text-[var(--secondary)] text-[10px] tracking-[0.4em] uppercase font-black">Inside the Sanctuary</p>
        <div className="w-20 h-1 bg-[var(--secondary)] mx-auto rounded-full mt-8" />
      </div>

      <div className="columns-2 gap-1 md:gap-8 space-y-4 md:space-y-8">
        {spaImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: (index % 2) * 0.2, duration: 0.8 }}
            className={`relative break-inside-avoid overflow-hidden rounded-[2.5rem] group cursor-pointer shadow-xl transition-all duration-700 hover:shadow-2xl mb-1 ${image.height}`}
          >
            <Image
              src={image.src}
              alt={image.title}
              fill
              className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-8 md:p-12">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                className="translate-y-4 group-hover:translate-y-0 transition-transform duration-700"
              >
                <h4 className="text-white text-3xl font-serif mb-3 tracking-wide">{image.title}</h4>
                <p className="text-white/70 text-sm font-medium leading-relaxed">{image.description}</p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
