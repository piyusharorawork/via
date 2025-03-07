import type { Metadata } from "next";
import { Navbar } from "@/components/features/navbar";

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
    <section id="reelify" className="h-screen flex flex-col ">
      <header>
        <Navbar />
      </header>
      <main className="grow">
        <div className="content-height">{children}</div>
      </main>
    </section>
  );
}
