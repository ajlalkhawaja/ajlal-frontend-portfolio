import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ajlalhaiderkhawaja.com"),
  title: "Ajlal Haider — Senior Frontend Engineer",
  description: "Senior Frontend Engineer in Abu Dhabi specializing in React, Angular, TypeScript, accessible CSS systems and high-impact UAE digital products.",
  alternates: { canonical: "https://ajlalhaiderkhawaja.com" },
  openGraph: {
    title: "Ajlal Haider — Senior Frontend Engineer",
    description: "Project-led frontend portfolio spanning healthcare, government, enterprise and client-side OCR.",
    url: "https://ajlalhaiderkhawaja.com",
    type: "website",
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
