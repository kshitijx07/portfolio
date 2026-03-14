import type { Metadata } from "next";
import { Syne, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: 'block', // Prevents blurry FOUT - hides text until font is ready
});

const outfit = Outfit({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: 'swap',
});

import PageTransition from "@/components/ui/PageTransition";
import { LazyMotion, domMax } from "framer-motion";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if ('fonts' in document) {
                  document.fonts.ready.then(function() {
                    document.documentElement.classList.add('fonts-loaded');
                  });
                } else {
                  document.documentElement.classList.add('fonts-loaded');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${outfit.variable} ${syne.variable} ${jetbrainsMono.variable} antialiased bg-black text-white selection:bg-white selection:text-black`}>
        <LazyMotion features={domMax}>
          <PageTransition />
          {children}
        </LazyMotion>
      </body>
    </html>
  );
}
