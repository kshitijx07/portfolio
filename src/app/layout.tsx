import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kshitij Kumbhar — DevOps Engineer & Cloud Infrastructure Developer",
  description: "DevOps Engineer & Cloud Infrastructure Developer building automated, containerized, cloud-native systems — from CI/CD pipelines to Kubernetes-orchestrated microservices on AWS.",
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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body className="bg-[#0a0a0a] text-[#ededed] min-h-screen antialiased bg-dot-grid">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
