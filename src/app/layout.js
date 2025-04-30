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
  author: "Keely Lee"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex dark col xl:row h-dvh min-h-dvh`}
      > 
        {children}
        <Nav />
      </body>
    </html>
  );
}
