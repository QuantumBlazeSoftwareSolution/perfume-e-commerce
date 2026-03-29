import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/ui/LenisProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Scentara Ceylon | Haute Parfumerie",
  description: "The Art of Invisible Luxury.",
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    title: "Scentara Ceylon | Haute Parfumerie",
    description: "The Art of Invisible Luxury.",
    url: "https://scentaraceylon.com",
    siteName: "Scentara Ceylon",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Scentara Ceylon",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scentara Ceylon | Haute Parfumerie",
    description: "The Art of Invisible Luxury.",
    images: ["/logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${cormorant.variable} ${dmSans.variable} antialiased selection:bg-gold-light selection:text-ink min-h-full font-body overflow-x-hidden relative cursor-none`}>
        <LenisProvider>
          <CustomCursor />
          <Navbar />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
