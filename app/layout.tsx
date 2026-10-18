import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./responsive.css";
import "./typography.css";
import "./scrollbars.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://customwebpro.webmastery.tech"),
  title: "CustomWebPro — Big Ideas. Intelligent Builds. Real Impact.",
  description:
    "Custom websites, AI-powered mobile apps, and full-stack digital experiences by Biplob Hossain. 6+ years of turning ambitious ideas into real business impact.",
  openGraph: {
    title: "CustomWebPro — Your vision. Our next obsession.",
    description:
      "Standout websites, intelligent applications, and digital experiences. Meet your next creative development partner.",
    type: "website",
    images: [
      {
        url: "/images/original/Restaurant-Website-UI-Design-1.webp",
        alt: "CustomWebPro selected website work",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
