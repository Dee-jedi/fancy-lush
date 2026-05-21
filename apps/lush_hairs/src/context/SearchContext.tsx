"use client";

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { collection, query, orderBy, limit, startAfter, getDocs, QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  products: any[];
  filteredProducts: any[];
  clearSearch: () => void;
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  fetchMoreProducts: () => Promise<void>;
  addProductToCache: (product: any) => void;
  updateProductInCache: (product: any) => void;
  removeProductFromCache: (id: string) => void;
  refreshProducts: () => Promise<void>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);

  // Fetch initial batch
  const fetchProducts = async (reset = false) => {
    if (!db) {
      setLoading(false);
      return;
    }

    try {
      if (reset) {
        setLoading(true);
      }
      const q = query(
        collection(db, 'hair_products'),
        orderBy('createdAt', 'desc'),
        limit(30)
      );
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs;

      if (docs.length < 30) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      const productsData = docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsData);

      if (docs.length > 0) {
        setLastDoc(docs[docs.length - 1]);
      } else {
        setLastDoc(null);
      }
    } catch (error) {
      console.error("Error fetching hair products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch next batch when scrolling near bottom
  const fetchMoreProducts = async () => {
    if (loadingMore || !hasMore || !lastDoc || !db) return;

    try {
      setLoadingMore(true);
      const q = query(
        collection(db, 'hair_products'),
        orderBy('createdAt', 'desc'),
        startAfter(lastDoc),
        limit(30)
      );
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs;

      if (docs.length < 30) {
        setHasMore(false);
      }

      const productsData = docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(prev => {
        // Prevent duplicate products in cache
        const existingIds = new Set(prev.map(p => p.id));
        const uniqueNew = productsData.filter(p => !existingIds.has(p.id));
        return [...prev, ...uniqueNew];
      });

      if (docs.length > 0) {
        setLastDoc(docs[docs.length - 1]);
      }
    } catch (error) {
      console.error("Error loading more products:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchProducts(true);
  }, []);

  const addProductToCache = (newProduct: any) => {
    setProducts(prev => {
      if (prev.some(p => p.id === newProduct.id)) return prev;
      return [newProduct, ...prev];
    });
  };

  const updateProductInCache = (updatedProduct: any) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p));
  };

  const removeProductFromCache = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search Query Match (defensive checks)
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.color || "").toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    });
  }, [products, searchQuery]);

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        products,
        filteredProducts,
        clearSearch,
        loading,
        loadingMore,
        hasMore,
        fetchMoreProducts,
        addProductToCache,
        updateProductInCache,
        removeProductFromCache,
        refreshProducts: () => fetchProducts(true)
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
