"use client";

import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, totalItems, clearCart } = useCart();

  const totalPrice = cart.reduce((sum, item) => {
    const priceValue = parseInt(item.price.replace(/[^\d]/g, ''));
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
    const itemsList = cart.map(item => `- ${item.name} (x${item.quantity}) - ${item.price}`).join('\n');
    const message = `*NEW LUSH ACCESSORIES ORDER*

*Items:*
${itemsList}

*Total:* ${formatNaira(totalPrice)}

Please confirm availability of these accessories. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/2349154211869?text=${encodedMessage}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-[#050404] text-white pb-28 lg:pb-12">
      <Header />
      
      <div className="max-w-4xl mx-auto px-6 pt-36 pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 space-y-4"
        >
          <span className="text-[#c89666] text-[10px] tracking-[0.4em] font-black uppercase">Your Selection</span>
          <h1 className="text-4xl md:text-6xl font-serif text-white italic">Shopping <span className="not-italic font-light">Bag</span></h1>
        </motion.div>

        {cart.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#110c0a]/50 rounded-[2.5rem] p-12 text-center space-y-8 border border-white/5 shadow-2xl"
          >
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto text-white/20">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </div>
            <div className="space-y-2">
              <p className="text-xl font-serif text-white">Your selection bag is empty</p>
              <p className="text-white/40 text-xs font-light">Explore our fine jewelry and luxury fragrances.</p>
            </div>
            <Link href="/" className="inline-block">
              <button className="px-10 py-3.5 bg-gradient-to-r from-[#8e5e38] via-[#c89666] to-[#f5d6c6] hover:scale-105 transition-transform text-[#050404] text-[9px] tracking-widest font-black uppercase rounded-full shadow-lg">
                Explore Boutique
              </button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence mode='popLayout'>
                {cart.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-[#110c0a]/40 rounded-[2rem] p-6 flex items-center gap-6 border border-white/5 relative group shadow-xl"
                  >
                    <div className="w-20 h-20 flex-none rounded-[1.5rem] overflow-hidden shadow-md relative border border-white/5">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-grow space-y-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[7px] tracking-widest font-black uppercase text-white/30 block mb-1">
                            {item.category === "jewelry" ? "Fine Jewelry" : "Fragrance Extract"}
                          </span>
                          <h3 className="text-sm md:text-base font-serif text-white group-hover:text-[#c89666] transition-colors line-clamp-1">{item.name}</h3>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 text-white/30 hover:text-red-400 transition-colors"
                          title="Remove item"
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-3">
                          <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#8e5e38] via-[#c89666] to-[#f5d6c6] font-bold font-serif italic text-sm md:text-base">{item.price}</p>
                          {item.quantity > 1 && (
                            <span className="bg-white/5 text-[#c89666] px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider border border-[#c89666]/20">
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

            {/* Checkout Card */}
            <div className="lg:col-span-1">
              <div className="bg-[#110c0a]/50 rounded-[2rem] p-8 border border-white/5 shadow-2xl sticky top-28 space-y-6">
                <h2 className="text-lg font-serif text-white pb-4 border-b border-white/5">Order Summary</h2>
                
                <div className="space-y-3 text-xs text-white/50">
                  <div className="flex justify-between">
                    <span className="font-light">Subtotal ({totalItems} items)</span>
                    <span className="font-medium text-white">{formatNaira(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-light">Shipping</span>
                    <span className="text-emerald-400 font-bold uppercase text-[9px] tracking-widest pt-0.5">Calculated at checkout</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <div className="flex justify-between items-baseline mb-8">
                    <span className="text-sm font-serif italic text-white/70">Total</span>
                    <span className="text-2xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8e5e38] via-[#c89666] to-[#f5d6c6]">
                      {formatNaira(totalPrice)}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <button 
                      onClick={handleCheckout}
                      className="w-full bg-[#25D366] hover:bg-[#128C7E] hover:scale-105 active:scale-95 transition-all text-white border-none py-4 text-[9px] tracking-widest rounded-xl font-black uppercase flex items-center justify-center gap-2.5 shadow-lg animate-all duration-300"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      COMPLETE ON WHATSAPP
                    </button>
                    <button 
                      onClick={clearCart}
                      className="w-full text-center text-[8px] tracking-[0.3em] uppercase font-black text-white/20 hover:text-white transition-colors"
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
