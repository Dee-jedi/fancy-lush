import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://lushdental.com.ng'),
  alternates: {
    canonical: '/',
  },
  twitter: {
    card: 'summary_large_image',
  },
  title: "Lush Dentals | Best Dentist, Teeth Whitening & Cosmetic Dental Clinic in Ilorin, Kwara",
  description: "Welcome to Lush Dentals in Ilorin, Kwara State. Our expert dentists offer professional teeth cleaning, cosmetic dentistry, emergency dental care, dental implants, teeth whitening, and general oral surgery in a comfortable clinic.",
  keywords: [
    "Dentist in Ilorin", 
    "Dentist in Kwara", 
    "Dental clinic in Ilorin", 
    "Dental clinic in Kwara", 
    "Teeth whitening Ilorin", 
    "Emergency dentist Kwara", 
    "Tooth extraction Ilorin",
    "Lush Dentals", 
    "Best dentist Kwara", 
    "Cosmetic dentistry Ilorin", 
    "Teeth cleaning price Kwara"
  ],
  authors: [{ name: "Lush Dentals Clinic" }],
  openGraph: {
    title: "Lush Dentals | Best Dentist, Teeth Whitening & Dental Clinic in Ilorin, Kwara",
    description: "Experience exceptional dental care in Ilorin. Professional teeth whitening, cleaning, implants, and emergency services for healthier smiles.",
    type: "website",
    locale: "en_US",
    siteName: "Lush Dentals Clinic",
  }
};

import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} h-full antialiased scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col font-sans">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
