"use client";
import localFont from "next/font/local";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import AppStore from "@/utils/redux/AppStore";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-poppins",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon links */}
        <link rel="icon" href="/assets/phloii_fav_icon.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/assets/phloii_fav_icon.png" />
        <meta name="theme-color" content="#ffffff" />
        {/* Title and Meta Tags */}
        <meta property="og:title" content="Phloii Dating App" />
        <meta property="og:description" content="Find Matches Near you" />
        <meta property="og:image" content="/assets/phloii_fav_icon.png" />
        <meta property="og:url" content="https://phloii.com" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider store={AppStore}>
          {children}
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{ duration: 700 }}
          />
        </Provider>
      </body>
    </html>
  );
}
