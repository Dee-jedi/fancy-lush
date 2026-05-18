import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "600", "800"],
});

export const metadata: Metadata = {
  title: "Fancylush Beauty & Spa | Luxury Skincare, Massages & Body Care in Ilorin, Kwara",
  description: "Welcome to Fancylush Beauty & Spa in Ilorin, Kwara State. Experience organic face lift treatments, clinical skincare, advanced body massage therapies, manicures, and complete luxury relaxation.",
  keywords: [
    "Spa in Ilorin", 
    "Spa in Kwara", 
    "Massage in Ilorin", 
    "Massage in Kwara", 
    "Beauty spa Ilorin", 
    "Skincare clinic Kwara", 
    "Best facial Ilorin",
    "Fancylush Spa", 
    "Body scrub Kwara", 
    "Bridal shower spa Ilorin", 
    "Relaxation center Ilorin"
  ],
  authors: [{ name: "Fancylush Beauty & Spa" }],
  openGraph: {
    title: "Fancylush Beauty & Spa | Luxury Skincare, Massages & Body Care in Ilorin, Kwara",
    description: "Welcome to the ultimate sanctuary in Ilorin. Renew your body with organic skincare, clinical therapy, and professional massages.",
    type: "website",
    locale: "en_US",
    siteName: "Fancylush Beauty & Spa",
  }
};

import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { FloatingCart } from "@/components/cart/FloatingCart";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${outfit.variable} h-full antialiased scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col font-sans bg-[var(--background)] text-white">
        <AuthProvider>
          <CartProvider>
            {children}
            <FloatingCart />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
