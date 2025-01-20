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
      {/* <link rel="shortcut icon" href="/black.svg" type="image/svg+xml" /> */}
      <head>
        <link rel="icon" href="/black.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/black.svg" type="image/svg+xml" />
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
