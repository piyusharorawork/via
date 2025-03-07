import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next Starter",
  description: "Generated by create next app",
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
      <body
        style={
          {
            // overflow: "hidden",
            // position: "fixed",
            // width: "100%",
          }
        }
      >
        {children}
      </body>
    </html>
  );
}
