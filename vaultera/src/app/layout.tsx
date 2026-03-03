import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vaultera — The New Era of Money Movement",
  description: "Convert, hold, send and invest in 180 world currencies. Built for Africans going global.",
  keywords: ["currency", "exchange", "invest", "wallet", "fintech", "Africa"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased bg-[#080B12] text-white">
        {children}
      </body>
    </html>
  );
}
