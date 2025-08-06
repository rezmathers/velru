import type { Metadata } from "next";
import { Space_Grotesk, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { MagicCursor } from "@/components/ui/smooth-cursor";
import Navbar from "../components/layout/navbar";

import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider"; // 1. Import the provider

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ['400', '500', '700'], // Choose the weights you need
  variable: '--font-space-grotesk', // Create a CSS variable
  display: 'swap',
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ['400', '500', '700'],
  variable: '--font-be-vietnam-pro', // Create another CSS variable
  display: 'swap',
});

export const metadata: Metadata = {
  title: "VELRU - AI Transformation Partner",
  description: "Your AI Transformation Partner for on-demand C-Suite expertise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${beVietnamPro.variable}`}>
      <body >
        {/* 2. Wrap everything inside the body with the provider */}
        <SmoothScrollProvider>
          <MagicCursor />
          <Navbar />
         
          <main className="relative">
            {children}
          </main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
/* Hide the default cursor for the whole page */

