"use client";

import React from 'react';
import { Button } from "../ui/Button";
import { motion } from "framer-motion";
import Image from "next/image";

export const Hero = () => {
  return (
    <section className="relative pt-44 pb-20 md:pb-32 px-6 md:px-8 bg-(--background) text-(--foreground) overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[80%] md:w-[50%] h-[50%] bg-(--primary)/5 rounded-full blur-[80px] md:blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[80%] md:w-[60%] h-[60%] bg-(--secondary)/10 rounded-full blur-[100px] md:blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 md:gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
          className="space-y-8 md:space-y-10 text-center lg:text-left"
        >
          <div className="space-y-4 md:space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-4 justify-center lg:justify-start"
            >
              <span className="h-px w-8 md:w-12 bg-(--secondary)"></span>
              <span className="text-(--secondary) text-[9px] md:text-[10px] tracking-[0.4em] uppercase font-black">
                Luxury Spa & Cosmetics
              </span>
            </motion.div>
            <h1 className="text-6xl md:text-8xl lg:text-[100px] font-serif font-medium tracking-tighter leading-[0.85] lg:ml-[-5px] text-(--primary)">
              Indulge in <br />
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="text-(--secondary) italic font-light block mt-4"
              >
                True Beauty
              </motion.span>
            </h1>
          </div>

          <p className="text-base md:text-lg text-(--foreground)/60 max-w-lg mx-auto lg:mx-0 font-light leading-relaxed tracking-wide">
            Experience the pinnacle of relaxation and clinical beauty treatments. 
            From expert massages to premium cosmetic products, we redefine your glow 
            with precision and passion.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6 pt-4 justify-center lg:justify-start">
            <Button variant="primary" size="md" href="/services" className="w-full sm:w-auto shadow-xl">
              OUR SERVICES
            </Button>
            <Button variant="outline" size="md" href="/shop" className="w-full sm:w-auto border-(--primary)/40 text-(--primary) font-bold hover:border-(--primary) hover:bg-(--primary)/5">
              SHOP COLLECTION
            </Button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="relative hidden lg:block"
        >
          <div className="relative aspect-4/5 rounded-[50px] overflow-hidden border border-(--primary)/10 shadow-2xl group">
             <div className="absolute inset-0 bg-linear-to-tr from-(--primary)/20 via-transparent to-transparent z-10 opacity-30"></div>
             <motion.div 
               whileHover={{ scale: 1.1 }}
               transition={{ duration: 1.5 }}
               className="relative w-full h-full"
             >
               <Image
                 src="/images/spa-view/DSC_9754.jpg"
                 alt="Absolute Serenity Spa"
                 fill
                 priority
                 sizes="(min-width: 1024px) 50vw"
                 className="object-cover object-center"
               />
             </motion.div>
             
             {/* Floating Info Card */}
             <motion.div 
               initial={{ x: 30, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ delay: 1, duration: 0.8 }}
               className="absolute bottom-12 left-[-30px] bg-white/70 backdrop-blur-3xl p-8 rounded-[30px] border border-(--primary)/10 z-20 shadow-[0_30px_60px_-15px_rgba(46,16,101,0.15)] max-w-[260px]"
             >
               <p className="text-(--primary) font-serif italic text-2xl mb-2">"Absolute Serenity"</p>
               <p className="text-[10px] tracking-widest text-(--primary)/40 uppercase font-black">Verified Guest Review</p>
             </motion.div>
          </div>

          {/* Luxury Badge */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -top-12 -right-12 w-48 h-48 border border-(--secondary)/30 rounded-full flex items-center justify-center p-2"
          >
            <div className="w-full h-full bg-(--secondary) rounded-full flex flex-col items-center justify-center text-white shadow-2xl text-center p-4">
              <span className="text-4xl font-black leading-none">20%</span>
              <span className="text-[8px] tracking-[0.2em] font-black mt-1 uppercase text-white/60">Off First Visit</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
