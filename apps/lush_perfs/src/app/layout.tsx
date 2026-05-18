import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import { SearchProvider } from "@/context/SearchContext";
import { CartProvider } from "@/context/CartContext";
import { FloatingCart } from "@/components/cart/FloatingCart";
import { BottomNav } from "@/components/layout/BottomNav";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "600", "800"],
});

export const metadata: Metadata = {
  title: "Lush Jewelry & Fragrances | Luxury Gold Jewelry & Premium Perfumes in Ilorin, Kwara",
  description: "Experience absolute luxury at Lush Jewelry & Fragrances in Ilorin, Kwara State. Sourcing solid 18K gold necklaces, diamond rings, custom cuffs, and highly concentrated Cambodian Oud extracts.",
  keywords: [
    "Jewelry in Ilorin", 
    "Perfume in Ilorin", 
    "Perfume in Kwara", 
    "Jewelry shop Kwara", 
    "Gold necklaces Ilorin",
    "Cambodian Oud Kwara", 
    "Lush Jewelry", 
    "Lush Perfumes", 
    "Luxury fragrances Ilorin", 
    "Custom diamond rings Kwara", 
    "Designer fragrance store Ilorin"
  ],
  authors: [{ name: "Lush Jewelry & Fragrances" }],
  openGraph: {
    title: "Lush Jewelry & Fragrances | Luxury Gold Jewelry & Premium Perfumes in Ilorin, Kwara",
    description: "Welcome to the ultimate luxury accessories atelier in Ilorin. Sourcing raw 18K gold jewelry and premium perfume extracts.",
    type: "website",
    locale: "en_US",
    siteName: "Lush Jewelry & Fragrances",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${outfit.variable} antialiased scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <body className="font-sans bg-[#050404] text-white">
        <AuthProviderWrapper>
          <CartProvider>
            <SearchProvider>
              {children}
              <FloatingCart />
              <BottomNav />
            </SearchProvider>
          </CartProvider>
        </AuthProviderWrapper>
      </body>
    </html>
  );
}

// Simple fallback wrapper to ensure it runs even if AuthProvider is set up later
function AuthProviderWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


