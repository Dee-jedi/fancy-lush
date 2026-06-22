import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, increment } from 'firebase/firestore';
import { storage, db } from '@lush/firebase';

export function useAddProduct(onSuccess: () => void, onClose: () => void) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    tag: '',
    price: '',
    description: '',
    fullDescription: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile || !formData.name || !formData.price) return;

    setLoading(true);
    try {
      const slugId = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

      const imageRef = ref(storage, `products/${slugId}-${Date.now()}`);
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);

      await setDoc(doc(db, 'products', slugId), {
        ...formData,
        id: slugId,
        image: imageUrl,
        createdAt: new Date().toISOString()
      });

      // Increment product counter
      await setDoc(doc(db, '_meta', 'productCount'), { count: increment(1) }, { merge: true });

      setFormData({ name: '', tag: '', price: '', description: '', fullDescription: '' });
      setImageFile(null);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
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
