import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/layout/ThemeProvider";
import NavigationProvider from "@/components/layout/NavigationProvider";
import SessionProvider from "@/components/layout/SessionProvider";

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
  description: "Convert, hold, send and invest in 180 world currencies.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <SessionProvider>
          <ThemeProvider>
            <NavigationProvider>
              {children}
            </NavigationProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
