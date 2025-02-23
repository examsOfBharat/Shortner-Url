import Footer from "../Components/Footer";
import "../styles/globals.css";
import Head from "next/head";
import Link from "next/link";

export default function App({ Component, pageProps }) {
  return (
    <div className=" bg-black">
      {/* Global SEO Settings */}
      <Head>
        <title>Shorturl</title> {/* Default Title */}
        <meta
          name="description"
          content="Transform long, cumbersome URLs into short, easy-to-share links with our URL Shortener. Built using modern web technologies like Next.js and MongoDB, this tool provides a fast, reliable, and user-friendly experience for managing your links. Whether you're a business looking to track clicks or an individual simplifying your sharing process."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Your Name or Company" />
        <meta name="keywords" content="url shortener, seo, shortener" />
        <meta charSet="UTF-8" />
        <meta
          name="google-site-verification"
          content="XcKtS9c9Qg4mq5p0dHl8h18L4gedL8MKJm1xuRkZ480"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Render the current page */}
      <Component {...pageProps} />
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl p-4 shadow-2xl flex items-center justify-evenly">
        {/* ShortUrl Button */}
        <button className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold px-6 py-3 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg">
        <Link
            href="/"
            className="text-white hover:text-white transition duration-300"
          >
            UrlShortner
          </Link>
        </button>

        {/* GenerateQRCode Button */}
        <button className="flex items-center justify-center bg-gradient-to-r from-green-600 to-teal-600 text-white text-lg font-semibold px-6 py-3 rounded-full hover:from-green-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg">
          <Link
            href="/qr-generator"
            className="text-white hover:text-white transition duration-300"
          >
            QRGenerator
          </Link>
        </button>
      </div>
      <Footer></Footer>
    </div>
  );
}
