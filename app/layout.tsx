import type { Metadata } from "next";
import { Inter, Space_Grotesk, MedievalSharp } from "next/font/google";
import "sonner/dist/styles.css";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const medieval = MedievalSharp({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-medieval",
  display: "swap",
});

const siteUrl = "https://deyan.world";
const siteTitle = "Deyan - Official Site";
const description = "Discover Deyan, the 15-year-old rapper blending electric hyperpop energy with razor-sharp storytelling. Stream the latest tracks, watch new videos, and stay in the loop.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Deyan",
  },
  description,
  keywords: [
    "Deyan",
    "rapper",
    "hyperpop",
    "music",
    "teen artist",
    "spotify",
    "youtube",
  ],
  openGraph: {
    title: siteTitle,
    description,
    url: siteUrl,
    siteName: "Deyan",
    type: "website",
    images: [
      {
        url: "/og/default.svg",
        width: 1200,
        height: 630,
        alt: "Deyan artist hero image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description,
    images: ["/og/default.svg"],
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-bg text-fg antialiased",
          spaceGrotesk.variable,
          inter.variable,
          medieval.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
