import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FCL Software",
  description: "created a for to collect Batch data.",
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
