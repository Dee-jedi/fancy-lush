import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, increment } from 'firebase/firestore';
import { storage, db } from '@/lib/firebase';
import { useSearch } from '@/context/SearchContext';

export function useAddProduct(onSuccess: () => void, onClose: () => void) {
  const { addProductToCache } = useSearch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    color: '',
    size: '',
    description: '',
  });
  const [imageFiles, setImageFiles] = useState<(File | null)[]>([null, null, null, null]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fbDb = db;
    const fbStorage = storage;
    if (!fbDb || !fbStorage) {
      alert("Firebase services not initialized properly. Please check your environment variables.");
      return;
    }
    if (!imageFiles[0] || !formData.name || !formData.price) {
      alert("Please fill in all required fields and upload a cover image.");
      return;
    }

    setLoading(true);
    try {
      const baseSlug = formData.name
         .toLowerCase()
         .replace(/[^a-z0-9]+/g, '-')
         .replace(/(^-|-$)+/g, '');

      const slugParts = [baseSlug];
      if (formData.color) {
        slugParts.push(formData.color.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
      }
      if (formData.size) {
        slugParts.push(formData.size.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
      }

      // Add a short 4-character unique code to guarantee no collision overwrites
      const uniqueCode = Math.random().toString(36).substring(2, 6);
      slugParts.push(uniqueCode);

      const slugId = slugParts.join('-').replace(/-+/g, '-');

      // Upload all non-null image files in parallel
      const uploadPromises = imageFiles.map(async (file, index) => {
        if (!file) return null;
        // Upload to Firebase Storage under hair_products/
        const imageRef = ref(fbStorage, `hair_products/${slugId}-angle-${index}-${Date.now()}`);
        await uploadBytes(imageRef, file);
        return getDownloadURL(imageRef);
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      const imageUrls = uploadedUrls.filter((url): url is string => url !== null);

      // Save document to Firestore hair_products collection
      await setDoc(doc(fbDb, 'hair_products', slugId), {
        id: slugId,
        name: formData.name,
        price: Number(formData.price), // Store as numeric for queries
        color: formData.color || null,  // Optional field
        size: formData.size || null,    // Optional field
        description: formData.description || `Premium ${formData.name}`,
        fullDescription: formData.description || `Experience the luxury of our premium ${formData.name}. Sourced from the finest quality materials, it offers unmatched comfort, natural appearance, and styling flexibility.`, // Dynamic generated luxury description fallback
        image: imageUrls[0] || '', // Cover image for backward compatibility
        images: imageUrls, // Array of all uploaded angles (up to 4)
        createdAt: new Date().toISOString()
      });

      // Increment product counter in _meta
      await setDoc(
        doc(fbDb, '_meta', 'hairProductCount'), 
        { count: increment(1) }, 
        { merge: true }
      );

      // Add to global search/shop cache
      addProductToCache({
        id: slugId,
        name: formData.name,
        price: Number(formData.price),
        color: formData.color || null,
        size: formData.size || null,
        description: formData.description || `Premium ${formData.name}`,
        fullDescription: formData.description || `Experience the luxury of our premium ${formData.name}. Sourced from the finest quality materials, it offers unmatched comfort, natural appearance, and styling flexibility.`,
        image: imageUrls[0] || '',
        images: imageUrls,
        createdAt: new Date().toISOString()
      });

      // Reset form
      setFormData({
        name: '',
        price: '',
        color: '',
        size: '',
        description: '',
      });
      setImageFiles([null, null, null, null]);
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error adding hair product:", error);
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
