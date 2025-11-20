import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { DarkModeProvider } from "@/lib/context/DarkModeContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import MovingObjects from "@/components/MovingObjects";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mohan - Full Stack Developer & Blockchain Developer",
    template: "%s | Mohan - Full Stack Developer",
  },
  description:
    "Crafting digital experiences with cutting-edge technology and innovative design. Passionate full-stack developer specializing in React, TypeScript, Node.js, and blockchain solutions.",
  keywords: [
    "Full Stack Developer",
    "Blockchain Developer",
    "React",
    "TypeScript",
    "Node.js",
    "Web Development",
    "Portfolio",
  ],
  authors: [{ name: "Mohan" }],
  creator: "Mohan",
  publisher: "Mohan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://mohan-portfolio.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mohan-portfolio.vercel.app",
    title: "Mohan - Full Stack Developer & Blockchain Developer",
    description:
      "Crafting digital experiences with cutting-edge technology and innovative design. Passionate full-stack developer specializing in React, TypeScript, Node.js, and blockchain solutions.",
    siteName: "Mohan Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mohan - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohan - Full Stack Developer & Blockchain Developer",
    description:
      "Crafting digital experiences with cutting-edge technology and innovative design.",
    images: ["/og-image.jpg"],
    creator: "@mohan_dev",
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#7c3aed" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="//images.pexels.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mohan",
              jobTitle: "Full Stack Developer & Blockchain Developer",
              description:
                "Crafting digital experiences with cutting-edge technology and innovative design. Passionate full-stack developer specializing in React, TypeScript, Node.js, and blockchain solutions.",
              url: "https://mohan-portfolio.vercel.app",
              sameAs: [
                "https://github.com/Mohan-b-dev",
                "https://linkedin.com/in/mohan",
              ],
              knowsAbout: [
                "React",
                "TypeScript",
                "Node.js",
                "Blockchain",
                "Web Development",
                "Full Stack Development",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300`}
      >
        <DarkModeProvider>
          <ErrorBoundary>
            <div id="root" className="relative">
              <MovingObjects variant="hero" density="medium" />
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-purple-600 text-white px-4 py-2 rounded-md z-50 transition-all duration-200 hover:bg-purple-700"
              >
                Skip to main content
              </a>
              {children}
            </div>
          </ErrorBoundary>
        </DarkModeProvider>
      </body>
    </html>
  );
}
