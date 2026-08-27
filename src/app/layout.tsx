import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import StickyEnquiryBar from "@/components/StickyEnquiryBar";

import SmoothScroll from "@/components/SmoothScroll";
import StructuredData from "@/components/StructuredData";
import siteConfig from "@/config/site";
import { seo } from "@/data/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#f97316",
};

export const metadata: Metadata = {
  title: {
    default: seo.home.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: seo.home.description,
  keywords: seo.home.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: siteConfig.name,
    title: seo.home.title,
    description: seo.home.description,
    url: siteConfig.url,
    images: [
      {
        url: "https://www.arjunrealty.co.in/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@arjunrealty",
    title: seo.home.title,
    description: seo.home.description,
    images: ["https://www.arjunrealty.co.in/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-T49W3ZWTZX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-T49W3ZWTZX');
          `}
        </Script>
      </head>
      <body className="bg-luxury min-h-screen text-foreground antialiased noise">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-white focus:font-semibold focus:outline-none">
          Skip to content
        </a>
        <StructuredData />
        <SmoothScroll />
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        <FloatingActions />
        <StickyEnquiryBar />
      </body>
    </html>
  );
}
