import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./pages.css";
import Nav from './nav';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Kurt Wu Photography",
  description: "[TODO] ADD BIO HERE",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}
      >
        {children}
        <Nav />
      </body>
    </html>
  );
}
