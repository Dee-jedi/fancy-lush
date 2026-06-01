import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import { SearchProvider } from "@/context/SearchContext";
import { CartProvider } from "@/context/CartContext";
import { FloatingCart } from "@/components/cart/FloatingCart";
import { BottomNav } from "@/components/layout/BottomNav";
import { AuthProvider } from "@/context/AuthContext";
import { AdminFloatingButton } from "@/components/admin/AdminFloatingButton";

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
  metadataBase: new URL('https://lushatelier.com.ng'),
  alternates: {
    canonical: '/',
  },
  twitter: {
    card: 'summary_large_image',
  },
  title: "Lush Boutique | Luxury Gold Jewelry, Premium Perfumes & Designer Sunshades in Ilorin",
  description: "Experience absolute luxury at Lush Boutique in Ilorin, Kwara State. Sourcing solid 18K gold necklaces, diamond rings, designer sunshades, and highly concentrated Cambodian Oud extracts.",
  keywords: [
    "Jewelry in Ilorin", 
    "Perfume in Ilorin", 
    "Sunshades in Ilorin",
    "Perfume in Kwara", 
    "Jewelry shop Kwara", 
    "Gold necklaces Ilorin",
    "Designer sunglasses Kwara",
    "Cambodian Oud Kwara", 
    "Lush Boutique", 
    "Lush Jewelry", 
    "Lush Perfumes", 
    "Luxury fragrances Ilorin", 
    "Custom diamond rings Kwara", 
    "Designer fragrance store Ilorin"
  ],
  authors: [{ name: "Lush Boutique" }],
  openGraph: {
    title: "Lush Boutique | Luxury Gold Jewelry, Premium Perfumes & Designer Sunshades in Ilorin",
    description: "Welcome to the ultimate luxury accessories atelier in Ilorin. Sourcing raw 18K gold jewelry, premium perfume extracts, and designer eyewear.",
    type: "website",
    locale: "en_US",
    siteName: "Lush Boutique",
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
        <AuthProvider>
          <CartProvider>
            <SearchProvider>
              {children}
              <FloatingCart />
              <BottomNav />
              <AdminFloatingButton />
            </SearchProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}


