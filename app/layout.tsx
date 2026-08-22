import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Ajlal Haider | Senior Frontend Engineer",
    template: "%s | Ajlal Haider",
  },
  description:
    "Ajlal Haider is a Senior Frontend Engineer with 8+ years of experience creating high-stakes React, Angular and TypeScript products for healthcare, government and enterprise teams.",
  keywords: [
    "Senior Frontend Engineer",
    "React Developer",
    "Angular Developer",
    "TypeScript",
    "Abu Dhabi",
    "Remote Frontend Developer",
  ],
  authors: [{ name: "Ajlal Haider Khawaja" }],
  openGraph: {
    title: "Ajlal Haider | Senior Frontend Engineer",
    description:
      "Interactive React, Angular and TypeScript portfolio: enterprise UI, bilingual government services and healthcare products.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Ajlal Haider - Senior Frontend Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajlal Haider | Senior Frontend Engineer",
    description:
      "Interactive React, Angular and TypeScript portfolio for enterprise, healthcare and government products.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
