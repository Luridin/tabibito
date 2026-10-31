import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SITE_META } from "@/lib/constants";
import "./globals.css";

const nukuNuku = localFont({
  src: "../public/fonts/nuku1.ttf",
  variable: "--font-nuku-nuku",
  display: "swap",
});

export const metadata: Metadata = {
  title: SITE_META.title,
  description: SITE_META.description,
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nukuNuku.variable}>
        {children}
      </body>
    </html>
  );
}
