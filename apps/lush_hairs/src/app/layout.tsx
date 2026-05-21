import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { SearchProvider } from "@/context/SearchContext";
import { FloatingCart } from "@/components/cart/FloatingCart";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lush Hairs & Spa | Premium Hair Extensions & Beauty Spa in Ilorin, Kwara",
  description: "Experience ultimate luxury at Lush Hairs & Spa in Ilorin, Kwara State. Sourcing 100% raw human hair, custom wig installations, HD lace frontals, expert massage therapies, and premium beauty services.",
  keywords: [
    "Spa in Ilorin", 
    "Spa in Kwara", 
    "Massage in Ilorin", 
    "Massage in Kwara", 
    "Hair salon in Ilorin", 
    "Raw human hair Kwara", 
    "Lace frontals Ilorin",
    "Lush Hairs", 
    "Wig installation Kwara", 
    "Beauty salon Ilorin", 
    "Dentals and skincare Kwara"
  ],
  authors: [{ name: "Lush Hairs & Spa" }],
  openGraph: {
    title: "Lush Hairs & Spa | Premium Hair Extensions & Beauty Spa in Ilorin, Kwara",
    description: "Welcome to the ultimate luxury destination in Ilorin. Experience raw single-donor hair extensions and expert body massage therapies.",
    type: "website",
    locale: "en_US",
    siteName: "Lush Hairs Boutique & Spa",
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
      className={`${playfair.variable} ${outfit.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[var(--background)] text-white overflow-x-hidden">
        <AuthProvider>
          <CartProvider>
            <SearchProvider>
              {children}
              <FloatingCart />
            </SearchProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
