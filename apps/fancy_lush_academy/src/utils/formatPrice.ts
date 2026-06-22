export const formatPrice = (price: string | number) =>
  `₦${Number(price.toString().replace(/[^0-9.-]+/g, "")).toLocaleString()}`;
