import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lista de Supermercado",
  description: "Tenha sua lista sempre à mão!",
  icons: {
    icon: [
      { media: '(prefers-color-scheme: light)', url: '/icon-light.svg', type: 'image/svg+xml' },
      { media: '(prefers-color-scheme: dark)', url: '/icon-dark.svg', type: 'image/svg+xml' },
    ],
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Lista de Supermercado",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#DFD4C7" },
    { media: "(prefers-color-scheme: dark)", color: "#1F4E5F" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
