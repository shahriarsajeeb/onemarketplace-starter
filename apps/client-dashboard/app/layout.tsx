import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Client Dashboard | OneMarketplace.io",
    template: "%s | OneMarketplace.io",
  },
  description:
    "Post fixed-price projects, review proposals, manage contracts, and work with exceptional independent talent.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
