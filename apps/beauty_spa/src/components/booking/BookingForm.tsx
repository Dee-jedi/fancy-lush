"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from "framer-motion";
import { SERVICES } from "@/constants";
import { Button } from "@/components/ui/Button";

export function BookingForm() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('service');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: serviceId || '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (serviceId) {
      setFormData(prev => ({ ...prev, service: serviceId }));
    }
  }, [serviceId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // For testing: Log the data to console
    console.log("New Booking Request:", formData);
    
    // Simulate a brief processing state
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setIsSubmitting(false);
    finalizeViaWhatsApp();
  };

  const finalizeViaWhatsApp = () => {
    const selectedService = SERVICES.find(s => s.id === formData.service)?.name || formData.service;
    
    // Format time to AM/PM
    const [hours, minutes] = formData.time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    const formattedTime = `${formattedHour}:${minutes} ${ampm}`;

    // Format date for readability
    const dateObj = new Date(formData.date);
    const formattedDate = dateObj.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const message = `*NEW APPOINTMENT REQUEST*

*Client:*
Name: ${formData.name}
Phone: ${formData.phone}

*Service:*
Treatment: ${selectedService}
Date: ${formattedDate}
Time: ${formattedTime}
${formData.notes ? `\n*Additional Notes:* \n${formData.notes}\n` : ''}
---
Please confirm this reservation. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/2349154211869?text=${encodedMessage}`, '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-[60px] p-8 md:p-20 shadow-[0_40px_100px_-20px_rgba(46,16,101,0.08)]"
    >
      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Personal Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <label className="text-[10px] tracking-widest uppercase font-black text-[var(--primary)]/40 ml-1">Full Name</label>
            <input 
              required
              type="text"
              placeholder="Divine Monday"
              className="w-full bg-gray-50 border-none rounded-2xl px-6 py-5 text-[var(--primary)] placeholder:text-gray-300 focus:ring-2 focus:ring-[var(--secondary)]/20 transition-all outline-none"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="space-y-4">
            <label className="text-[10px] tracking-widest uppercase font-black text-[var(--primary)]/40 ml-1">Phone Number</label>
            <input 
              required
              type="tel"
              placeholder="08012345678"
              className="w-full bg-gray-50 border-none rounded-2xl px-6 py-5 text-[var(--primary)] placeholder:text-gray-300 focus:ring-2 focus:ring-[var(--secondary)]/20 transition-all outline-none"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
        </div>

        {/* Service Selection */}
        <div className="space-y-4">
          <label className="text-[10px] tracking-widest uppercase font-black text-[var(--primary)]/40 ml-1">Select Treatment</label>
          <div className="relative">
            <select 
              required
              className="w-full bg-gray-50 border-none rounded-2xl px-6 py-5 text-[var(--primary)] focus:ring-2 focus:ring-[var(--secondary)]/20 transition-all outline-none appearance-none pr-12"
              value={formData.service}
              onChange={(e) => setFormData({...formData, service: e.target.value})}
            >
              <option value="" disabled>Choose a service...</option>
              {SERVICES.map(s => (
                <option key={s.id} value={s.id}>{s.name} — {s.price}</option>
              ))}
            </select>
            
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <label className="text-[10px] tracking-widest uppercase font-black text-[var(--primary)]/40 ml-1">Preferred Date</label>
            <div className="relative">
              <input 
                required
                type="date"
                className="w-full bg-gray-50 border-none rounded-2xl px-6 py-5 text-[var(--primary)] focus:ring-2 focus:ring-[var(--secondary)]/20 transition-all outline-none appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-inner-spin-button]:hidden [&::-webkit-clear-button]:hidden"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-200">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-[10px] tracking-widest uppercase font-black text-[var(--primary)]/40 ml-1">Preferred Time</label>
            <div className="relative">
              <input 
                required
                type="time"
                className="w-full bg-gray-50 border-none rounded-2xl px-6 py-5 text-[var(--primary)] focus:ring-2 focus:ring-[var(--secondary)]/20 transition-all outline-none appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-inner-spin-button]:hidden [&::-webkit-clear-button]:hidden"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-200">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-4">
          <label className="text-[10px] tracking-widest uppercase font-black text-[var(--primary)]/40 ml-1">Special Notes (Optional)</label>
          <textarea 
            rows={4}
            placeholder="Tell us about any skin allergies or special requests..."
            className="w-full bg-gray-50 border-none rounded-3xl px-6 py-6 text-[var(--primary)] placeholder:text-gray-300 focus:ring-2 focus:ring-[var(--secondary)]/20 transition-all outline-none resize-none"
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
          />
        </div>

        <div className="pt-8">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-4 text-xs tracking-[0.4em] rounded-3xl shadow-xl flex items-center justify-center gap-4 bg-[#25D366] hover:bg-[#128C7E] border-none"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-green-100">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            {isSubmitting ? "PREPARING MESSAGE..." : "BOOK VIA WHATSAPP"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
