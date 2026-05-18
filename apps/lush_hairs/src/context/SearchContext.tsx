"use client";

import React, { createContext, useContext, useState, useMemo } from 'react';
import { PRODUCTS } from '@/constants';

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  filteredProducts: typeof PRODUCTS;
  CATEGORIES: string[];
  clearFilters: () => void;
}

const CATEGORIES = ["All", "Extensions", "Frontals & Lace", "Wigs", "Care & Styling"];

const getProductCategory = (product: typeof PRODUCTS[0]) => {
  const tag = product.tag || "";
  const id = product.id || "";
  if (tag === "Care") return "Care & Styling";
  if (id.includes("frontal") || id.includes("lace")) return "Frontals & Lace";
  if (id.includes("bob") || id.includes("wig")) return "Wigs";
  return "Extensions";
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category Match
      const matchesCategory =
        activeCategory === "All" || getProductCategory(product) === activeCategory;

      // Search Query Match (defensive checks)
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.tag || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description || "").toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        activeCategory,
        setActiveCategory,
        filteredProducts,
        CATEGORIES,
        clearFilters,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
