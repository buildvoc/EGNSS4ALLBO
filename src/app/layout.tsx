import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Inter } from "next/font/google";
import "./ui/globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Identify building data from a photo"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
