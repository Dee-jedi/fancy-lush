import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, increment } from 'firebase/firestore';
import { storage, db } from '@/lib/firebase';
import { useSearch } from '@/context/SearchContext';

export function useAddProduct(onSuccess: () => void, onClose: () => void) {
  // Assuming a generic SearchContext will be updated
  const { addProductToCache } = useSearch() || { addProductToCache: () => {} };
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: '', // Compulsory
    name: '', // Optional
    price: '', // Compulsory
    description: '', // Optional
  });
  const [imageFiles, setImageFiles] = useState<(File | null)[]>([null, null, null, null]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fbDb = db;
    const fbStorage = storage;
    
    if (!fbDb || !fbStorage) {
      alert("Firebase services not initialized properly.");
      return;
    }
    if (!formData.category || !formData.price || !imageFiles[0]) {
      alert("Please fill in category, price, and ensure a cover image is uploaded.");
      return;
    }

    setLoading(true);
    try {
      // Add a short 4-character unique code
      const uniqueCode = Math.random().toString(36).substring(2, 6);

      // Determine final name if omitted
      const finalName = formData.name.trim() || `Premium ${formData.category.charAt(0).toUpperCase() + formData.category.slice(1)}`;

      // Generate base slug
      const baseSlug = finalName
         .toLowerCase()
         .replace(/[^a-z0-9]+/g, '-')
         .replace(/(^-|-$)+/g, '');

      const slugId = `${baseSlug}-${formData.category}-${uniqueCode}`;

      // Upload all non-null image files in parallel
      const uploadPromises = imageFiles.map(async (file, index) => {
        if (!file) return null;
        // Upload to Firebase Storage
        const imageRef = ref(fbStorage, `boutique_products/${slugId}-angle-${index}-${Date.now()}`);
        await uploadBytes(imageRef, file);
        return getDownloadURL(imageRef);
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      const imageUrls = uploadedUrls.filter((url): url is string => url !== null);

      // Generate search terms based heavily on category
      const searchTerms = [
        formData.category.toLowerCase(),
        ...finalName.toLowerCase().split(' '),
        ...(formData.description ? formData.description.toLowerCase().split(' ') : [])
      ].filter(term => term.length > 2); // basic filtering of small words

      const newProduct = {
        id: slugId,
        name: finalName,
        price: formData.price, // Storing as string for display like "₦180,000", but could be numeric
        numericPrice: Number(formData.price.replace(/[^0-9.-]+/g,"")),
        category: formData.category,
        tag: "New Arrival",
        refCode: uniqueCode.toUpperCase(),
        description: formData.description || `Exquisite ${formData.category} offering unmatched luxury.`,
        fullDescription: formData.description || `Discover the ultimate expression of luxury with this premium ${formData.category}. Crafted with precision and the finest materials.`,
        image: imageUrls[0] || '', // Cover image
        images: imageUrls, 
        searchTerms,
        createdAt: new Date().toISOString()
      };

      // Save document to Firestore boutique_products collection
      await setDoc(doc(fbDb, 'boutique_products', slugId), newProduct);

      // Increment product counter in _meta
      await setDoc(
        doc(fbDb, '_meta', 'boutiqueProductCount'), 
        { count: increment(1) }, 
        { merge: true }
      );

      // Add to global search/shop cache (if implemented)
      if (typeof addProductToCache === 'function') {
        addProductToCache(newProduct);
      }

      // Reset form
      setFormData({
        category: '',
        name: '',
        price: '',
        description: '',
      });
      setImageFiles([null, null, null, null]);
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product: " + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    formData,
    setFormData,
    imageFiles,
    setImageFiles,
    handleSubmit
  };
}
