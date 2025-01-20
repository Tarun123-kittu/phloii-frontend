"use client";
import localFont from "next/font/local";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import AppStore from "@/utils/redux/AppStore";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
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
      <Head>
        <meta property="og:image" content="https://staging.phloii.com/assets/phloii_fav_icon.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="628" />
      </Head>
      <link rel="shortcut icon" href="/black.svg" type="image/svg+xml" />
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
