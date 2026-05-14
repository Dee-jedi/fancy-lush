import { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { storage, db } from '@lush/firebase';

export function useEditProduct(product: any, onSuccess: () => void, onClose: () => void) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    tag: '',
    price: '',
    description: '',
    fullDescription: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        tag: product.tag || '',
        price: product.price || '',
        description: product.description || '',
        fullDescription: product.fullDescription || '',
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    setLoading(true);
    try {
      let imageUrl = product.image;

      // If a new image is selected, upload it
      if (imageFile) {
        const imageRef = ref(storage, `products/${product.id}-${Date.now()}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      // Update document in Firestore
      await updateDoc(doc(db, 'products', product.id), {
        ...formData,
        image: imageUrl,
        updatedAt: new Date().toISOString()
      });

      setImageFile(null);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    formData,
    setFormData,
    setImageFile,
    handleSubmit
  };
}
