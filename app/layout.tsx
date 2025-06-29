import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.multi-ui.in"),
  title: {
    default: "Multi UI – Animated React Components",
    template: "%s | Multi UI",
  },
  description:
    "A collection of beautifully designed, ready-to-use React components",
  keywords:
    "Multi UI, React components, animated UI, Tailwind CSS, Framer Motion, shadcn, component library",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  manifest: "/site.webmanifest",
  other: {
    "google-adsense-account": "ca-pub-7125097812565053",
    "google-site-verification": "UYNMkZv5OT3Nr_nMhIw2upAf-UEzrSdvU9JY-x88Qmg",
  },
  verification: {
    google: "UYNMkZv5OT3Nr_nMhIw2upAf-UEzrSdvU9JY-x88Qmg",
  },
  openGraph: {
    type: "website",
    url: "https://www.multi-ui.in",
    title: "Multi UI – Beautiful React Components",
    description:
      "A versatile React component library with multiple design variants for each component. Install once, use everywhere.",
    images: [
      {
        url: "/og-cover.png",
        width: 1200,
        height: 630,
        alt: "Multi UI preview image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@multi_ui", // only if it exists
    title: "Multi UI – Animated React Components",
    description:
      "A versatile React component library with multiple design variants. Install once, use everywhere.",
    images: ["/og-cover.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7125097812565053"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        <Navbar />
        <main>{children}</main>
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
