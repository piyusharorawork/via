import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Quick Reel",
  description: "Use AI to quickly generate sharable reels",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <script src="//unpkg.com/react-scan/dist/auto.global.js" /> */}
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
