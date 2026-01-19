import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OpsRep - Automated Business Reports",
  description:
    "Automatically generate and explain your weekly/monthly business reports so humans don't have to.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased bg-pattern`}>
        <Sidebar />
        <main className="ml-64 min-h-screen p-8">{children}</main>
      </body>
    </html>
  );
}
