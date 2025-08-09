import type { Metadata } from "next";
import { Space_Grotesk, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { MagicCursor } from "@/components/ui/smooth-cursor";
import Navbar from "../components/layout/navbar";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import { DotBackgroundDemo } from "@/components/ui/dotbackground";
import { AuroraBackground } from "@/components/ui/aurorabackground";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VELRU - AI Transformation Partner",
  description: "Your AI Transformation Partner for on-demand C-Suite expertise.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${spaceGrotesk.variable} ${beVietnamPro.variable}`}>
      <body>
        <div className="w-full items-center justify-center cursor-none bg-amber-50/5 fixed  backdrop-blur-sm border-b border-white/5 h-16 z-10"></div>
        <Navbar/>
        <AuroraBackground>
          <div>
            <DotBackgroundDemo />
          </div>
        </AuroraBackground>
       
        <SmoothScrollProvider>
          <MagicCursor />
          <main className="relative">{children}</main>
          <MagicCursor />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
