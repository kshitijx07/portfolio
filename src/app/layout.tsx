import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import CustomCursor from "@/components/ui/CustomCursor";
import PixelCursorTrail from "@/components/ui/PixelCursorTrail";
import { Analytics } from "@vercel/analytics/next";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kshitij Kumbhar — DevOps & Cloud Engineering",
  description: "DevOps Intern @ Colgate-Palmolive & Computer Engineering Student based in Pune, India. Building cloud infrastructure, automated CI/CD pipelines, and multi-agent AI systems.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[var(--accent-acid)] selection:text-[#050505] min-h-screen antialiased relative transition-colors duration-300">
        <NoiseOverlay />
        <PixelCursorTrail />
        <CustomCursor />
        <SmoothScrollProvider>
          <div className="relative z-10">{children}</div>
        </SmoothScrollProvider>
        <Analytics />
      </body>
    </html>
  );
}
