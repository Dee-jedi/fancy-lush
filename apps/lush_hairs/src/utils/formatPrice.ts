export const formatPrice = (price: string | number) => {
  if (typeof price === 'string') return price;
  
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0
  }).format(price);
};
