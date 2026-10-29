import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { siteConfig, siteUrl } from "@/lib/site";
import "./globals.css";

const inter = localFont({
  src: "../../public/fonts/inter-latin.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});
const sora = localFont({
  src: "../../public/fonts/sora-latin.woff2",
  variable: "--font-sora",
  display: "swap",
  weight: "100 800",
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "FoodBridge — Rescue Food. Feed People. Zero Waste.",
  description: "Connecting restaurants with surplus food to shelters and families in your city.",
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    title: "FoodBridge — Rescue Food. Feed People. Zero Waste.",
    description: "Connecting restaurants with surplus food to shelters and families in your city.",
    url: "/",
    siteName: "FoodBridge",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A1F0A",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
