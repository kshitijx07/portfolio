import type { Metadata } from "next";
import { Syne, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-space-grotesk", // keeping variable name for seamless tailwind injection
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-inter", // keeping variable name for seamless tailwind injection
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

import PageTransition from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "Kshitij Kumbhar | Creative Developer",
  description: "Portfolio of Kshitij Kumbhar - DevOps Engineer, Full Stack Developer, and Cloud Enthusiast.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://prod.spline.design" crossOrigin="anonymous" />
        <link rel="preload" href="https://prod.spline.design/ttqM0KOYQHfnmQwm/scene.splinecode" as="fetch" crossOrigin="anonymous" />
      </head>
      <body className={`${outfit.variable} ${syne.variable} ${jetbrainsMono.variable} antialiased bg-black text-white selection:bg-white selection:text-black`}>
        <PageTransition />
        {children}
      </body>
    </html>
  );
}
