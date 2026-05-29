"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { BoutiqueFilters } from "@/components/boutique/BoutiqueFilters";
import { ProductMasonry } from "@/components/boutique/ProductMasonry";
import { Footer } from "@/components/layout/Footer";
import { useSearch } from "@/context/SearchContext";
import { PRODUCTS } from "@/constants";

export default function BoutiquePage() {
  const { searchQuery, activeCategory, products } = useSearch();

  // Instant luxury client-side search & category filtering
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.searchTerms 
      ? product.searchTerms.some((term: string) => term.includes(searchQuery.toLowerCase()))
      : (product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
         product.description?.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    return (searchQuery ? matchesSearch : true) && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-[#050404] text-[white] pb-28 lg:pb-12">
      {/* Standard Desktop/Mobile Header (Scrolls away naturally because it is absolute/fixed at top) */}
      <Header />

      {/* Spacing clearance to offset the absolute header on load */}
      <div className="h-20 md:h-24" />

      {/* Sticky Search & Category Filters (Pins automatically to top-0 when scrolled) */}
      <BoutiqueFilters />

      {/* Product Catalog Grid (Renders naturally and slides underneath the sticky filters container) */}
      <div className="pt-6 md:pt-8">
        <ProductMasonry products={filteredProducts} />
      </div>

      {/* Hide footer on mobile view, show only on desktop */}
      <div className="hidden lg:block">
        <Footer />
      </div>
    </main>
  );
}
