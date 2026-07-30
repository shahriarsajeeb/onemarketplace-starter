import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Admin Dashboard | OneMarketplace.io",
    template: "%s | OneMarketplace.io Admin",
  },
  description:
    "Monitor marketplace activity, users, contracts, payments, and trust operations.",
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
