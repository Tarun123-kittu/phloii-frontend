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
        {/* General meta tags */}
        <meta property="og:image" content="https://staging.phloii.com/assets/phloii_image.png" />
        <meta property="og:image:secure_url" content="https://staging.phloii.com/assets/phloii_image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="628" />
        
        {/* Favicon */}
        <link rel="icon" href="/black.svg" type="image/svg+xml" />
        
        {/* Facebook meta tags */}
        <meta property="og:url" content="https://staging.phloii.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Phloii" />
        <meta property="og:description" content="Description of your website" />
        
        {/* Twitter meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@yourtwitterhandle" />
        <meta name="twitter:title" content="Phloii" />
        <meta name="twitter:description" content="Description of your website" />
        <meta name="twitter:image" content="https://staging.phloii.com/assets/phloii_image.png" />

        {/* WhatsApp meta tag */}
        <meta property="og:whatsapp" content="whatsapp://send?text=Check%20this%20out%20https://staging.phloii.com" />

        {/* Skype meta tag */}
        <meta name="skype_toolbar" content="skype:send?chat&url=https://staging.phloii.com" />
      </Head>
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
