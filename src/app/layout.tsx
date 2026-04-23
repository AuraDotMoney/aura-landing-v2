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

const SITE_TITLE = "Aura — Trade Hyperliquid & Polymarket in one app";
const SITE_DESCRIPTION =
  "The fastest, cheapest way to trade Hyperliquid perps, spot, HIP-3 markets and Polymarket predictions. One wallet, lowest fees — on iOS, Android, and desktop.";

export const metadata: Metadata = {
  metadataBase: new URL("https://aura.money"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: "Aura",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "https://aura.money",
    siteName: "Aura",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description:
      "Trade Hyperliquid and Polymarket from one app. Lowest fees, on every device.",
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

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Aura",
  url: "https://aura.money",
  logo: "https://aura.money/logo.svg",
  sameAs: ["https://x.com/auramoney", "https://t.me/auradotmoney"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={instrumentSerif.variable}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
