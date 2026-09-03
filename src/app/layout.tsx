import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import InstallPrompt from "@/components/pwa/InstallPrompt";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#6366f1",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://calcify.tools"),
  title: {
    default: "Calcify — Free Calculators & Online Utility Tools",
    template: "%s | Calcify",
  },
  description:
    "66+ free online calculators and utility tools for finance, math, health, education, unit conversion, and developers. Fast, private, no login required.",
  keywords: [
    "calculator",
    "utility tools",
    "EMI calculator",
    "SIP calculator",
    "BMI calculator",
    "GST calculator",
    "online tools",
    "free calculator",
    "PWA calculator",
  ],
  authors: [{ name: "Calcify" }],
  creator: "Calcify",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Calcify",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://calcify.tools",
    siteName: "Calcify",
    title: "Calcify — Free Calculators & Online Utility Tools",
    description:
      "66+ free calculators and utilities for finance, health, education, converters, and developers.",
    images: [{ url: "/icon-512.png", width: 512, height: 512, alt: "Calcify Icon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calcify — Free Calculators & Utility Tools",
    description: "66+ free online calculators and utility tools.",
    images: ["/icon-512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  verification: {
    google: "OSZkMC7XtRCykWXTvCnIdJEI5LMOoCFdoqE3vVOOvOk",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('calcify-theme');
                if (!t) t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', t);
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen antialiased" style={{ background: "var(--bg-base)", color: "var(--text-primary)" }} suppressHydrationWarning>
        <ThemeProvider>
          <Header />
          <main className="min-h-[calc(100vh-4rem)]">{children}</main>
          <Footer />
          {/* Bottom PWA Install Prompt Banner (Only shown on first load if not installed) */}
          <InstallPrompt />
        </ThemeProvider>
        <Analytics />

        {/* Register Service Worker for PWA Offline Caching */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('Calcify ServiceWorker registered successfully:', registration.scope);
                    },
                    function(err) {
                      console.log('Calcify ServiceWorker registration failed:', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
