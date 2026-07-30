import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ScrollProvider } from "@/context/contextApi";
import SmoothScroll from '@/components/scrollSmooth'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Academy X",
  description: "Create 3d website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
    <body suppressHydrationWarning className="min-h-full flex flex-col overflow-x-hidden">
  {/* Self-closing component for Lenis initialization */}
  <SmoothScroll />
  
  <ScrollProvider>
    {children}
  </ScrollProvider>
</body>
    </html>
  );
}
