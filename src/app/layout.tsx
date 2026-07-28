import type { Metadata } from "next";
import { Newsreader, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import CustomCursor from "@/components/ui/CustomCursor";
import Editorial3DBackground from "@/components/ui/Editorial3DBackground";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { Analytics } from "@vercel/analytics/next";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kshitij Kumbhar",
  description: "Computer Engineering Student & Cloud Systems Architect based in Pune, India. Building cloud infrastructures and digital systems.",
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
    <html lang="en" className={`${newsreader.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#F9F7F4] text-[#1A1918] selection:bg-[#C86D51] selection:text-white min-h-screen antialiased relative">
        <Editorial3DBackground />
        <NoiseOverlay />
        <CustomCursor />
        <ThemeToggle />
        <SmoothScrollProvider>
          <div className="relative z-10">{children}</div>
        </SmoothScrollProvider>
        <Analytics />
      </body>
    </html>
  );
}
