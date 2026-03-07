import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
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
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-black text-white selection:bg-white selection:text-black`}>
        <PageTransition />
        {children}
      </body>
    </html>
  );
}
