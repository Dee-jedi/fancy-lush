"use client";

import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@lush/ui";
import Link from 'next/link';
import Image from 'next/image';

export default function CartPage() {
  const { cart, removeFromCart, totalItems, clearCart } = useCart();

  const totalPrice = cart.reduce((sum, item) => {
    const rawPrice = item.price;
    const priceValue = typeof rawPrice === 'number'
      ? rawPrice
      : parseInt(String(rawPrice || '0').replace(/[^\d]/g, ''), 10) || 0;
    return sum + (priceValue * item.quantity);
  }, 0);

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleCheckout = () => {
    const itemsList = cart.map(item => {
      const formattedPrice = typeof item.price === 'number' ? formatNaira(item.price) : item.price;
      const details = [
        item.color && `Color: ${item.color}`,
        item.size && `Size/Length: ${item.size}`,
      ].filter(Boolean).join(' | ');
      return `- ${item.name} (x${item.quantity}) - ${formattedPrice}${details ? `\n  _${details}_` : ''}`;
    }).join('\n');
    const message = `*NEW ORDER REQUEST (LUSH HAIRS)*\n\n*Items:*\n${itemsList}\n\n*Total:* ${formatNaira(totalPrice)}\n\nPlease confirm availability. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/2349154211869?text=${encodedMessage}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-[#030712] overflow-x-hidden">
      <Header />
      
      <div className="max-w-6xl mx-auto px-6 pt-40 pb-32 relative">
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--primary)]/10 rounded-full blur-[150px] pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 space-y-4 relative z-10"
        >
          <span className="text-[var(--primary)] text-[10px] tracking-[0.4em] font-black uppercase">Your Selection</span>
          <h1 className="text-5xl md:text-7xl font-serif text-white">Shopping <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">Bag</span></h1>
        </motion.div>

        {cart.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/5 backdrop-blur-md rounded-[40px] p-20 text-center space-y-8 border border-white/10 relative z-10"
          >
            <div className="w-24 h-24 bg-[#030712] rounded-full flex items-center justify-center mx-auto text-white/30 border border-white/5">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-serif text-white">Your bag is empty</p>
              <p className="text-white/40 font-light">Discover our premium extensions and products.</p>
            </div>
            <Link href="/shop">
              <Button variant="primary" className="px-12 py-5 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] border-0 text-white cursor-pointer">
                Start Shopping
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start relative z-10">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence mode='popLayout'>
                {cart.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white/5 backdrop-blur-md rounded-[30px] p-6 md:p-8 flex items-center gap-6 border border-white/10 relative group"
                  >
                    <div className="w-24 h-24 flex-none rounded-2xl overflow-hidden shadow-lg relative">
                      <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
                    </div>
                    
                    <div className="flex-grow space-y-2">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-serif text-white pr-4">{item.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-white/30 hover:text-red-400 transition-colors"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <p className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] font-bold font-sans text-lg">
                            {typeof item.price === 'number' ? formatNaira(item.price) : item.price}
                          </p>
                          {item.quantity > 1 && (
                            <span className="bg-white/10 text-white/70 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/5">
                              x{item.quantity}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 backdrop-blur-xl rounded-[40px] p-8 md:p-10 border border-white/10 sticky top-32 space-y-8">
                <h2 className="text-2xl font-serif text-white pb-6 border-b border-white/10">Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Subtotal ({totalItems} items)</span>
                    <span className="font-medium text-white">{formatNaira(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Shipping</span>
                    <span className="text-[var(--primary)] font-black uppercase text-[9px] tracking-widest pt-1">Calculated next</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <div className="flex justify-between items-baseline mb-10">
                    <span className="text-lg font-serif text-white/70">Total</span>
                    <span className="text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">{formatNaira(totalPrice)}</span>
                  </div>

                  <div className="space-y-4">
                    <Button 
                      onClick={handleCheckout}
                      variant="primary"
                      className="w-full bg-[#25D366] hover:bg-[#128C7E] border-none py-6 text-[10px] tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(37,211,102,0.2)] text-white"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      COMPLETE ON WHATSAPP
                    </Button>
                    <button 
                      onClick={clearCart}
                      className="w-full text-center text-[9px] tracking-[0.3em] uppercase font-black text-white/30 hover:text-[var(--primary)] transition-colors pt-2"
                    >
                      Clear Selection
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="hidden lg:block">
        <Footer />
      </div>
    </main>
  );
}
