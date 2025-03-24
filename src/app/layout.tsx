import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rise - Sign In",
  description: "Sign in to your Rise account",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
