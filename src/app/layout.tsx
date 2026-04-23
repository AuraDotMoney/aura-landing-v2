import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aura.money"),
  title: "Aura — Trade everything",
  description:
    "One app for perps, prediction markets, and everything in between. Hyperliquid and Polymarket, one wallet, lowest fees.",
  openGraph: {
    title: "Aura — Trade everything",
    description:
      "One app for perps, prediction markets, and everything in between. Hyperliquid and Polymarket, one wallet, lowest fees.",
    url: "https://aura.money",
    siteName: "Aura",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aura — Trade everything",
    description:
      "One app for perps, prediction markets, and everything in between.",
    site: "@auramoney",
    creator: "@auramoney",
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={instrumentSerif.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
