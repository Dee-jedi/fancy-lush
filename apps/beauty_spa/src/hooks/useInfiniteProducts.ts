import { useState, useEffect, useRef } from 'react';
import { collection, query, orderBy, limit, startAfter, getDocs, QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '@lush/firebase';

export function useInfiniteProducts(batchSize: number = 12) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);
  
  const observerRef = useRef<HTMLDivElement | null>(null);

  // Fetch initial batch
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const q = query(
        collection(db, 'products'),
        orderBy('createdAt', 'desc'),
        limit(batchSize)
      );
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs;

      if (docs.length < batchSize) {
        setHasMore(false);
      }

      const productsData = docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsData);

      if (docs.length > 0) {
        setLastDoc(docs[docs.length - 1]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch next batch when scrolling near bottom
  const fetchMoreProducts = async () => {
    if (loadingMore || !hasMore || !lastDoc) return;

    try {
      setLoadingMore(true);
      const q = query(
        collection(db, 'products'),
        orderBy('createdAt', 'desc'),
        startAfter(lastDoc),
        limit(batchSize)
      );
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs;

      if (docs.length < batchSize) {
        setHasMore(false);
      }

      const productsData = docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(prev => [...prev, ...productsData]);

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
    fetchProducts();
  }, []);

  // IntersectionObserver to trigger infinite scroll
  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          fetchMoreProducts();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [loading, hasMore, loadingMore, lastDoc]);

  return {
    products,
    loading,
    loadingMore,
    hasMore,
    observerRef
  };
}
