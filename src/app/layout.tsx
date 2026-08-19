import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import ScrollShell from "@/components/layout/ScrollShell";

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
      <body className="bg-zinc-950 text-zinc-100 min-h-screen antialiased bg-grid-pattern selection:bg-cyan-500 selection:text-zinc-950">
        <ScrollShell>{children}</ScrollShell>
        <Analytics />
      </body>
    </html>
  );
}
