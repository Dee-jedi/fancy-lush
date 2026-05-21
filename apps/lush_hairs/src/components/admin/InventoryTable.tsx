"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatPrice } from '@/utils/formatPrice';

interface InventoryTableProps {
  products: any[];
  fetching: boolean;
  deletingId: string | null;
  onDelete: (id: string) => Promise<void>;
}

export const InventoryTable = ({ products, fetching, deletingId, onDelete }: InventoryTableProps) => {
  if (fetching) {
    return (
      <div className="py-24 text-center">
        <div className="w-10 h-10 border-2 border-white/10 border-t-[var(--primary)] rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-xs text-white/30 tracking-widest uppercase">Fetching current inventory...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="border border-white/5 bg-white/[0.01] rounded-[32px] py-24 text-center space-y-4">
        <span className="text-4xl">✨</span>
        <h3 className="text-lg font-serif text-white">Your Boutique is Empty</h3>
        <p className="text-xs text-white/40 max-w-sm mx-auto font-light leading-relaxed">
          There are no products listed on your storefront. Click "Add New Product" above or the floating button to launch your first product.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-white/5 bg-white/[0.01] rounded-[32px] backdrop-blur-3xl">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/5 text-[9px] font-black tracking-widest text-white/40 uppercase">
            <th className="p-6 md:p-8">Product</th>
            <th className="p-6 md:p-8">Specs</th>
            <th className="p-6 md:p-8">Price</th>
            <th className="p-6 md:p-8 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          <AnimatePresence>
            {products.map((product) => (
              <motion.tr 
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs text-white/80 hover:bg-white/[0.02] transition-colors"
              >
                <td className="p-6 md:p-8 flex items-center gap-4">
                  <div className="w-12 h-16 rounded-xl overflow-hidden bg-white/5 border border-white/10 relative shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm text-white font-bold leading-tight">{product.name}</h4>
                    <p className="text-[10px] text-white/40 font-light max-w-xs truncate mt-0.5">{product.description}</p>
                  </div>
                </td>
                <td className="p-6 md:p-8 space-y-1">
                  {product.color ? (
                    <div className="flex items-center gap-2 text-white/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]"></span>
                      Color: <span className="font-bold text-white">{product.color}</span>
                    </div>
                  ) : null}
                  {product.size ? (
                    <div className="flex items-center gap-2 text-white/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]"></span>
                      Size: <span className="font-bold text-white">{product.size}</span>
                    </div>
                  ) : null}
                  {!product.color && !product.size && (
                    <span className="text-white/20 italic font-light">—</span>
                  )}
                </td>
                <td className="p-6 md:p-8 font-sans font-bold text-white text-sm">
                  {formatPrice(product.price)}
                </td>
                <td className="p-6 md:p-8 text-right">
                  <button
                    onClick={() => onDelete(product.id)}
                    disabled={deletingId === product.id}
                    className="w-9 h-9 rounded-full bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed group border-0 ml-auto"
                    title="Remove Product"
                  >
                    {deletingId === product.id ? (
                      <div className="w-4 h-4 border-2 border-rose-400 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    )}
                  </button>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
};
