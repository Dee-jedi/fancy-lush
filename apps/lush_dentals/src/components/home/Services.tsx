"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import { SERVICES } from "@/constants";

export const Services = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-40 bg-white px-6 md:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Section Header — centered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 sm:mb-24 flex flex-col items-center text-center gap-6"
        >
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-(--secondary)" />
            <span className="text-[13px] font-bold text-(--foreground)/40 uppercase tracking-[0.2em]">Our Expertise</span>
            <span className="h-px w-10 bg-(--secondary)" />
          </div>
          <h2 className="text-[32px] sm:text-[48px] lg:text-[56px] font-serif font-bold text-(--primary) leading-none tracking-tighter">
            Our Services.
          </h2>
          <p className="text-[16px] sm:text-[18px] text-(--foreground)/50 max-w-md leading-relaxed font-light">
            From preventive checkups to complex aesthetic transformations, we offer the full spectrum of dental excellence.
          </p>
        </motion.div>

        {/* Accordion List */}
        <div className="flex flex-col border-t border-emerald-900/5">
          {SERVICES.map((service, index) => {
            const isOpen = openIndex === index;
            const num = String(index + 1).padStart(2, '0');

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.08 }}
                className="border-b border-emerald-900/5"
              >
                {/* Row Button */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full py-8 sm:py-10 lg:py-14 flex items-center justify-between text-left group cursor-pointer"
                >
                  <div className="flex items-center sm:items-baseline gap-5 sm:gap-10 lg:gap-14">
                    <span className={`text-[22px] sm:text-[32px] lg:text-[44px] font-mono font-light transition-colors duration-300 ${isOpen ? 'text-(--secondary)' : 'text-(--foreground)/20 group-hover:text-(--foreground)/40'}`}>
                      {num}
                    </span>
                    <h3 className={`text-[22px] min-[400px]:text-[26px] sm:text-[48px] lg:text-[72px] font-serif font-bold tracking-tighter leading-[1.1] transition-colors duration-300 ${
                      isOpen ? 'text-(--primary)' : 'text-(--foreground)/30 group-hover:text-(--foreground)/60'
                    }`}>
                      {service.name}
                    </h3>
                  </div>

                  <div className={`shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    isOpen
                      ? 'border-(--primary) bg-(--primary)'
                      : 'border-emerald-900/10 group-hover:border-(--primary)/40'
                  }`}>
                    <motion.svg
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${isOpen ? 'text-white' : 'text-(--foreground)/30 group-hover:text-(--primary)/60'}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </motion.svg>
                  </div>
                </button>

                {/* Expandable Content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-12 sm:pb-16 pl-0 sm:pl-[72px] lg:pl-[104px] flex flex-col lg:flex-row gap-10 lg:gap-20">
                        <div className="w-full lg:w-1/2 flex flex-col gap-8">
                          <p className="text-[16px] sm:text-[18px] text-(--foreground)/60 leading-relaxed font-light">
                            {service.fullDescription}
                          </p>

                          {/* Tag: service tag pill */}
                          <div className="flex flex-wrap gap-2 sm:gap-3">
                            <span className="px-4 py-2 text-[12px] font-bold text-(--primary) bg-emerald-50 rounded-full border border-emerald-900/5 uppercase tracking-wider">
                              {service.tag}
                            </span>
                            <span className="px-4 py-2 text-[12px] font-bold text-(--foreground)/40 bg-(--background) rounded-full border border-emerald-900/5 uppercase tracking-wider">
                              Lush Dentals
                            </span>
                          </div>

                          <Link
                            href={`/services/${service.id}`}
                            className="inline-flex items-center gap-2 text-[14px] font-bold text-(--primary) hover:text-emerald-800 transition-colors group/link w-fit"
                          >
                            Learn More
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </Link>
                        </div>

                        {/* Right: Service image */}
                        <div className="w-full lg:w-1/2">
                          <div
                            className="w-full aspect-video rounded-[24px] overflow-hidden relative border border-emerald-900/5"
                            style={{ backgroundImage: `url(${service.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                          >
                            <div className="absolute inset-0 bg-(--primary)/5" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
