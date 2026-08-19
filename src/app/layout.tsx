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
  metadataBase: new URL("https://kshitijkumbhar.vercel.app"),
  title: "Kshitij Kumbhar — DevOps & Cloud Infrastructure Engineer",
  description:
    "Computer Engineering student and DevOps Intern building automated CI/CD pipelines, containerized microservices, and Kubernetes-orchestrated cloud infrastructure on AWS.",
  keywords: [
    "Kshitij Kumbhar",
    "DevOps Engineer",
    "Cloud Infrastructure",
    "AWS EKS",
    "Kubernetes",
    "Terraform",
    "Docker",
    "CI/CD",
    "Jenkins",
    "LangGraph",
    "Pinecone",
    "RAG",
    "Computer Engineering",
  ],
  authors: [{ name: "Kshitij Kumbhar", url: "https://github.com/kshitijx07" }],
  creator: "Kshitij Kumbhar",
  openGraph: {
    title: "Kshitij Kumbhar — DevOps & Cloud Infrastructure Engineer",
    description:
      "Automated CI/CD pipelines, Kubernetes microservices on AWS, and Multi-Agent AI systems.",
    url: "https://kshitijkumbhar.vercel.app",
    siteName: "Kshitij Kumbhar Portfolio",
    images: [
      {
        url: "/serverless_xray_ui.png",
        width: 1200,
        height: 630,
        alt: "Kshitij Kumbhar — DevOps & Cloud Engineering Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kshitij Kumbhar — DevOps & Cloud Infrastructure Engineer",
    description:
      "Automated CI/CD pipelines, Kubernetes microservices on AWS, and Multi-Agent AI systems.",
    images: ["/serverless_xray_ui.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
