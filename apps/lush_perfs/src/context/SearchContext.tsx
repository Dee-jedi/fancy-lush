"use client";

import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import { collection, query, limit, getDocs, startAfter, orderBy, DocumentData, QueryDocumentSnapshot, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  fullDescription: string;
  image: string;
  images?: string[];
  searchTerms?: string[];
  [key: string]: any;
}

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  products: Product[];
  loading: boolean;
  loadMore: () => Promise<void>;
  hasMore: boolean;
  addProductToCache: (product: Product) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);

  // Initial fetch
  useEffect(() => {
    let isMounted = true;
    
    const fetchInitialProducts = async () => {
      setLoading(true);
      if (!db) {
        if (isMounted) {
          setProducts([]);
          setLoading(false);
          setHasMore(false);
        }
        return;
      }

      try {
        const productsRef = collection(db, "boutique_products");
        const q = query(productsRef, orderBy("createdAt", "desc"), limit(30));
        
        const querySnapshot = await getDocs(q);
        
        if (isMounted) {
          if (querySnapshot.empty) {
            setProducts([]);
            setHasMore(false);
          } else {
            const fetchedProducts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
            setProducts(fetchedProducts);
            setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
            setHasMore(querySnapshot.docs.length === 30);
          }
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        if (isMounted) {
          setProducts([]);
          setHasMore(false);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchInitialProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const loadMore = async () => {
    if (!hasMore || !lastVisible || !db || loading) return;

    setLoading(true);
    try {
      const productsRef = collection(db, "boutique_products");
      const q = query(
        productsRef,
        orderBy("createdAt", "desc"),
        startAfter(lastVisible),
        limit(30)
      );

      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const fetchedProducts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        setProducts(prev => [...prev, ...fetchedProducts]);
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setHasMore(querySnapshot.docs.length === 30);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more products:", error);
    } finally {
      setLoading(false);
    }
  };

  const addProductToCache = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  const value = useMemo(() => ({
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    products,
    loading,
    loadMore,
    hasMore,
    addProductToCache,
  }), [searchQuery, activeCategory, products, loading, hasMore]);

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
