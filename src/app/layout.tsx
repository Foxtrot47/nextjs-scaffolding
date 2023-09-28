import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="flex justify-between items-center bg-white text-black relative shadow-lg px-10 py-3 w-full">
          <div className="flex justify-between items-center gap-x-4">
            <div className="flex items-center gap-x-4">
              <img
                className="h-10 w-10 mr-2"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
              />
              <p className="text-2xl font-semibold">Store</p>
            </div>
            <div className="flex items-center gap-x-4">
              <Link className="text-lg font-semibold" href="/dashboard">
                Home
              </Link>
              <Link className="text-lg font-semibold" href="/cart">
                Cart
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link className="text-lg font-semibold" href="/">
              Login
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
