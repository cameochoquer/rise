import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rise",
  description: "A safety app for women written by team Rise",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
         <nav className="p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-semibold">RISE</h1>
            <ul className="flex space-x-6">
              <li>
                <Link href="/diary" className="text-white hover:text-primary">
                  Diary
                </Link>
              </li>
              <li>
                <Link href="/uploads" className="text-white hover:text-primary">
                  Uploads
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
