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
  metadataBase: new URL('https://fancylushacademy.com.ng'),
  alternates: {
    canonical: '/',
  },
  twitter: {
    card: 'summary_large_image',
  },
  title: "Fancy Lush Academy | Premium Beauty & Craftsmanship Education",
  description: "Learn from the masters at Fancy Lush Academy. Comprehensive training programs covering beauty aesthetics, hair artistry, and premium lifestyle craftsmanship.",
  keywords: [
    "Beauty Academy Ilorin", 
    "Makeup School Kwara", 
    "Hair Artistry Training", 
    "Fancy Lush Academy", 
    "Spa Training Nigeria"
  ],
  authors: [{ name: "Fancy Lush Academy" }],
  openGraph: {
    title: "Fancy Lush Academy | Premium Beauty & Craftsmanship Education",
    description: "Master the art of luxury beauty and lifestyle craftsmanship at Fancy Lush Academy.",
    type: "website",
    locale: "en_US",
    siteName: "Fancy Lush Academy",
  }
};

import { Navigation } from "@/components/academy/Navigation";
import { Footer } from "@/components/academy/Footer";

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
      <body className="min-h-full flex flex-col font-sans bg-[#fefdfb] text-zinc-900">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
