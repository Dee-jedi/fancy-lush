import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";

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
  title: "FANCY LUSH | The Luxury Empire of Beauty, Fragrances, Hair & Wellness",
  description: "Welcome to the central gateway of Fancy Lush. Explore our premium brands in Ilorin, Kwara: Fancy Lush Beauty & Spa, Lush Hairs, Lush Perfumes & Jewelry, and Lush Dentals. Experience world-class clinical perfection and artistic craftsmanship.",
  keywords: [
    "Fancy Lush",
    "Lush Atelier",
    "Lush Hairs",
    "Lush Dentals",
    "Beauty Spa Ilorin",
    "Gold Jewelry Kwara",
    "Niche Perfumes Nigeria",
    "Dental Clinic Ilorin",
    "Palms Mall Ilorin"
  ],
  authors: [{ name: "Fancy Lush Empire" }],
  openGraph: {
    title: "FANCY LUSH | The Luxury Empire of Beauty, Fragrances, Hair & Wellness",
    description: "The gateway to luxury beauty, fine jewelry, signature oud extracts, elite frontal installations, and state-of-the-art dental care at Palms Mall, Ilorin.",
    type: "website",
    locale: "en_US",
    siteName: "Fancy Lush Hub",
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
    >
      <body className="font-sans bg-[#050404] text-white">
        {children}
      </body>
    </html>
  );
}
